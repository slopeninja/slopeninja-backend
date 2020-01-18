import Raven from 'raven';
import Promise from 'bluebird';

import client, { SLOPE_NINJA_DB_SCHEMA } from '../db/client';
import dynamoDBClient from '../db/dynamoDBClient';

const putItem = Promise.promisify(dynamoDBClient.putItem, {
  context: dynamoDBClient,
});

const query = Promise.promisify(dynamoDBClient.query, {
  context: dynamoDBClient,
});

// Temporarily disable class-methods-use-this before we fix it across the project
/* eslint-disable class-methods-use-this */
class ResortService {
  constructor(config) {
    this.config = config;
  }

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

  async storeLastSnow(lastSnow) {
    const lastSnowString = JSON.stringify(lastSnow);

    const params = {
      Item: {
        [this.config.dynamoDbPartitionKey]: {
          S: 'lastSnow',
        },
        data: {
          S: lastSnowString || 'null',
        },
      },
      TableName: this.config.dynamoDbTableName,
    };

    return putItem(params);
  }

  async retrieveLastSnow() {
    const params = {
      ExpressionAttributeValues: {
        ':id': {
          S: 'lastSnow',
        },
      },
      KeyConditionExpression: `${this.config.dynamoDbPartitionKey} = :id`,
      ScanIndexForward: false, // descending
      Limit: 1,
      TableName: this.config.dynamoDbTableName,
    };

    const result = await query(params);

    if (result.Count > 0) {
      const lastSnowString = result.Items[0].data.S;

      try {
        const lastSnow = JSON.parse(lastSnowString);
        if (lastSnow && lastSnow !== 'null') {
          return lastSnow;
        }
      } catch (error) {
        Raven.captureException(error);
      }
    }

    return null;
  }
}

export default ResortService;
