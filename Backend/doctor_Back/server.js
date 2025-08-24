// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// app.use(cors());
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: false
}));
app.use(express.json());

// In-memory storage for demo purposes (use a database in production)
let pendingCalls = [];
let activeMeetings = [];

// Zoom API credentials (replace with your actual credentials)
const ZOOM_API_KEY = 'IRNAXVtkQHC90jBQI9sn3A';
const ZOOM_API_SECRET = 'DbOfHFmcdsS7FLXq3gvWos6toruGXXhO';
const ZOOM_ACCOUNT_ID = 'devYld89QyqtLztvUjmOWA';

// Create a Zoom meeting
async function createZoomMeeting(topic, duration, startTime) {
  try {
    const authResponse = await axios.post('https://zoom.us/oauth/token', null, {
      params: {
        grant_type: 'account_credentials',
        account_id: ZOOM_ACCOUNT_ID
      },
      headers: {
        'Authorization': `Basic ${Buffer.from(`${ZOOM_API_KEY}:${ZOOM_API_SECRET}`).toString('base64')}`
      }
    });

    const accessToken = authResponse.data.access_token;

    const meetingResponse = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
      topic: topic || 'Telehealth Consultation',
      type: 1, // Instant meeting
      duration: duration || 30,
      start_time: startTime || new Date().toISOString(),
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false
      }
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    return meetingResponse.data;
  } catch (error) {
    console.error('Error creating Zoom meeting:', error.response?.data || error.message);
    throw error;
  }
}

// Routes
app.post('/api/initiate-call', async (req, res) => {
  try {
    const { patientName, reason } = req.body;
    
    // Create a Zoom meeting
    const meeting = await createZoomMeeting(`Consultation with ${patientName}`, 30, new Date().toISOString());
    
    // Store the call request
    const callRequest = {
      id: Date.now().toString(),
      patientName,
      reason,
      meetingUrl: meeting.join_url,
      startUrl: meeting.start_url,
      status: 'pending',
      createdAt: new Date()
    };
    
    pendingCalls.push(callRequest);
    
    res.json({
      success: true,
      message: 'Call initiated successfully',
      callId: callRequest.id,
      meetingUrl: callRequest.meetingUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to initiate call',
      error: error.message
    });
  }
});

app.get('/api/pending-calls', (req, res) => {
  res.json({
    success: true,
    calls: pendingCalls
  });
});

app.post('/api/accept-call/:callId', (req, res) => {
  const { callId } = req.params;
  const callIndex = pendingCalls.findIndex(call => call.id === callId);
  
  if (callIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Call not found'
    });
  }
  
  const acceptedCall = pendingCalls[callIndex];
  acceptedCall.status = 'accepted';
  acceptedCall.acceptedAt = new Date();
  
  // Move to active meetings
  activeMeetings.push(acceptedCall);
  pendingCalls.splice(callIndex, 1);
  
  res.json({
    success: true,
    message: 'Call accepted',
    startUrl: acceptedCall.startUrl
  });
});

app.post('/api/end-call/:callId', (req, res) => {
  const { callId } = req.params;
  const callIndex = activeMeetings.findIndex(call => call.id === callId);
  
  if (callIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Call not found'
    });
  }
  
  activeMeetings[callIndex].status = 'ended';
  activeMeetings[callIndex].endedAt = new Date();
  
  res.json({
    success: true,
    message: 'Call ended'
  });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});