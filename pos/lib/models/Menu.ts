// models/Menu.js
import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },  // If you're storing image URLs
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Linking to the restaurant
});

const Menu = mongoose.models.Menu || mongoose.model('Menu', menuItemSchema);

export default Menu;
