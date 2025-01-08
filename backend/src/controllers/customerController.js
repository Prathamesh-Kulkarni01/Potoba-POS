const customerService = require('../services/customerService');

const getTableMenu = async (req, res) => {
  try {
    const { restaurantId, tableId } = req.params;
    const menuInfo = await customerService.getTableMenuInfo(tableId, restaurantId);
    res.json(menuInfo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const placeOrder = async (req, res) => {
  try {
    const order = await customerService.placeOrder(req.body, req.params.restaurantId);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrderStatus = async (req, res) => {
  try {
    const status = await customerService.getOrderStatus(
      req.params.orderId,
      req.params.restaurantId
    );
    res.json(status);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getTableMenu,
  placeOrder,
  getOrderStatus
};