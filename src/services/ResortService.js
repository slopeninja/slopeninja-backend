import Raven from 'raven';
import client, {
  SLOPE_NINJA_DB_SCHEMA,
} from '../db/client';

import redisClient from '../db/redisClient';

// Temporarily disable class-methods-use-this before we fix it across the project
/* eslint-disable class-methods-use-this */

class ResortService {
  async getResorts() {
    const resorts = await client
      .withSchema(SLOPE_NINJA_DB_SCHEMA)
      .select('*')
      .from('resorts');

    return resorts.map(({ id, metaData, shortName }) => ({ id, shortName, ...metaData }));
  }

  async findById(resortId) {
    const [resort] = await client
      .withSchema(SLOPE_NINJA_DB_SCHEMA)
      .select('*')
      .from('resorts')
      .where('id', resortId);

    if (!resort) {
      return null;
    }

    const { id, metaData, shortName } = resort;
    return { id, shortName, ...metaData };
  }

  async findByShortName(shortName) {
    const [resort] = await client
      .withSchema(SLOPE_NINJA_DB_SCHEMA)
      .select('*')
      .from('resorts')
      .where('shortName', shortName);

    if (!resort) {
      return null;
    }

    const { id, metaData } = resort;
    return { id, shortName, ...metaData };
  }

  async setSnowMetadata(lastSnow) {
    const lastSnowRaw = JSON.stringify(lastSnow);
    const result = await redisClient.set('snow-metadata:lastSnow', lastSnowRaw);

    return result;
  }

  async getSnowMetadata() {
    const lastSnowRaw = await redisClient.get('snow-metadata:lastSnow');

    let lastSnow;

    try {
      lastSnow = JSON.parse(lastSnowRaw);
    } catch (error) {
      Raven.captureException(error);
      /* eslint-disable no-console */
      console.log('Error parsing last snow metadata');
      /* eslint-enable */
    }

    return lastSnow;
  }
}

export default ResortService;
