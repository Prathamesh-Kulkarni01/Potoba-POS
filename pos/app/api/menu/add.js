// pages/api/menu/add.js
import { getSession } from 'next-auth/react';
import connectDb from '../../../lib/mongodb'; // Assuming you have a connectDb helper
import Menu from "@/lib/models/Menu";


export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (req.method === 'POST') {
    const { name, description, price, imageUrl } = req.body;

    try {
      // Create a new menu item for the logged-in restaurant
      const menuItem = await Menu.create({
        name,
        description,
        price,
        imageUrl,
        restaurantId: session.user.id,  // Associate the menu item with the restaurant
      });

      res.status(200).json(menuItem);
    } catch (error) {
      res.status(500).json({ message: 'Error saving menu item', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
