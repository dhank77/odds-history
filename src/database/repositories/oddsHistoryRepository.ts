import { Knex } from 'knex';
import Database from '../connection';
import { OddsHistory, OddsHistoryQuery } from '../../types/oddsHistory';
import { OddsSnapshot } from '../../types/oddsHistory';

class OddsHistoryRepository {
  private get db(): Knex {
    return Database.getConnection();
  }

  async getGameHistory(
    gameId: string,
    options?: { bookmaker_key?: string; limit?: number }
  ): Promise<OddsSnapshot[]> {
    const query = this.db('odds_history')
      .where({ game_id: gameId });

    if (options?.bookmaker_key) {
      query.where({ bookmaker_key: options.bookmaker_key });
    }

    const snapshots = await query
      .orderBy('snapshot_time', 'desc')
      .limit(options?.limit || 50);

    return snapshots;
  }

  async saveSnapshots(records: OddsSnapshot[]): Promise<void> {
    if (records.length === 0) {
      return;
    }

    // Bulk insert for performance
    await this.db('odds_history')
      .insert(records);
  }

  async saveSnapshot(record: OddsSnapshot): Promise<void> {
    await this.db('odds_history')
      .insert(record);
  }
}

export default new OddsHistoryRepository();
