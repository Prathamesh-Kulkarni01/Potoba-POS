const userService = require('../services/userService');
const { validateRegistration } = require('../validators/userValidator');

// Registration Controllers
const registerOwner = async (req, res) => {
  try {
    const validationError = validateRegistration({ ...req.body, role: 'owner' });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const result = await userService.registerUser({ ...req.body, role: 'owner' });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerStaff = async (req, res) => {
  try {
    const validationError = validateRegistration({ ...req.body, role: 'staff' });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const result = await userService.registerUser({ 
      ...req.body, 
      role: 'staff',
      selectedRestaurant: req.body.restaurantId 
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerKitchen = async (req, res) => {
  try {
    const validationError = validateRegistration({ ...req.body, role: 'kitchen' });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const result = await userService.registerUser({ 
      ...req.body, 
      role: 'kitchen',
      selectedRestaurant: req.body.restaurantId 
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerCustomer = async (req, res) => {
  try {
    const validationError = validateRegistration({ ...req.body, role: 'customer' });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const result = await userService.registerUser({ 
      ...req.body, 
      role: 'customer',
      customerDetails: {
        preferences: req.body.preferences || [],
        allergies: req.body.allergies || []
      }
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const validationError = validateRegistration({ ...req.body, role: 'admin' });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const result = await userService.registerUser({ ...req.body, role: 'admin' });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login Controllers
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password, 'owner');
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password, 'staff');
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const loginKitchen = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password, 'kitchen');
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password, 'customer');
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password, 'admin');
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

module.exports = {
  registerOwner,
  registerStaff,
  registerKitchen,
  registerCustomer,
  registerAdmin,
  loginUser,
  loginStaff,
  loginKitchen,
  loginCustomer,
  loginAdmin,
  getProfile
};