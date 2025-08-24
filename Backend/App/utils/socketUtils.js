const { v4: uuidv4 } = require('uuid');

// Store active calls and user connections
const activeCalls = new Map();
const userSockets = new Map();

const generateCallId = () => {
  return uuidv4();
};

const addUserSocket = (userId, socketId) => {
  userSockets.set(userId, socketId);
};

const removeUserSocket = (userId) => {
  userSockets.delete(userId);
};

const getUserSocket = (userId) => {
  return userSockets.get(userId);
};

const addActiveCall = (callId, callData) => {
  activeCalls.set(callId, callData);
};

const getActiveCall = (callId) => {
  return activeCalls.get(callId);
};

const removeActiveCall = (callId) => {
  activeCalls.delete(callId);
};

const getCallsByUser = (userId) => {
  const userCalls = [];
  for (const [callId, callData] of activeCalls.entries()) {
    if (callData.doctorId === userId || callData.patientId === userId) {
      userCalls.push({ callId, ...callData });
    }
  }
  return userCalls;
};

module.exports = {
  generateCallId,
  addUserSocket,
  removeUserSocket,
  getUserSocket,
  addActiveCall,
  getActiveCall,
  removeActiveCall,
  getCallsByUser
};