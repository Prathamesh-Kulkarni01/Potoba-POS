const express = require('express');
const { 
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
} = require('../controllers/authController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const { updateProfile } = require('../controllers/userController');
const router = express.Router();

// Registration routes
router.post('/register/owner', registerOwner);
router.post('/register/staff', auth, roleAuth(['owner', 'admin']), registerStaff);
router.post('/register/kitchen', auth, roleAuth(['owner', 'admin']), registerKitchen);
router.post('/register/customer', registerCustomer);
router.post('/register/admin', auth, roleAuth(['admin']), registerAdmin);

// Login routes
router.post('/login/owner', loginUser);
router.post('/login/staff', loginStaff);
router.post('/login/kitchen', loginKitchen);
router.post('/login/customer', loginCustomer);
router.post('/login/admin', loginAdmin);

// Profile route
router.get('/profile', auth, getProfile);
router.patch('/update/:id', auth, updateProfile);

module.exports = router;