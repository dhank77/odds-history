import { Knex } from 'knex';
import Database from '../connection';
import { UserFavorite, FavoriteWithGame } from '../../types/favorites';

class FavoritesRepository {
  private get db(): Knex {
    return Database.getConnection();
  }

  async getUserFavorites(userId: string): Promise<{ game_id: string }[]> {
    return await this.db('user_favorites')
      .where({ user_id: userId })
      .select('game_id');
  }

  async addFavorite(userId: string, gameId: string): Promise<void> {
    await this.db('user_favorites')
      .insert({
        user_id: userId,
        game_id: gameId,
      })
      .onConflict(['user_id', 'game_id'])
      .ignore();
  }

  async removeFavorite(userId: string, gameId: string): Promise<void> {
    await this.db('user_favorites')
      .where({
        user_id: userId,
        game_id: gameId,
      })
      .delete();
  }

  async isFavorite(userId: string, gameId: string): Promise<boolean> {
    const result = await this.db('user_favorites')
      .where({
        user_id: userId,
        game_id: gameId,
      })
      .first();
    
    return !!result;
  }
}

export default new FavoritesRepository();
