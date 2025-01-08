const express = require('express');
const {
  createTable,
  updateTableStatus,
  getTables,
  getTableById
} = require('../controllers/tableController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const router = express.Router();

router.post(
  '/:restaurantId',
  auth,
  roleAuth(['owner']),
  createTable
);

router.patch(
  '/:restaurantId/tables/:tableId/status',
  auth,
  roleAuth(['owner', 'staff']),
  updateTableStatus
);

router.get(
  '/:restaurantId/tables',
  auth,
  getTables
);

router.get(
  '/:restaurantId/tables/:tableId',
  auth,
  getTableById
);

module.exports = router;