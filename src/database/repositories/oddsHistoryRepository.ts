import { Knex } from 'knex';
import Database from '../connection';
import { OddsHistory, OddsHistoryQuery } from '../../types/oddsHistory';

class OddsHistoryRepository {
  private get db(): Knex {
    return Database.getConnection();
  }

  async findByGameId(
    gameId: string,
    options: OddsHistoryQuery = {}
  ): Promise<OddsHistory[]> {
    throw new Error('Not implemented');
  }

  async bulkInsert(records: Partial<OddsHistory>[]): Promise<void> {
    throw new Error('Not implemented');
  }

  async insert(record: Partial<OddsHistory>): Promise<OddsHistory> {
    throw new Error('Not implemented');
  }
}

export default new OddsHistoryRepository();
