const HealthCamp = require('../models/HealthCamp');

// Get all health camps
exports.getAllCamps = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }
    
    const camps = await HealthCamp.find(query)
      .sort({ date: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await HealthCamp.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: camps,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching camps',
      error: error.message
    });
  }
};

// Get a single health camp by ID
exports.getCampById = async (req, res) => {
  try {
    const camp = await HealthCamp.findById(req.params.id);
    
    if (!camp) {
      return res.status(404).json({
        success: false,
        message: 'Health camp not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: camp
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid health camp ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while fetching camp',
      error: error.message
    });
  }
};

// Create a new health camp
exports.createCamp = async (req, res) => {
  try {
    const campData = {
      ...req.body,
      date: new Date(req.body.date)
    };
    
    const camp = new HealthCamp(campData);
    const savedCamp = await camp.save();
    
    res.status(201).json({
      success: true,
      message: 'Health camp created successfully',
      data: savedCamp
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while creating camp',
      error: error.message
    });
  }
};

// Update a health camp
exports.updateCamp = async (req, res) => {
  try {
    if (req.body.date) {
      req.body.date = new Date(req.body.date);
    }
    
    const camp = await HealthCamp.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!camp) {
      return res.status(404).json({
        success: false,
        message: 'Health camp not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Health camp updated successfully',
      data: camp
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid health camp ID'
      });
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while updating camp',
      error: error.message
    });
  }
};

// Delete a health camp
exports.deleteCamp = async (req, res) => {
  try {
    const camp = await HealthCamp.findByIdAndDelete(req.params.id);
    
    if (!camp) {
      return res.status(404).json({
        success: false,
        message: 'Health camp not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Health camp deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid health camp ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while deleting camp',
      error: error.message
    });
  }
};

// Register a participant for a camp
exports.registerForCamp = async (req, res) => {
  try {
    const camp = await HealthCamp.findById(req.params.id);
    
    if (!camp) {
      return res.status(404).json({
        success: false,
        message: 'Health camp not found'
      });
    }
    
    if (camp.isFull()) {
      return res.status(400).json({
        success: false,
        message: 'Camp is already full'
      });
    }
    
    camp.registerParticipant();
    await camp.save();
    
    res.status(200).json({
      success: true,
      message: 'Successfully registered for the camp',
      data: camp,
      availableSpots: camp.availableSpots
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid health camp ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while registering for camp',
      error: error.message
    });
  }
};

// Search health camps
exports.searchCamps = async (req, res) => {
  try {
    const { query, location, date, services } = req.query;
    
    let searchCriteria = {};
    
    if (query) {
      searchCriteria.$text = { $search: query };
    }
    
    if (location) {
      searchCriteria.location = new RegExp(location, 'i');
    }
    
    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);
      
      searchCriteria.date = {
        $gte: searchDate,
        $lt: nextDay
      };
    }
    
    if (services) {
      const servicesArray = services.split(',');
      searchCriteria['services.name'] = { $in: servicesArray };
    }
    
    const camps = await HealthCamp.find(searchCriteria).sort({ date: 1 });
    
    res.status(200).json({
      success: true,
      data: camps,
      total: camps.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while searching camps',
      error: error.message
    });
  }
};