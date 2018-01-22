import redisClient from '../db/redisClient';

// Temporarily disable class-methods-use-this before we fix it across the project
/* eslint-disable class-methods-use-this */

class NewsletterService {
  async setNewsletterSample(emailHtml) {
    const result = await redisClient.set('emailHtml:lastCampaign', emailHtml);
    return result;
  }

  async getNewsletterSample() {
    const lastCampaignText = await redisClient.get('emailHtml:lastCampaign');

    return lastCampaignText
      .replace('{subject}', 'Latest Snow Update - Slope Ninja')
      .replace('*|UNSUB|*', 'http://slope.ninja');
  }
}

export default NewsletterService;
