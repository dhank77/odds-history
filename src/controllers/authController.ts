import { Request, Response } from 'express';
import { ApiResponse } from '../types/api';
import authService from '../services/authService';
import { AppError } from '../middleware/errorHandler';

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    throw new Error('Not implemented');
  }

  async login(req: Request, res: Response): Promise<void> {
    throw new Error('Not implemented');
  }

  async me(req: Request, res: Response): Promise<void> {
    throw new Error('Not implemented');
  }
}

export default new AuthController();
