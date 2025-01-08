const MenuItem = require('../models/MenuItem');

const createMenuItem = async (data, restaurantId) => {
  const menuItem = new MenuItem({
    ...data,
    restaurant: restaurantId
  });
  return await menuItem.save();
};

const updateMenuItem = async (itemId, data, restaurantId) => {
  const menuItem = await MenuItem.findOneAndUpdate(
    { _id: itemId, restaurant: restaurantId },
    data,
    { new: true }
  );
  if (!menuItem) {
    throw new Error('Menu item not found');
  }
  return menuItem;
};

const deleteMenuItem = async (itemId, restaurantId) => {
  const menuItem = await MenuItem.findOneAndDelete({ 
    _id: itemId, 
    restaurant: restaurantId 
  });
  if (!menuItem) {
    throw new Error('Menu item not found');
  }
  return { message: 'Menu item deleted successfully' };
};

const getMenuItems = async (restaurantId, filters = {}) => {
  const query = { restaurant: restaurantId };
  
  if (filters.category) {
    query.category = filters.category;
  }
  if (filters.priceRange) {
    query.price = { 
      $gte: filters.priceRange.min, 
      $lte: filters.priceRange.max 
    };
  }
  
  return await MenuItem.find(query).sort({ category: 1, name: 1 });
};

const getMenuItemById = async (itemId, restaurantId) => {
  const menuItem = await MenuItem.findOne({ 
    _id: itemId, 
    restaurant: restaurantId 
  });
  if (!menuItem) {
    throw new Error('Menu item not found');
  }
  return menuItem;
};

module.exports = {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItems,
  getMenuItemById
};