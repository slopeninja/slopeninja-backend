import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import fetch from 'isomorphic-fetch';
import ResortService from '../../services/ResortService';

const RESORT_TWITTER_USERNAMES = {
  northstar: '@northstar_ca',
  'diamond-peak': '@diamondpeak',
  kirkwood: '@kirkwoodmtn',
  'donner-ski-ranch': '@donnerskiranch',
  'squaw-valley': '@squawalpine',
  'palisades-tahoe': '@palisadestahoe',
  homewood: '@skihomewood',
  'sierra-at-tahoe': '@sierra_at_tahoe',
  'sugar-bowl': '@sugarbowlresort',
  boreal: '@borealmtn',
  'alpine-meadows': '@skialpine',
  heavenly: '@skiheavenly',
  'mt-rose': '@mtroseskitahoe',
};

const TWEET_MAX_LEN = 280;

const {
  // Slope Ninja App Credentials
  TWITTER_APP_KEY,
  TWITTER_APP_SECRET,
  // @slopeninja user oauth token
  TWITTER_USER_TOKEN,
  TWITTER_USER_TOKEN_SECRET,
} = process.env;

const qs = (params, joinWith = '&') => Object.keys(params).sort().map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join(joinWith);

const createSignature = (method, url, params, consumerSecret, accessTokenSecret) => {
  const data = `${method.toUpperCase()}&${encodeURIComponent(url)}&${encodeURIComponent(qs(params))}`;
  const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(accessTokenSecret)}`;
  const signature = crypto.createHmac('sha1', signingKey).update(data).digest('base64');

  return signature;
};

const updateTwitter = async (status, replyToId) => {
  const nonce = Buffer.from(uuidv4()).toString('base64');
  const timeStamp = Math.floor(Date.now() / 1000);
  const url = 'https://api.twitter.com/1.1/statuses/update.json';

  const parameters = {
    oauth_consumer_key: TWITTER_APP_KEY,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timeStamp,
    oauth_token: TWITTER_USER_TOKEN,
    oauth_version: '1.0',
  };

  const requestBody = {
    status,
    in_reply_to_status_id: replyToId,
  };

  const sigParameters = {
    ...requestBody,
    ...parameters,
  };

  const headers = {
    ...parameters,
    oauth_signature: createSignature(
      'POST',
      url,
      sigParameters,
      TWITTER_APP_SECRET,
      TWITTER_USER_TOKEN_SECRET,
    ),
  };

  const tweetRequest = await fetch(url, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/x-www-form-urlencoded',
      authorization: `OAuth ${qs(headers, ', ')}`,
    }),
    body: qs(requestBody),
  });

  const body = await tweetRequest.json();

  if (
    body &&
    body.errors &&
    body.errors.length
  ) {
    throw new Error(JSON.stringify(body));
  }

  return body;
};

const generateStatuses = (resorts) => {
  const snowedResorts = resorts
    .sort((a, b) => {
      if (a.weather.newSnow < b.weather.newSnow) {
        return 1;
      }
      if (a.weather.newSnow > b.weather.newSnow) {
        return -1;
      }

      return 0;
    })
    .map(resort => `${RESORT_TWITTER_USERNAMES[resort.shortName]} ${resort.weather.newSnow}"`);

  const statuses = [];

  const separator = ', ';
  const tweetPrefix = '24-hour snow update: ';

  let tweet = tweetPrefix;
  for (let i = 0; i < snowedResorts.length; i += 1) {
    if (tweet.length + snowedResorts[i].length > TWEET_MAX_LEN) {
      statuses.push(tweet);
      tweet = `@slopeninja ${tweetPrefix}`;
      i -= 1;
    } else {
      tweet = `${tweet}${snowedResorts[i]}`;

      if (snowedResorts[i + 1] && tweet.length + snowedResorts[i + 1].length <= TWEET_MAX_LEN) {
        tweet = `${tweet}${separator}`;
      }
    }
  }

  statuses.push(tweet);

  return statuses;
};

/* eslint-disable no-console */
export const run = async () => {
  console.log('socialMediaWorker starts');
  const resortService = new ResortService();
  const resorts = await resortService.getResorts();

  const snowedResorts = resorts.filter(resort => resort.weather.newSnow > 0);
  if (!snowedResorts.length) {
    return;
  }

  const statuses = generateStatuses(snowedResorts);

  let prevTweetId = null;
  for (let i = 0; i < statuses.length; i += 1) {
    const status = statuses[i];

    /* eslint-disable no-await-in-loop */
    const tweet = await updateTwitter(status, prevTweetId);

    if (tweet) {
      console.log(`Tweet ID ${tweet.id_str}: ${status}`);
      prevTweetId = tweet.id_str;
    }
  }
};
/* eslint-enable */
