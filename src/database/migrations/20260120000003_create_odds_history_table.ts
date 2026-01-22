import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('odds_history', (table) => {
    table.bigIncrements('id').primary();
    table.string('game_id', 255).notNullable();
    table.string('bookmaker_key', 100).notNullable();
    table.string('market_key', 100).notNullable();
    table.text('odds_data').notNullable(); // JSON data stored as text
    table.timestamp('snapshot_time').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    table.index('game_id');
    table.index('snapshot_time');
    table.index('bookmaker_key');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('odds_history');
}
