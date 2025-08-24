// apiService.js
const API_BASE_URL = 'http://localhost:3000';

export const apiService = {
  // Initiate a call with the doctor
  initiateCall: async (patientName, reason) => {
    const response = await fetch(`${API_BASE_URL}/api/initiate-call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patientName, reason }),
    });
    return response.json();
  },

  // Get pending calls (for doctor's dashboard)
  getPendingCalls: async () => {
    const response = await fetch(`${API_BASE_URL}/api/pending-calls`);
    return response.json();
  },

  // Accept a call (doctor action)
  acceptCall: async (callId) => {
    const response = await fetch(`${API_BASE_URL}/api/accept-call/${callId}`, {
      method: 'POST',
    });
    return response.json();
  },

  // End a call
  endCall: async (callId) => {
    const response = await fetch(`${API_BASE_URL}/api/end-call/${callId}`, {
      method: 'POST',
    });
    return response.json();
  },
};