const express = require('express');
const { createBooking, getBookings, updateBookingStatus } = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const router = express.Router();

router.post('/', auth, createBooking);
router.get('/:restaurantId', auth, getBookings);
router.patch('/:bookingId/status', auth, roleAuth(['owner', 'staff']), updateBookingStatus);

module.exports = router;