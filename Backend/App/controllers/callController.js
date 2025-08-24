const Call = require('../models/Call');
const { generateCallId, addActiveCall, getActiveCall, removeActiveCall } = require('../utils/socketUtils');

// Initiate a new call
const initiateCall = async (req, res) => {
  try {
    const { doctorId, patientId, callType = 'video' } = req.body;
    
    const callId = generateCallId();
    
    const call = new Call({
      callId,
      doctorId,
      patientId,
      callType,
      status: 'initiated'
    });

    await call.save();

    // Add to active calls
    addActiveCall(callId, {
      doctorId,
      patientId,
      callType,
      status: 'initiated',
      startTime: new Date()
    });

    res.status(201).json({
      success: true,
      callId,
      message: 'Call initiated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// End a call
const endCall = async (req, res) => {
  try {
    const { callId } = req.params;
    const { duration, notes } = req.body;

    const call = await Call.findOne({ callId });
    if (!call) {
      return res.status(404).json({ error: 'Call not found' });
    }

    call.status = 'completed';
    call.endTime = new Date();
    call.duration = duration || 0;
    call.notes = notes;

    await call.save();
    removeActiveCall(callId);

    res.json({
      success: true,
      message: 'Call ended successfully',
      call
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get call history for a user
const getCallHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const calls = await Call.find({
      $or: [{ doctorId: userId }, { patientId: userId }]
    })
    .populate('doctorId', 'name specialty')
    .populate('patientId', 'name')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const total = await Call.countDocuments({
      $or: [{ doctorId: userId }, { patientId: userId }]
    });

    res.json({
      success: true,
      calls,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get active call details
const getCallDetails = async (req, res) => {
  try {
    const { callId } = req.params;

    const call = await Call.findOne({ callId })
      .populate('doctorId', 'name specialty image')
      .populate('patientId', 'name');

    if (!call) {
      return res.status(404).json({ error: 'Call not found' });
    }

    res.json({
      success: true,
      call
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  initiateCall,
  endCall,
  getCallHistory,
  getCallDetails
};