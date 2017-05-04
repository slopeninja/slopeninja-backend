import knex from 'knex';

const config = {
  client: 'pg',
  connection: `${process.env.DATABASE_URL}?ssl=true`,
};

const SLOPE_NINJA_DB_SCHEMA = 'slopeninja';

const client = knex(config).withSchema(SLOPE_NINJA_DB_SCHEMA);

// const run = async () => {
//   // await client.schema.withSchema(SLOPE_NINJA_DB_SCHEMA).createTableIfNotExists('test', (table) => {
//   //   table.string('id').primary();
//   //   table.string('name');
//   // });
//
//   // const result = await client.raw(`SLECT * FROM test`);
//   const result = await client.select('*').from('test') //.where('id', 'heyhey');
//   console.log(result);
// }
//
// try {
//   run();
// } catch (error) {
//   console.error(error);
// }

export default client;
