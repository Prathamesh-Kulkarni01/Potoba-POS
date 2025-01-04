// lib/api/restaurantApi.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Restaurant from '../models/Restaurant';
import { errorResponse, successResponse } from '../utils/responseHandler';

// Add a new restaurant
const addRestaurant = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, phone, address } = req.body;

  // Validation
  if (!name || !email || !phone || !address) {
    return errorResponse(res, 'All fields are required');
  }

  try {
    const restaurant = new Restaurant({ name, email, phone, address });
    await restaurant.save();
    return successResponse(res, restaurant);
  } catch (error) {
    return errorResponse(res, 'Failed to create restaurant', 500);
  }
};

// Get all restaurants
const getRestaurants = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const restaurants = await Restaurant.find({});
    return successResponse(res, restaurants);
  } catch (error) {
    return errorResponse(res, 'Failed to fetch restaurants', 500);
  }
};

// Get a specific restaurant by ID
const getRestaurantById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return errorResponse(res, 'Restaurant not found', 404);
    }
    return successResponse(res, restaurant);
  } catch (error) {
    return errorResponse(res, 'Failed to fetch restaurant', 500);
  }
};

// Update restaurant by ID
const updateRestaurant = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name, email, phone, address } = req.body;

  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { name, email, phone, address },
      { new: true }
    );

    if (!updatedRestaurant) {
      return errorResponse(res, 'Restaurant not found', 404);
    }
    return successResponse(res, updatedRestaurant);
  } catch (error) {
    return errorResponse(res, 'Failed to update restaurant', 500);
  }
};

// Delete restaurant by ID
const deleteRestaurant = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
    if (!deletedRestaurant) {
      return errorResponse(res, 'Restaurant not found', 404);
    }
    return successResponse(res, deletedRestaurant);
  } catch (error) {
    return errorResponse(res, 'Failed to delete restaurant', 500);
  }
};

export { addRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant };
