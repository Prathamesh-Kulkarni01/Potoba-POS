const User = require('../models/User');
const { generateToken } = require('../utils/auth');
const { hashPassword } = require('../utils/password');

const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const user = new User({
    ...userData,
    password: await hashPassword(userData.password)
  });
  
  await user.save();
  return { message: 'User registered successfully' };
};

const loginUser = async (email, password, role) => {
  const user = await User.findOne({ email, role });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user);
  return { 
    token, 
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role,
      selectedRestaurant: user.selectedRestaurant 
    } 
  };
};

const getUserProfile = async (userId) => {
  const user = await User.findById(userId)
    .select('-password')
    .populate('selectedRestaurant');
    
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};