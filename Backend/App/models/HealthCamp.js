const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const healthCampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  registered: {
    type: Number,
    default: 0,
    min: 0
  },
  services: [serviceSchema],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for better query performance
healthCampSchema.index({ date: 1, status: 1 });
healthCampSchema.index({ location: 'text', name: 'text' });

// Virtual for available spots
healthCampSchema.virtual('availableSpots').get(function() {
  return this.capacity - this.registered;
});

// Method to check if camp is full
healthCampSchema.methods.isFull = function() {
  return this.registered >= this.capacity;
};

// Method to register a participant
healthCampSchema.methods.registerParticipant = function() {
  if (this.registered < this.capacity) {
    this.registered += 1;
    return true;
  }
  return false;
};

module.exports = mongoose.model('HealthCamp', healthCampSchema);