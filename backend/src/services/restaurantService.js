const Restaurant = require('../models/Restaurant');

const createRestaurant = async (restaurantData, ownerId) => {
  const restaurant = new Restaurant({
    ...restaurantData,
    owner: ownerId
  });
  return await restaurant.save();
};

const updateRestaurant = async (restaurantId, updateData, ownerId) => {
  const restaurant = await Restaurant.findOneAndUpdate(
    { _id: restaurantId, owner: ownerId },
    updateData,
    { new: true }
  );
  return restaurant;
};

const getRestaurants = async (ownerId) => {
  return await Restaurant.find({ owner: ownerId });
};

const getRestaurantById = async (restaurantId, ownerId) => {
  return await Restaurant.findOne({ _id: restaurantId, owner: ownerId });
};

module.exports = {
  createRestaurant,
  updateRestaurant,
  getRestaurants,
  getRestaurantById
};