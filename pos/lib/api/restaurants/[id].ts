// pages/api/restaurants/[id].ts (for a specific restaurant by ID)
import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../lib/api/apiHandler';
import { getRestaurantById, updateRestaurant, deleteRestaurant } from '../../../lib/api/restaurantApi';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    await getRestaurantById(req, res);
  } else if (req.method === 'PUT') {
    await updateRestaurant(req, res);
  } else if (req.method === 'DELETE') {
    await deleteRestaurant(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default apiHandler(handler);
