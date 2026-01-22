import { Knex } from 'knex';
import Database from '../connection';
import { User } from '../../types/auth';
import { randomUUID } from 'crypto';

class UserRepository {
  private get db(): Knex {
    return Database.getConnection();
  }

  async findByEmail(email: string): Promise<User | null> {
    throw new Error('Not implemented');
  }

  async findById(id: string): Promise<User | null> {
    throw new Error('Not implemented');
  }

  async create(email: string, passwordHash: string): Promise<User> {
    throw new Error('Not implemented');
  }
}

export default new UserRepository();
