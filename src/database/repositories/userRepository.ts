import { Knex } from 'knex';
import Database from '../connection';
import { User } from '../../types/auth';
import { randomUUID } from 'crypto';

class UserRepository {
  private get db(): Knex {
    return Database.getConnection();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db('users')
      .where({ email })
      .first();
    
    return user || null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.db('users')
      .where({ id })
      .first();
    
    return user || null;
  }

  async create(email: string, passwordHash: string): Promise<User> {
    const [user] = await this.db('users')
      .insert({
        id: randomUUID(),
        email,
        password_hash: passwordHash,
      })
      .returning('*');
    
    return user;
  }
}

export default new UserRepository();
