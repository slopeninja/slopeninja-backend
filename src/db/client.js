import knex from 'knex';

const config = {
  client: 'pg',
  connection: `${process.env.DATABASE_URL}?ssl=true`,
};

export const SLOPE_NINJA_DB_SCHEMA = 'slopeninja';

const client = knex(config);

export default client;
