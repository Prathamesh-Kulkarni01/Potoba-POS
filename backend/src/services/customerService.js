const Order = require('../models/Order');
const Table = require('../models/Table');
const MenuItem = require('../models/MenuItem');

const getTableMenuInfo = async (tableId, restaurantId) => {
  const table = await Table.findOne({ 
    _id: tableId, 
    restaurant: restaurantId 
  });
  
  if (!table) {
    throw new Error('Table not found');
  }

  const menu = await MenuItem.find({ restaurant: restaurantId })
    .sort({ category: 1, name: 1 });

  return {
    table,
    menu,
    qrCode: `${process.env.FRONTEND_URL}/restaurants/${restaurantId}/tables/${tableId}/order`
  };
};

const placeOrder = async (orderData, restaurantId) => {
  // Validate table
  const table = await Table.findOne({ 
    _id: orderData.tableId, 
    restaurant: restaurantId,
    status: 'available'
  });
  
  if (!table) {
    throw new Error('Table not available');
  }

  // Validate menu items and calculate total
  const menuItems = await MenuItem.find({
    _id: { $in: orderData.items.map(item => item.menuItemId) },
    restaurant: restaurantId
  });

  if (menuItems.length !== orderData.items.length) {
    throw new Error('One or more menu items not found');
  }

  const items = orderData.items.map(item => {
    const menuItem = menuItems.find(mi => mi._id.toString() === item.menuItemId);
    return {
      menuItem: menuItem._id,
      quantity: item.quantity,
      price: menuItem.price
    };
  });

  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Create order and update table status
  const order = new Order({
    table: orderData.tableId,
    items,
    status: 'pending',
    totalAmount,
    restaurant: restaurantId,
    specialInstructions: orderData.specialInstructions,
    orderNumber: generateOrderNumber()
  });

  await order.save();
  await Table.findByIdAndUpdate(orderData.tableId, { status: 'occupied' });

  return order;
};

const getOrderStatus = async (orderId, restaurantId) => {
  const order = await Order.findOne({ 
    _id: orderId, 
    restaurant: restaurantId 
  })
    .populate('items.menuItem')
    .select('status items totalAmount orderNumber createdAt');

  if (!order) {
    throw new Error('Order not found');
  }

  return {
    ...order.toObject(),
    estimatedTime: calculateEstimatedTime(order)
  };
};

// Helper functions
const generateOrderNumber = () => {
  return `A${Math.floor(100 + Math.random() * 900)}`;
};

const calculateEstimatedTime = (order) => {
  const baseTime = 15; // Base preparation time in minutes
  const itemCount = order.items.reduce((total, item) => total + item.quantity, 0);
  return baseTime + (itemCount * 2); // Add 2 minutes per item
};

module.exports = {
  getTableMenuInfo,
  placeOrder,
  getOrderStatus
};