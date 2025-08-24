const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  callId: {
    type: String,
    required: true,
    unique: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['initiated', 'ongoing', 'completed', 'missed', 'cancelled'],
    default: 'initiated'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  callType: {
    type: String,
    enum: ['video', 'audio'],
    default: 'video'
  },
  recordingUrl: {
    type: String
  },
  notes: {
    type: String
  },
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  }
}, {
  timestamps: true
});

// Index for faster queries
callSchema.index({ doctorId: 1, status: 1 });
callSchema.index({ patientId: 1, status: 1 });
callSchema.index({ callId: 1 });

module.exports = mongoose.model('Call', callSchema);