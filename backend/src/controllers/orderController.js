const orderService = require('../services/orderService');
const { validateOrder } = require('../validators/orderValidator');

const createOrder = async (req, res) => {
  try {
    const validationError = validateOrder(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const order = await orderService.createOrder(req.body, req.params.restaurantId);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.orderId,
      req.body.status,
      req.params.restaurantId
    );
    res.json(order);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      dateRange: req.query.dateRange ? JSON.parse(req.query.dateRange) : null
    };
    const orders = await orderService.getOrders(req.params.restaurantId, filters);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(
      req.params.orderId,
      req.params.restaurantId
    );
    res.json(order);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  updateOrderStatus,
  getOrders,
  getOrderById
};