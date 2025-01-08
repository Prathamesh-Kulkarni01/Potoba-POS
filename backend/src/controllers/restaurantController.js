const restaurantService = require('../services/restaurantService');
const { validateRestaurant } = require('../validators/restaurantValidator');

const createRestaurant = async (req, res) => {
  try {
    const validationError = validateRestaurant(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const restaurant = await restaurantService.createRestaurant(req.body, req.user.id);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const validationError = validateRestaurant(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const restaurant = await restaurantService.updateRestaurant(
      req.params.restaurantId,
      req.body,
      req.user.id
    );
    
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantService.getRestaurants(req.user.id);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await restaurantService.getRestaurantById(
      req.params.restaurantId,
      req.user.id
    );
    
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRestaurant,
  updateRestaurant,
  getRestaurants,
  getRestaurantById
};