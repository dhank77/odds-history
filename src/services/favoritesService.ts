import { FavoriteWithGame } from '../types/favorites';
import favoritesRepository from '../database/repositories/favoritesRepository';
import { AppError } from '../middleware/errorHandler';

class FavoritesService {
  async getUserFavorites(userId: string): Promise<FavoriteWithGame[]> {
    throw new Error('Not implemented');
  }

  async addFavorite(userId: string, gameId: string): Promise<void> {
    throw new Error('Not implemented');
  }

  async removeFavorite(userId: string, gameId: string): Promise<void> {
    throw new Error('Not implemented');
  }
}

export default new FavoritesService();
