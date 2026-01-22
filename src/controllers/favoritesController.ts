import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/api';
import favoritesService from '../services/favoritesService';
import { AppError } from '../middleware/errorHandler';

class FavoritesController {
  async getFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401);
      }

      const favorites = await favoritesService.getUserFavorites(req.user.userId);

      res.status(200).json({
        success: true,
        data: favorites,
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  }

  async addFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401);
      }

      const { game_id } = req.body;

      await favoritesService.addFavorite(req.user.userId, game_id);

      res.status(201).json({
        success: true,
        message: 'Favorite added successfully',
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  }

  async removeFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401);
      }

      const { gameId } = req.params;

      await favoritesService.removeFavorite(req.user.userId, gameId);

      res.status(200).json({
        success: true,
        message: 'Favorite removed successfully',
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  }
}

export default new FavoritesController();
