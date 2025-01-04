// pages/api/restaurants/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../lib/api/apiHandler';
import { addRestaurant, getRestaurants } from '../../../lib/api/restaurantApi';

// API route to add or get all restaurants
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await addRestaurant(req, res);
  } else if (req.method === 'GET') {
    await getRestaurants(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default apiHandler(handler);
