import { FavoriteWithGame } from '../types/favorites';
import favoritesRepository from '../database/repositories/favoritesRepository';
import { AppError } from '../middleware/errorHandler';

class FavoritesService {
  async getUserFavorites(userId: string): Promise<string[]> {
    const favorites = await favoritesRepository.getUserFavorites(userId);
    return favorites.map(f => f.game_id);
  }

  async addFavorite(userId: string, gameId: string): Promise<void> {
    if (!gameId) {
      throw new AppError('Game ID is required', 400);
    }

    await favoritesRepository.addFavorite(userId, gameId);
  }

  async removeFavorite(userId: string, gameId: string): Promise<void> {
    await favoritesRepository.removeFavorite(userId, gameId);
  }
}

export default new FavoritesService();
