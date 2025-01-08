const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'closed'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contactNumber: {
    type: String,
    trim: true
  },
  businessHours: {
    open: String,
    close: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);