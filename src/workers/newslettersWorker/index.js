import React from 'react';
import { mjml2html } from 'mjml'
import fetch from 'isomorphic-fetch';
import ResortService from '../../services/ResortService';
import NewsletterService from '../../services/NewsletterService';

import generateEmail from './generateTemplate';
import moment from 'moment';

const MAILCHIMP_PRIVATE_KEY = process.env.MAILCHIMP_PRIVATE_KEY;

const EMAIL_ASSETS_BASE_URL = 'http://www.slope.ninja/emailAssets';

const RESORT_LOGOS = {
  'squaw-valley': `${EMAIL_ASSETS_BASE_URL}/resortLogos/squaw.png`,
  'alpine-meadows': `${EMAIL_ASSETS_BASE_URL}/resortLogos/squaw.png`,
  'boreal': `${EMAIL_ASSETS_BASE_URL}/resortLogos/boreal.png`,
  'diamond-peak': `${EMAIL_ASSETS_BASE_URL}/resortLogos/diamond.png`,
  'donner-ski-ranch': `${EMAIL_ASSETS_BASE_URL}/resortLogos/donner.png`,
  'heavenly': `${EMAIL_ASSETS_BASE_URL}/resortLogos/heavenly.png`,
  'homewood': `${EMAIL_ASSETS_BASE_URL}/resortLogos/homewood.png`,
  'kirkwood': `${EMAIL_ASSETS_BASE_URL}/resortLogos/kirkwood.png`,
  'mt-rose': `${EMAIL_ASSETS_BASE_URL}/resortLogos/mt-rose.png`,
  'northstar': `${EMAIL_ASSETS_BASE_URL}/resortLogos/northstar.png`,
  'sierra-at-tahoe': `${EMAIL_ASSETS_BASE_URL}/resortLogos/sierra.png`,
  'sugar-bowl': `${EMAIL_ASSETS_BASE_URL}/resortLogos/sugarbowl.png`,
};

const WEATHER_ICONS = {
  sunny: `${EMAIL_ASSETS_BASE_URL}/weatherIcons/sunny.png`,
  clear: `${EMAIL_ASSETS_BASE_URL}/weatherIcons/clear.png`,
  cloudy: `${EMAIL_ASSETS_BASE_URL}/weatherIcons/cloudy.png`,
  thunderstorm: `${EMAIL_ASSETS_BASE_URL}/weatherIcons/thunderstorm.png`,
  rain: `${EMAIL_ASSETS_BASE_URL}/weatherIcons/rain.png`,
  snow: `${EMAIL_ASSETS_BASE_URL}/weatherIcons/snow.png`,
};

const COLOR_PALETTE = [
  '#1ED2FF',
  '#FFB061',
  '#4CB950',
  '#FF9274',
  '#E5437C',
  '#736363',
  '#FFCF61',
];

const makeMailchimpHappy = (rawHtml) => rawHtml.replace('@import url(https://fonts.googleapis.com/css?family=Lato:300,400);', '').replace('@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);', '')

export const run = async () => {
  console.log('newslettersWorker starts');

  const resortService = new ResortService();
  const resorts = await resortService.getResorts();

  if (!resorts.find(resort => resort.weather.newSnow > 0)) {
    return;
  }

  const resortRows = resorts.map(resort => {
    return {
      resortName: resort.name,
      resortUrl: `http://slope.ninja/resorts/${resort.shortName}`,
      newSnow: resort.weather.newSnow !== null ? `${resort.weather.newSnow}"` : '-',
      snowDepth: resort.weather.snowDepth !== null ? `${resort.weather.snowDepth}"` : '-',
      weatherIconUrl: WEATHER_ICONS[resort.weather.condition],
      resortLogoUrl: RESORT_LOGOS[resort.shortName],
    };
  });

  resortRows.sort((a, b) => {
    if (a.snowDepth < b.snowDepth) {
      return 1;
    }
    if (a.snowDepth > b.snowDepth) {
      return -1;
    }

    return 0;
  });

  resortRows.sort((a, b) => {
    if (a.newSnow < b.newSnow) {
      return 1;
    }
    if (a.newSnow > b.newSnow) {
      return -1;
    }

    return 0;
  });

  const now = moment();
  const currentDateFormatted = now.format('MMMM Do, YYYY');
  const dateTimeFormatted = `${currentDateFormatted} 1:00 PM`;

  const weekOfDay = now.weekday();


  const SUBJECT_LINE = `Snow Update — ${currentDateFormatted}`;

  const mjml = generateEmail(SUBJECT_LINE, COLOR_PALETTE[weekOfDay], dateTimeFormatted, resortRows);
  const html = mjml2html(mjml)

  const rawHtml = makeMailchimpHappy(html.html)

  const newsletterService = new NewsletterService();
  await newsletterService.setNewsletterSample(rawHtml);

  // Forward the post reqest to MailChimp api
  const token = new Buffer(`anystring:${MAILCHIMP_PRIVATE_KEY}`).toString('base64');

  const TEMPLATE_FOLDER_ID = 'd01c23837c'; /* Daily Snow Update Templates */
  const CAMPAIGN_FOLDER_ID = '37045c44fa'; /* Daily Snow Update */
  const LIST_ID = 'b56b3d32c5';

  const templateCreationRequest = await fetch(`http://us15.api.mailchimp.com/3.0/templates`, {
    method: 'POST',
    headers: new Headers({
      authorization: `Basic ${token}`,
      'content-type': 'application/json',
    }),
    body: JSON.stringify({
      name: SUBJECT_LINE,
      folder_id: TEMPLATE_FOLDER_ID,
    	html: rawHtml,
    }),
  });

  const templateCreationResponseBody = await templateCreationRequest.json();
  const templateId = templateCreationResponseBody.id;

  const campaignCreationRequest = await fetch(`http://us15.api.mailchimp.com/3.0/campaigns`, {
    method: 'POST',
    headers: new Headers({
      authorization: `Basic ${token}`,
      'content-type': 'application/json',
    }),
    body: JSON.stringify({
    	'type': 'regular',
    	'recipients': {
    		'list_id': LIST_ID,
    	},
    	'settings': {
    		'subject_line': SUBJECT_LINE,
    		'preview_text': '',
    		'title': SUBJECT_LINE,
    		'from_name': 'Slope Ninja',
    		'reply_to': 'donotreply@slope.ninja',
    		'use_conversation':  false,
    		'to_name': '',
    		'folder_id': CAMPAIGN_FOLDER_ID,
    		'authenticate': true,
    		'auto_footer': false,
    		'inline_css': false,
    		'auto_tweet': false,
    		'fb_comments': false,
    		'template_id': templateId,
    	},
    	'tracking': {
    		'opens': true,
    		'html_clicks': true,
    		'text_clicks': false,
    		'goal_tracking': false,
    		'ecomm360': false,
    	},
    }),
  });

  const campaignCreationResponseBody = await campaignCreationRequest.json();
  const campaignId = campaignCreationResponseBody.id;

  const campaignDeliveryRequest = await fetch(`http://us15.api.mailchimp.com/3.0/campaigns/${campaignId}/actions/send`, {
    method: 'POST',
    headers: new Headers({
      authorization: `Basic ${token}`,
    }),
  });

  const campaignDeliverResponseBody = await campaignDeliveryRequest.json();
  console.log(campaignDeliverResponseBody);

  console.log(`Campaign Sent ${campaignId}:${templateId}`);
}
