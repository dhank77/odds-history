import { Knex } from 'knex';
import Database from '../connection';
import { UserFavorite, FavoriteWithGame } from '../../types/favorites';

class FavoritesRepository {
  private get db(): Knex {
    return Database.getConnection();
  }

  async findByUserId(userId: string): Promise<FavoriteWithGame[]> {
    throw new Error('Not implemented');
  }

  async add(userId: string, gameId: string): Promise<UserFavorite> {
    throw new Error('Not implemented');
  }

  async remove(userId: string, gameId: string): Promise<number> {
    throw new Error('Not implemented');
  }

  async exists(userId: string, gameId: string): Promise<boolean> {
    throw new Error('Not implemented');
  }
}

export default new FavoritesRepository();
