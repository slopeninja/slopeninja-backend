import knex from 'knex';

const config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
};

export const SLOPE_NINJA_DB_SCHEMA = 'public';

const client = knex(config);

export default client;
