const userService = require('../services/userService');
const { validateRegistration } = require('../validators/userValidator');

const register = async (req, res) => {
  try {
    const validationError = validateRegistration(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const result = await userService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateProfile=async (req,res)=>{
  try {
    const user = await userService.updateUserProfile(req.user.id,req.body);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};