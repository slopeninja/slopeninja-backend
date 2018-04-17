import Promise from 'bluebird';
import dynamoDBClient from '../db/dynamoDBClient';

const putItem = Promise.promisify(dynamoDBClient.putItem, {
  context: dynamoDBClient,
});

const query = Promise.promisify(dynamoDBClient.query, {
  context: dynamoDBClient,
});

class SnapshotService {
  constructor(config) {
    this.config = config;
  }

  async storeSnapshot(shortName, dateTime, metadata) {
    const params = {
      Item: {
        [this.config.partitionKey]: {
          S: shortName,
        },
        [this.config.sortKey]: {
          N: `${dateTime}`,
        },
        data: {
          S: JSON.stringify(metadata),
        },
      },
      TableName: this.config.tableName,
    };

    return putItem(params);
  }

  async retrieveLatestSnapshotByPartitionKey(shortName) {
    const params = {
      ExpressionAttributeValues: {
        ':shortName': {
          S: shortName,
        },
      },
      KeyConditionExpression: `${this.config.partitionKey} = :shortName`,
      ScanIndexForward: false, // descending
      Limit: 1,
      TableName: this.config.tableName,
    };

    const result = await query(params);

    if (result.Count > 0) {
      return JSON.parse(result.Items[0].data.S);
    }

    return null;
  }
}

export default SnapshotService;
