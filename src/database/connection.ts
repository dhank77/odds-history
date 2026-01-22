import knex, { Knex } from 'knex';
import config from '../../knexfile';

const environment = process.env.NODE_ENV || 'development';
const knexConfig = config[environment];

class Database {
  private static instance: Knex | null = null;

  public static getInstance(): Knex {
    if (!Database.instance) {
      Database.instance = knex(knexConfig);
    }
    return Database.instance;
  }

  public static getConnection(): Knex {
    return Database.getInstance();
  }

  public static async testConnection(): Promise<boolean> {
    try {
      const db = Database.getInstance();
      await db.raw('SELECT 1');
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

  public static async closeConnection(): Promise<void> {
    if (Database.instance) {
      await Database.instance.destroy();
      Database.instance = null;
    }
  }
}

export default Database;
export const db = Database.getInstance();
