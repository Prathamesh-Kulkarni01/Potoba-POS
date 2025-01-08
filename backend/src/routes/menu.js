const express = require('express');
const {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItems,
  getMenuItemById
} = require('../controllers/menuController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const router = express.Router();

router.post(
  '/:restaurantId/items',
  auth,
  roleAuth(['owner', 'staff']),
  createMenuItem
);

router.put(
  '/:restaurantId/items/:itemId',
  auth,
  roleAuth(['owner', 'staff']),
  updateMenuItem
);

router.delete(
  '/:restaurantId/items/:itemId',
  auth,
  roleAuth(['owner', 'staff']),
  deleteMenuItem
);

router.get(
  '/:restaurantId/items',
  auth,
  getMenuItems
);

router.get(
  '/:restaurantId/items/:itemId',
  auth,
  getMenuItemById
);

module.exports = router;