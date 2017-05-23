import client, {
  SLOPE_NINJA_DB_SCHEMA
} from '../db/client';

import { DB } from '../db/dummyDb';

class ResortService {
  async getResorts() {
    const resorts = await client
     .withSchema(SLOPE_NINJA_DB_SCHEMA)
     .select('*')
     .from('resorts');

    return resorts.map(
      ({id, metaData}) => ({ id, ...metaData })
    );
  }

  async findById(resortId) {
    const [resort] = await client
      .withSchema(SLOPE_NINJA_DB_SCHEMA)
      .select('*')
      .from('resorts')
      .where('id', resortId);

    if(!resort) {
      return;
    }

    const { id, metaData } = resort;
    return { id, ...metaData };
  }
}

export default ResortService;
