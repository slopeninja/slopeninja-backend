import redisClient from '../db/redisClient';

class NewsletterService {
  async setNewsletterSample(emailHtml) {
    const result = await redisClient.set('emailHtml:lastCampaign', emailHtml);
    return result;
  }

  async getNewsletterSample() {
    const lastCampaign = await redisClient.get('emailHtml:lastCampaign');
    const lastCampaignWithReplacedLink = lastCampaign.replace("*|UNSUB|*", "http://slope.ninja");
    return lastCampaignWithReplacedLink;
  }
}

export default NewsletterService;
