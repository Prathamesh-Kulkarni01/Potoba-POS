const express = require('express');
const {
  createRestaurant,
  updateRestaurant,
  getRestaurants,
  getRestaurantById
} = require('../controllers/restaurantController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const router = express.Router();

router.post('/', auth, roleAuth(['owner']), createRestaurant);
router.put('/:restaurantId', auth, roleAuth(['owner']), updateRestaurant);
router.get('/', auth, getRestaurants);
router.get('/:restaurantId', auth, getRestaurantById);

module.exports = router;