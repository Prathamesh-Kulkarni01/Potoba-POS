const express = require('express');
const {
  createOrder,
  updateOrderStatus,
  getOrders,
  getOrderById
} = require('../controllers/orderController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const router = express.Router();

router.post(
  '/:restaurantId',
  auth,
  roleAuth(['owner', 'staff']),
  createOrder
);

router.patch(
  '/:restaurantId/orders/:orderId/status',
  auth,
  roleAuth(['owner', 'staff', 'kitchen']),
  updateOrderStatus
);

router.get(
  '/:restaurantId/orders',
  auth,
  getOrders
);

router.get(
  '/:restaurantId/orders/:orderId',
  auth,
  getOrderById
);

module.exports = router;