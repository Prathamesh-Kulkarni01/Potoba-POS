const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const createOrder = async (orderData, restaurantId) => {
  // Validate and get menu items
  const menuItemIds = orderData.items.map(item => item.menuItem);
  const menuItems = await MenuItem.find({
    _id: { $in: menuItemIds },
    restaurant: restaurantId
  });

  if (menuItems.length !== menuItemIds.length) {
    throw new Error('One or more menu items not found');
  }

  // Calculate prices and total
  const items = orderData.items.map(item => {
    const menuItem = menuItems.find(mi => mi._id.toString() === item.menuItem.toString());
    return {
      menuItem: item.menuItem,
      quantity: item.quantity,
      price: menuItem.price
    };
  });

  const order = new Order({
    ...orderData,
    items,
    restaurant: restaurantId,
    totalAmount: calculateTotalAmount(items)
  });

  return await order.save();
};

const updateOrderStatus = async (orderId, status, restaurantId) => {
  const order = await Order.findOneAndUpdate(
    { _id: orderId, restaurant: restaurantId },
    { status },
    { new: true }
  ).populate('items.menuItem');

  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

const getOrders = async (restaurantId, filters = {}) => {
  const query = { restaurant: restaurantId };
  
  if (filters.status) {
    query.status = filters.status;
  }
  if (filters.dateRange) {
    query.createdAt = {
      $gte: new Date(filters.dateRange.start),
      $lte: new Date(filters.dateRange.end)
    };
  }

  return await Order.find(query)
    .populate('items.menuItem')
    .populate('table')
    .sort({ createdAt: -1 });
};

const getOrderById = async (orderId, restaurantId) => {
  const order = await Order.findOne({ 
    _id: orderId, 
    restaurant: restaurantId 
  })
    .populate('items.menuItem')
    .populate('table');

  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

module.exports = {
  createOrder,
  updateOrderStatus,
  getOrders,
  getOrderById
};