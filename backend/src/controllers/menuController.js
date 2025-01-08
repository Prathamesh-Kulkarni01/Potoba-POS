const menuService = require('../services/menuService');
const { validateMenuItem } = require('../validators/menuValidator');

const createMenuItem = async (req, res) => {
  try {
    const validationError = validateMenuItem(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const menuItem = await menuService.createMenuItem(req.body, req.params.restaurantId);
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const validationError = validateMenuItem(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const menuItem = await menuService.updateMenuItem(
      req.params.itemId,
      req.body,
      req.params.restaurantId
    );
    res.json(menuItem);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const result = await menuService.deleteMenuItem(
      req.params.itemId,
      req.params.restaurantId
    );
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getMenuItems = async (req, res) => {
  try {
    const filters = {
      category: req.query.category,
      priceRange: req.query.priceRange ? JSON.parse(req.query.priceRange) : null
    };
    
    const menuItems = await menuService.getMenuItems(req.params.restaurantId, filters);
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await menuService.getMenuItemById(
      req.params.itemId,
      req.params.restaurantId
    );
    res.json(menuItem);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItems,
  getMenuItemById
};