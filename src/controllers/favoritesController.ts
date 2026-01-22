import { Request, Response } from 'express';
import { ApiResponse } from '../types/api';
import favoritesService from '../services/favoritesService';
import { AppError } from '../middleware/errorHandler';

class FavoritesController {
  async getFavorites(req: Request, res: Response): Promise<void> {
    throw new Error('Not implemented');
  }

  async addFavorite(req: Request, res: Response): Promise<void> {
    throw new Error('Not implemented');
  }

  async removeFavorite(req: Request, res: Response): Promise<void> {
    throw new Error('Not implemented');
  }
}

export default new FavoritesController();
