import crypto from 'crypto';
import fetch from 'isomorphic-fetch';
import performanceNow from 'performance-now';
import Raven from 'raven';

import SnapshotService from '../../services/SnapshotService';

import createMetadata from './createMetadata';
import updateResort from './updateResort';
import updateSnowLastSeen from './updateSnowLastSeen';

import { generateMetadataWithSnapshot } from './generateMetadataWithSnapshot';

import { resortsConfig } from './resortsConfig';

// FIXME: verify if heavenly/kirkwood/northstar/boreal 'BASE DEPTH' is summit or
// base depth currently using summit depth as 'BASE DEPTH'

const MILLISECONDS = 1000;
let RESPONSE_BODY_CACHE = { /* hashedUrl: response */ };

const hash = str => crypto.createHash('md5').update(str).digest('hex');

/* eslint-disable no-console */
const lookUpOrFetch = async (url, fetchConfig) => {
  console.log('Cache lookup for', url);

  const hashedUrl = hash(url);

  const cachedText = RESPONSE_BODY_CACHE[hashedUrl];

  if (cachedText) {
    console.log('> Cache hit for', url, hashedUrl);
    return cachedText;
  }

  const response = await fetch(url, fetchConfig);
  const text = await response.text();

  RESPONSE_BODY_CACHE[hashedUrl] = text;
  console.log('> Cache miss', url, hashedUrl);

  return text;
};
/* eslint-enable */

const fetchResort = async (resortName) => {
  const fnConfigs = resortsConfig[resortName];

  // user `for` over `map` to wait before queuing the next fn call
  // so we can hit the cache
  const arrayOfResults = [];
  let stale = false;

  for (let i = 0; i < fnConfigs.length; i += 1) {
    const fnConfig = fnConfigs[i];

    /* eslint-disable no-await-in-loop, no-console */
    let text;
    try {
      text = await lookUpOrFetch(fnConfig.url, fnConfig.fetchConfig);
    } catch (error) {
      stale = true;
      console.log(error);
      Raven.captureException(error);
    }

    // Run the parser regardless of lookupOrFetch failures above (e.g. network
    // failures) so we get at least the defaults in there instead of, let's say,
    // a highway disappearing completely. Hence the duplicate catch blocks.
    // Ugly, but in this case necessary.
    const parser = fnConfig.fn;
    try {
      const result = await parser(text, fnConfig.url);
      arrayOfResults.push(result);
    } catch (error) {
      stale = true;
      console.log(error);
      Raven.captureException(error);
    }
    /* eslint-enable */
  }

  // flatten the array
  const resortData = arrayOfResults.reduce((acc, result) => {
    // result =
    // {
    //   [key]: value,
    // }

    const key = Object.keys(result)[0];
    const value = result[key];

    if (!acc[key]) {
      return {
        ...acc,
        ...result,
      };
    }

    const values = acc[key];

    if (Array.isArray(values)) {
      values.push(value);

      return {
        ...acc,
        [key]: values,
      };
    }
    return {
      ...acc,
      [key]: [acc[key], value],
    };
  }, {});

  // { 'sierra-at-tahoe':
  //   { weather: [Object],
  //     snow: [Object],
  //     liftCounts: [Object],
  //     trailCounts: [Object],
  //     lifts: [Array],
  //     trails: [Array],
  //     roads: [Array],
  //     stale: false
  //   }
  // }
  return {
    [resortName]: {
      ...resortData,
      stale,
    },
  };
};

const fetchResorts = async () => {
  const resorts = Object.keys(resortsConfig);

  const arrayOfResortData = [];
  // user `for` over `map` to wait before queuing the next fn call
  // so we can hit the cache
  for (let i = 0; i < resorts.length; i += 1) {
    const resortName = resorts[i];
    /* eslint-disable no-await-in-loop */
    const resortData = await fetchResort(resortName);
    /* eslint-enable */
    arrayOfResortData.push(resortData);
  }

  // flatten the array
  const resortsData = arrayOfResortData.reduce((acc, result) => {
    return {
      ...acc,
      ...result,
    };
  }, {});

  return resortsData;
};

const updateMetadata = async (resortsData) => {
  const resortKeys = Object.keys(resortsData);

  const config = {
    tableName: 'slopeNinjaSnapshots',
    partitionKey: 'shortName',
    sortKey: 'dateTime',
  };

  const snapshotService = new SnapshotService(config);

  const arrayOfPromises = resortKeys.map(async (shortName) => {
    let metadatum;
    try {
      metadatum = createMetadata(shortName, resortsData[shortName]);

      const snapshot = await snapshotService.retrieveLatestSnapshotByPartitionKey(shortName);

      metadatum = generateMetadataWithSnapshot(metadatum, snapshot);

      await updateResort(shortName, metadatum);
    } catch (error) {
      /* eslint-disable no-console */
      console.log(`Resort [${shortName}] failed to parse`);
      console.log(error);
      /* eslint-enable */
      Raven.captureException(error);
    }

    return metadatum;
  });

  const metadata = await Promise.all(arrayOfPromises);

  // get rid of failed resorts (undefined values)
  return metadata.filter(metadatum => !!metadatum);
};

export const run = async () => {
  /* eslint-disable no-console */
  const start = performanceNow();
  console.log('parseWorker starts');

  try {
    const resortsData = await fetchResorts();

    const metadata = await updateMetadata(resortsData);

    await updateSnowLastSeen(metadata);

    console.log(JSON.stringify(metadata, null, 2));
  } catch (error) {
    console.log(error);
    Raven.captureException(error);
  } finally {
    // reset the cache for next run
    RESPONSE_BODY_CACHE = {};
  }

  const end = performanceNow();
  console.log(((end - start) / MILLISECONDS).toFixed(3), 'seconds');
  console.log('Worker quits');
  /* eslint-enable */
};

run();
