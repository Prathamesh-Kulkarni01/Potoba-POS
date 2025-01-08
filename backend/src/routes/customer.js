const express = require('express');
const {
  getTableMenu,
  placeOrder,
  getOrderStatus
} = require('../controllers/customerController');
const router = express.Router();

// Public endpoints for customer interaction
router.get(
  '/restaurants/:restaurantId/tables/:tableId/menu',
  getTableMenu
);

router.post(
  '/restaurants/:restaurantId/orders',
  placeOrder
);

router.get(
  '/restaurants/:restaurantId/orders/:orderId/status',
  getOrderStatus
);

module.exports = router;