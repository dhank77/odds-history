import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/api';
import authService from '../services/authService';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  res.status(401).json({
    success: false,
    error: 'Not implemented',
  } as ApiResponse);
}
