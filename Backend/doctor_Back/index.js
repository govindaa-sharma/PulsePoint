const express = require('express');
const cors = require('cors');

// Initialize the Express app
const app = express();
const PORT = 8000; // The port your server will run on

// --- Middleware ---

// Enable CORS (Cross-Origin Resource Sharing) so your front-end apps can call this server
app.use(cors());
// Enable the express.json() middleware to parse JSON request bodies
app.use(express.json());

// --- In-Memory "Database" for the Demo ---

// This variable will act as a temporary storage for the call information.
// It's null when there is no active call.
let activeCall = null;

// --- API Endpoints ---

/**
 * @route   POST /start-call
 * @desc    Receives a request from the patient app to initiate a call.
 * It expects a JSON body with patient info and a meeting link.
 */
app.post('/start-call', (req, res) => {
  console.log('✅ Received a request to start a call.');
  
  // Get the patient name and meeting link from the request body
  const { patient, link } = req.body;

  // Basic validation to ensure we have the required data
  if (!patient || !link) {
    return res.status(400).json({ error: 'Missing patient name or meeting link.' });
  }
  
  // Store the call data in our temporary variable
  activeCall = { patient, link };
  
  console.log('Call data stored:', activeCall);
  
  // Send a success response back to the patient app
  res.status(200).json({ message: 'Call initiated. Doctor has been notified.' });
});


/**
 * @route   GET /get-call
 * @desc    Called by the Streamlit app every few seconds to check for a new call.
 * If a call exists, it sends the data and then clears it.
 */
app.get('/get-call', (req, res) => {
  if (activeCall) {
    console.log('🩺 Doctor is checking for calls... A call was found!');
    
    // Send the stored call data to the Streamlit app
    res.status(200).json(activeCall);
    
    // IMPORTANT: Clear the variable so the doctor doesn't get the same notification again.
    activeCall = null;
    
  } else {
    // If there's no active call, send back `null`
    console.log('🩺 Doctor is checking for calls... None found.');
    res.status(200).json(null);
  }
});


// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is live and listening on http://localhost:${PORT}`);
  console.log('Waiting for requests...');
});