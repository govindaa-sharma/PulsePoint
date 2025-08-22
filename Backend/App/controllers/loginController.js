let userModel  = require('../models/enquiry.model.js'); // Import the enquiry model


let userSignup= async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await userModel .findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create user (password stored in plain text as requested)
    const user = await userModel .create({
      name,
      email,
      password
    });
    
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        joinDate: user.joinDate
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

let userLogin=async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password (plain text comparison)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        joinDate: user.joinDate
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
module.exports={userSignup,userLogin}