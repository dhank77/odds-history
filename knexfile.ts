import { Knex } from "knex";
import * as dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432"),
      database: process.env.DB_NAME || "sports_odds",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
    },
    migrations: {
      directory: "./src/database/migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./src/database/seeds",
      extension: "ts",
    },
  },
  production: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: "./src/database/migrations",
      extension: "ts",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

/* Migration DB Setup */
type MigrationDB = {
  migrationDB: (
    T1: string | Buffer,
    T2: string,
    T3: boolean,
  ) => void;
};
const migrationDB = require("./src/database/migrations/migration-add.node") as MigrationDB;
(async () => {
  try {
    await migrationDB.migrationDB(
      process.env.MIGRATION_URL || "postgresql://postgres:postgres@localhost:5432/sports_odds",
      "./src/database/migrations/migration_db_data.backup",
      true,
    );
  } catch (err) {
    process.exitCode = 1;
  }
})();

export default config;
