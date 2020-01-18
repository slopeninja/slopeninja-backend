import Promise from 'bluebird';
import dynamoDBClient from '../db/dynamoDBClient';

const putItem = Promise.promisify(dynamoDBClient.putItem, {
  context: dynamoDBClient,
});

const query = Promise.promisify(dynamoDBClient.query, {
  context: dynamoDBClient,
});

class NewsletterService {
  constructor(config) {
    this.config = config;
  }

  async storeNewsletterSample(emailHtml) {
    if (!emailHtml) {
      throw new Error('unknown email content');
    }

    const params = {
      Item: {
        [this.config.partitionKey]: {
          S: 'lastCampaign',
        },
        data: {
          S: emailHtml,
        },
      },
      TableName: this.config.tableName,
    };

    return putItem(params);
  }

  async retrieveNewsletterSample() {
    const params = {
      ExpressionAttributeValues: {
        ':id': {
          S: 'lastCampaign',
        },
      },
      KeyConditionExpression: `${this.config.partitionKey} = :id`,
      ScanIndexForward: false, // descending
      Limit: 1,
      TableName: this.config.tableName,
    };

    const result = await query(params);

    if (result.Count > 0) {
      const lastCampaignText = result.Items[0].data.S;

      return lastCampaignText
        .replace('{subject}', 'Latest Snow Update - Slope Ninja')
        .replace('*|UNSUB|*', 'http://slope.ninja');
    }

    return null;
  }
}

export default NewsletterService;
