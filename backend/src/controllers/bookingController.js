const Booking = require('../models/Booking');
const Table = require('../models/Table');

const createBooking = async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      restaurant: req.body.restaurantId
    });
    await booking.save();
    
    // Update table status
    await Table.findByIdAndUpdate(req.body.table, { status: 'reserved' });
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ restaurant: req.params.restaurantId })
      .populate('table');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { status: req.body.status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    // Update table status if booking is cancelled
    if (req.body.status === 'cancelled') {
      await Table.findByIdAndUpdate(booking.table, { status: 'available' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
  updateBookingStatus
};