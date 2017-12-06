import dataGridClient from '../db/dataGridClient';

class NewsletterService {
  async setNewsletterSample(emailHtml) {
    const result = await dataGridClient.set('emailHtml:lastCampaign', emailHtml);
    return result;
  }

  async getNewsletterSample() {
    const lastCampaignText = await dataGridClient.get('emailHtml:lastCampaign');
    
    return lastCampaignText
              .replace("{subject}", "Latest Snow Update - Slope Ninja")
              .replace("*|UNSUB|*", "http://slope.ninja");
  }
}

export default NewsletterService;
