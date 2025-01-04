// lib/api/apiHandler.ts

import { errorResponse } from '../utils/responseHandler';
import connectToDatabase from '../mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export const apiHandler = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Connect to DB before running any handler
      await connectToDatabase();
      await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);
      errorResponse(res, 'Something went wrong', 500);
    }
  };
};
