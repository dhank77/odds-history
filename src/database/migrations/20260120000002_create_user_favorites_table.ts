import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_favorites', (table) => {
    table.increments('id').primary();
    table.uuid('user_id').notNullable();
    table.string('game_id', 255).notNullable();
    table.timestamps(true, true);
    
    table.unique(['user_id', 'game_id']);
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('user_favorites');
}
