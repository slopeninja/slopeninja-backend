import fetch from 'isomorphic-fetch';
import performanceNow from 'performance-now';

import {
  parseCARoadCondition,
} from './roads/california';

import {
  parseNVRoadCondition,
} from './roads/nevada';

import {
  parseSierraSnow,
  parseSierraLiftCounts,
  parseSierraTrailCounts,
  parseSierraLifts,
  parseSierraTrails,
} from './resorts/sierra';
import {
  parseSquawSnow,
  parseSquawLiftCounts,
  parseSquawTrailCounts,
  parseSquawLifts,
  parseSquawTrails,
} from './resorts/squaw';
import {
  parseAlpineSnow,
  parseAlpineLiftCounts,
  parseAlpineTrailCounts,
  parseAlpineLifts,
  parseAlpineTrails,
} from './resorts/alpine';
import {
  parseDiamondSnow,
  parseDiamondLiftCounts,
  parseDiamondTrailCounts,
  parseDiamondLifts,
  parseDiamondTrails,
} from './resorts/diamond';
import {
  parseHeavenlySnow,
  parseHeavenlyLiftCounts,
  parseHeavenlyTrailCounts,
  parseHeavenlyLifts,
  parseHeavenlyTrails,
} from './resorts/heavenly';
import {
  parseKirkwoodSnow,
  parseKirkwoodLiftCounts,
  parseKirkwoodTrailCounts,
  parseKirkwoodLifts,
  parseKirkwoodTrails,
} from './resorts/kirkwood';
import {
  parseNorthstarSnow,
  parseNorthstarLiftCounts,
  parseNorthstarTrailCounts,
  parseNorthstarLifts,
  parseNorthstarTrails,
} from './resorts/northstar';
import {
  parseHomewoodSnow,
  parseHomewoodLiftCounts,
  parseHomewoodTrailCounts,
  parseHomewoodLifts,
  parseHomewoodTrails,
} from './resorts/homewood';
import {
  parseSugarSnow,
  parseSugarLiftCounts,
  parseSugarTrailCounts,
  parseSugarLifts,
  parseSugarTrails,
} from './resorts/sugar';
import {
  parseDonnerSnow,
  parseDonnerLiftCounts,
  parseDonnerTrailCounts,
  parseDonnerLifts,
  parseDonnerTrails,
} from './resorts/donner';
import {
  parseMtRoseSnow,
  parseMtRoseLiftCounts,
  parseMtRoseTrailCounts,
  parseMtRoseLifts,
  parseMtRoseTrails,
} from './resorts/mtRose';
import {
  parseBorealSnow,
  parseBorealLiftCounts,
  parseBorealTrailCounts,
  parseBorealLifts,
  parseBorealTrails,
} from './resorts/boreal';

import {
  createHtmlParser,
  createJSONParser,
  createTextParser,
  decodeEntities
} from './parserFactory';
import { parseWeather } from './parseWeather';

// FIXME: verify if heavenly/kirkwood/northstar/boreal 'BASE DEPTH' is summit or base depth
// currently using summit depth as 'BASE DEPTH'

const resortsConfig = {
  'sierra': [ // fnConfigs
    { // fnConfig
      url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Twin_Bridges.json',
      fn: createJSONParser('weather', parseWeather),
    },
    { // fnConfig
      url: 'https://www.sierraattahoe.com/weather-snow-report/',
      fn: createHtmlParser('snow', parseSierraSnow),
    },
    { // fnConfig
      url: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
      fn: createHtmlParser('liftCounts', parseSierraLiftCounts),
    },
    { // fnConfig
      url: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
      fn: createHtmlParser('trailCounts', parseSierraTrailCounts),
    },
    { // fnConfig
      url: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
      fn: createHtmlParser('lifts', parseSierraLifts),
    },
    { // fnConfig
      url: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
      fn: createHtmlParser('trails', parseSierraTrails),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/us50',
      fn: createTextParser('roads', parseCARoadCondition('US', '50')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr88',
      fn: createTextParser('roads', parseCARoadCondition('CA', '88')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'squaw': [
    { // fnConfig
      url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Olympic_Valley.json',
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/snow-weather-reports-lake-tahoe?resort=squaw',
      fn: createHtmlParser('snow', parseSquawSnow),
    },
    { // fnConfig
      url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('liftCounts', parseSquawLiftCounts),
    },
    { // fnConfig
      url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('trailCounts', parseSquawTrailCounts),
    },
    { // fnConfig
      url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('lifts', parseSquawLifts),
    },
    { // fnConfig
      url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('trails', parseSquawTrails),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/i80',
      fn: createTextParser('roads', parseCARoadCondition('I', '80')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr28',
      fn: createTextParser('roads', parseCARoadCondition('CA', '28')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'alpine': [
    { // fnConfig
      url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Olympic_Valley.json',
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/snow-weather-reports-lake-tahoe?resort=squaw',
      fn: createHtmlParser('snow', parseAlpineSnow),
    },
    { // fnConfig
      url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('liftCounts', parseAlpineLiftCounts),
    },
    { // fnConfig
      url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('trailCounts', parseAlpineTrailCounts),
    },
    { // fnConfig
      url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('lifts', parseAlpineLifts),
    },
    { // fnConfig
      url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('trails', parseAlpineTrails),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/i80',
      fn: createTextParser('roads', parseCARoadCondition('I', '80')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr28',
      fn: createTextParser('roads', parseCARoadCondition('CA', '28')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'diamond': [
    { // fnConfig
      url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/NV/Incline_Village.json',
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'http://www.diamondpeak.com/mountain/conditions',
      fn: createHtmlParser('snow', parseDiamondSnow),
    },
    { // fnConfig
      url: 'http://www.diamondpeak.com/mountain/conditions',
      fn: createHtmlParser('liftCounts', parseDiamondLiftCounts),
    },
    { // fnConfig
      url: 'http://www.diamondpeak.com/mountain/conditions',
      fn: createHtmlParser('trailCounts', parseDiamondTrailCounts),
    },
    { // fnConfig
      url: 'http://www.diamondpeak.com/mountain/conditions',
      fn: createHtmlParser('lifts', parseDiamondLifts),
    },
    { // fnConfig
      url: 'http://www.diamondpeak.com/mountain/conditions',
      fn: createHtmlParser('trails', parseDiamondTrails),
    },
    { // fnConfig
      url: 'http://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createTextParser('roads', parseNVRoadCondition('NV', '28')),
    },
    { // fnConfig
      url: 'http://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createTextParser('roads', parseNVRoadCondition('NV', '431')),
    },
  ],
  'heavenly': [
    { // fnConfig
      url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/South_Lake_Tahoe.json',
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'http://www.skiheavenly.com/the-mountain/snow-report/snow-report.aspx',
      fn: createHtmlParser('snow', parseHeavenlySnow),
    },
    { // fnConfig
      url: 'http://www.skiheavenly.com/the-mountain/terrain-and-lift-status.aspx',
      fn: createHtmlParser('liftCounts', parseHeavenlyLiftCounts),
    },
    { // fnConfig
      url: 'http://www.skiheavenly.com/the-mountain/terrain-and-lift-status.aspx',
      fn: createHtmlParser('trailCounts', parseHeavenlyTrailCounts),
    },
    { // fnConfig
      url: 'http://m.skiheavenly.com/x4/website/content_vri_grooming.php?avs=1sl&cI=9017&lat=0&lon=0&accState=1',
      fn: createHtmlParser('lifts', parseHeavenlyLifts),
    },
    { // fnConfig
      url: 'http://m.skiheavenly.com/x4/website/content_vri_grooming.php?avs=1sl&cI=9017&lat=0&lon=0&accState=1',
      fn: createHtmlParser('trails', parseHeavenlyTrails),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/us50',
      fn: createTextParser('roads', parseCARoadCondition('US', '50')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr207',
      fn: createTextParser('roads', parseCARoadCondition('CA', '207')),
    },
  ],
  'kirkwood': [
    { // fnConfig
      url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Kirkwood.json',
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'http://www.kirkwood.com/mountain/snow-and-weather-report.aspx',
      fn: createHtmlParser('snow', parseKirkwoodSnow),
    },
    { // fnConfig
      url: 'http://www.kirkwood.com/mountain/terrain-status.aspx#/Lifts',
      fn: createHtmlParser('liftCounts', parseKirkwoodLiftCounts),
    },
    { // fnConfig
      url: 'http://www.kirkwood.com/mountain/terrain-status.aspx#/Lifts',
      fn: createHtmlParser('trailCounts', parseKirkwoodTrailCounts),
    },
    { // fnConfig
      url: 'http://www.kirkwood.com/mountain/terrain-status.aspx#/Lifts',
      fn: createHtmlParser('lifts', parseKirkwoodLifts),
    },
    { // fnConfig
      url: 'http://www.kirkwood.com/mountain/terrain-status.aspx#/Lifts',
      fn: createHtmlParser('trails', parseKirkwoodTrails),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/us50',
      fn: createTextParser('roads', parseCARoadCondition('US', '50')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr88',
      fn: createTextParser('roads', parseCARoadCondition('CA', '88')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'northstar': [
    { // fnConfig
      url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Truckee.json',
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'http://www.northstarcalifornia.com/the-mountain/snow-weather-report.aspx',
      fn: createHtmlParser('snow', parseNorthstarSnow),
    },
    { // fnConfig
      url: 'http://www.northstarcalifornia.com/the-mountain/terrain-status.aspx#/Lifts',
      fn: createHtmlParser('liftCounts', parseNorthstarLiftCounts),
    },
    { // fnConfig
      url: 'http://www.northstarcalifornia.com/the-mountain/terrain-status.aspx#/Lifts',
      fn: createHtmlParser('trailCounts', parseNorthstarTrailCounts),
    },
    { // fnConfig
      url: 'http://www.northstarcalifornia.com/the-mountain/terrain-status.aspx#/Lifts',
      fn: createHtmlParser('lifts', parseNorthstarLifts),
    },
    { // fnConfig
      url: 'http://www.northstarcalifornia.com/the-mountain/terrain-status.aspx#/Lifts',
      fn: createHtmlParser('trails', parseNorthstarTrails),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr267',
      fn: createTextParser('roads', parseCARoadCondition('CA', '267')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr28',
      fn: createTextParser('roads', parseCARoadCondition('CA', '28')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'homewood': [
    { // fnConfig
      url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Homewood.json',
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'http://www.skihomewood.com/mountain/snow-report',
      fn: createHtmlParser('snow', parseHomewoodSnow),
    },
    { // fnConfig
      url: 'http://www.skihomewood.com/mountain/snow-report',
      fn: createHtmlParser('liftCounts', parseHomewoodLiftCounts),
    },
    { // fnConfig
      url: 'http://www.skihomewood.com/mountain/snow-report',
      fn: createHtmlParser('trailCounts', parseHomewoodTrailCounts),
    },
    { // fnConfig
      url: 'http://www.skihomewood.com/mountain/snow-report',
      fn: createHtmlParser('lifts', parseHomewoodLifts),
    },
    { // fnConfig
      url: 'http://www.skihomewood.com/mountain/snow-report',
      fn: createHtmlParser('trails', parseHomewoodTrails),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'sugar': [ // fnConfigs
    { // fnConfig
      url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Truckee.json',
      fn: createJSONParser('weather', parseWeather),
    },
    { // fnConfig
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('snow', parseSugarSnow),
    },
    { // fnConfig
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('liftCounts', parseSugarLiftCounts),
    },
    { // fnConfig
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('trailCounts', parseSugarTrailCounts),
    },
    { // fnConfig
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('lifts', parseSugarLifts),
    },
    { // fnConfig
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('trails', parseSugarTrails),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/i80',
      fn: createTextParser('roads', parseCARoadCondition('I', '80')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'donner': [ // fnConfigs
    { // fnConfig
      url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Truckee.json',
      fn: createJSONParser('weather', parseWeather),
    },
    { // fnConfig
      url: 'https://www.donnerskiranch.com/snow-report/',
      fn: createHtmlParser('snow', parseDonnerSnow),
    },
    { // fnConfig
      url: 'https://www.donnerskiranch.com/snow-report/',
      fn: createHtmlParser('liftCounts', parseDonnerLiftCounts),
    },
    { // fnConfig
      url: 'https://www.donnerskiranch.com/snow-report/',
      fn: createHtmlParser('trailCounts', parseDonnerTrailCounts),
    },
    { // fnConfig
      url: 'https://www.donnerskiranch.com/snow-report/',
      fn: createHtmlParser('lifts', parseDonnerLifts),
    },
    { // fnConfig
      url: 'https://www.donnerskiranch.com/snow-report/',
      fn: createHtmlParser('trails', parseDonnerTrails),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/i80',
      fn: createTextParser('roads', parseCARoadCondition('I', '80')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr267',
      fn: createTextParser('roads', parseCARoadCondition('CA', '267')),
    },
  ],
  'mtRose': [ // fnConfigs
    { // fnConfig
      url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/NV/Reno.json',
      fn: createJSONParser('weather', parseWeather),
    },
    { // fnConfig
      url: 'http://skirose.com/the-mountain/snow-report/',
      fn: createHtmlParser('snow', parseMtRoseSnow),
    },
    { // fnConfig
      url: 'http://skirose.com/the-mountain/snow-report/',
      fn: createHtmlParser('liftCounts', parseMtRoseLiftCounts),
    },
    { // fnConfig
      url: 'http://skirose.com/the-mountain/snow-report/',
      fn: createHtmlParser('trailCounts', parseMtRoseTrailCounts),
    },
    { // fnConfig
      url: 'http://skirose.com/the-mountain/snow-report/',
      fn: createHtmlParser('lifts', parseMtRoseLifts),
    },
    { // fnConfig
      url: 'http://skirose.com/the-mountain/snow-report/',
      fn: createHtmlParser('trails', parseMtRoseTrails),
    },
    { // fnConfig
      url: 'http://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createTextParser('roads', parseNVRoadCondition('NV', '28')),
    },
    { // fnConfig
      url: 'http://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createTextParser('roads', parseNVRoadCondition('NV', '431')),
    },
    { // fnConfig
      url: 'http://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createTextParser('roads', parseNVRoadCondition('I', '580')),
    },
  ],
  'boreal': [ // fnConfigs
    { // fnConfig
      url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Truckee.json',
      fn: createJSONParser('weather', parseWeather),
    },
    { // fnConfig
      url: 'http://api.rideboreal.com/api/v2?location=/&level=0',
      fn: createJSONParser('snow', parseBorealSnow, ),
    },
    { // fnConfig
      url: 'http://api.rideboreal.com/api/v2?location=/&level=0',
      fn: createJSONParser('liftCounts', parseBorealLiftCounts, decodeEntities),
    },
    { // fnConfig
      url: 'http://api.rideboreal.com/api/v2?location=/&level=0',
      fn: createJSONParser('trailCounts', parseBorealTrailCounts, decodeEntities),
    },
    { // fnConfig
      url: 'http://api.rideboreal.com/api/v2?location=/the-mountain/trail-lift-info/lifts-hours&level=1',
      fn: createJSONParser('lifts', parseBorealLifts, decodeEntities),
    },
    { // fnConfig
      url: 'http://api.rideboreal.com/api/v2?location=/the-mountain/trail-lift-info/full-trail-report&level=1',
      fn: createJSONParser('trails', parseBorealTrails, decodeEntities),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/i80',
      fn: createTextParser('roads', parseCARoadCondition('I', '80')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
    { // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr267',
      fn: createTextParser('roads', parseCARoadCondition('CA', '267')),
    },
  ],
};

const RESPONSE_BODY_CACHE = {
  // url: response,
};

const lookUpOrFetch = async (url) => {
  const cachedText = RESPONSE_BODY_CACHE[url];
  if (cachedText){
    // console.log('Cache hit for', url);
    return cachedText;
  }

  const response = await fetch(url);
  const text = await response.text();

  RESPONSE_BODY_CACHE[url] = text;
  // console.log('Cache miss', url)

  return text;
}

const fetchResort = async (resortName) => {
  const fnConfigs = resortsConfig[resortName];

  // user `for` over `map` to wait before queuing the next fn call
  // so we can hit the cache
  const arrayOfResults = [];
  for (let i = 0; i < fnConfigs.length; i++) {
    const fnConfig = fnConfigs[i];

    const text = await lookUpOrFetch(fnConfig.url);

    const parser = fnConfig.fn;

    const result = await parser(text);

    delete result.lifts;

    arrayOfResults.push(result);
  }

  // flatten the array
  const resortData = arrayOfResults.reduce((acc, result) => {
    // result =
    // {
    //   [key]: value,
    // }

    const key = Object.keys(result)[0];
    const value = result[key];

    if(!acc[key]) {
      return {
        ...acc,
        ...result,
      };
    }

    const values = acc[key];

    if (Array.isArray(values)) {
      values.push(value)

      return {
        ...acc,
        [key]: values,
      };
    } else {
      return {
        ...acc,
        [key]: [acc[key], value]
      }
    }
  }, {})

  return {
    [resortName]: resortData,
  }
}

const fetchResorts = async () => {
  const resorts = Object.keys(resortsConfig);

  const arrayOfPromises = resorts.map(async resortName => {
    const resortData = await fetchResort(resortName);
    return {
      ...resortData,
    };
  });

  const arrayOfResortData = await Promise.all(arrayOfPromises);

  // flatten the array
  const resortsData = arrayOfResortData.reduce((acc, result) => {
    return {
      ...acc,
      ...result,
    };
  }, {})

  return resortsData;
}

const MILLISECONDS = 1000;

const run = async () => {
  const start = performanceNow();
  console.log('Worker starts');

  const resortsData = await fetchResorts();

  console.log(JSON.stringify(resortsData, null, 2));
  const end = performanceNow();

  console.log(((end - start) / MILLISECONDS).toFixed(3), 'seconds');
  console.log('Worker quits');
}

run();
