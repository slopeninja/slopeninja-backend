import knex from 'knex';
import { DB } from './dummyDb';

const config = {
  client: 'pg',
  connection: `${process.env.DATABASE_URL}?ssl=true`,
};

export const SLOPE_NINJA_DB_SCHEMA = 'slopeninja';

const client = knex(config);

const run = async () => {
  // await client
  //   .schema
  //   .withSchema(SLOPE_NINJA_DB_SCHEMA)
  //   .createTableIfNotExists('resorts', (table) => {
  //     table.uuid('id').primary();
  //     table.jsonb('metaData');
  //   });

  // const x = DB.resorts.map( async (resort)=>{
  //
  //   const { id, ...rest } = resort;
  //   await client
  //     .withSchema(SLOPE_NINJA_DB_SCHEMA)
  //     .table('resorts')
  //     .insert({
  //       id,
  //       metaData: rest,
  //     });
  // });

  // const result = await client.raw(`SLECT * FROM test`);
  // const result = await client.select('*').from('test') //.where('id', 'heyhey');
  // console.log(result);
}

try {
  run();
} catch (error) {
  console.error(error);
}

export default client;
