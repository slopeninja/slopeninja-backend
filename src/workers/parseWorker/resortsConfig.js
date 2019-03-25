import { parseCARoadCondition } from './roads/california';

import { parseNVRoadCondition } from './roads/nevada';

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
  decodeEntities,
} from './parserFactory';

import { parseWeather } from './parseWeather';

const { DARKSKY_API_KEY } = process.env;

export const resortConstants = {
  'sierra-at-tahoe': {
    name: 'Sierra-at-Tahoe',
    logo: '/images/resorts/sierra.svg',
    coords: { lat: 38.79935, lng: -120.080906 },
    location: 'Twin Bridges, CA 95735',
    resortUrl: 'https://www.sierraattahoe.com/',
  },
  'squaw-valley': {
    name: 'Squaw Valley',
    logo: '/images/resorts/squaw.svg',
    coords: { lat: 39.1969822, lng: -120.2431388 },
    location: 'Olympic Valley, CA 96146',
    resortUrl: 'https://squawalpine.com/',
  },
  'alpine-meadows': {
    name: 'Alpine Meadows',
    logo: '/images/resorts/squaw.svg',
    coords: { lat: 39.154969, lng: -120.238209 },
    location: 'Alpine Meadows, CA 96146',
    resortUrl: 'https://squawalpine.com/',
  },
  'diamond-peak': {
    name: 'Diamond Peak',
    logo: '/images/resorts/diamond.svg',
    coords: { lat: 39.253813, lng: -119.92171 },
    location: 'Incline Village, NV 89451',
    resortUrl: 'https://www.diamondpeak.com/',
  },
  heavenly: {
    name: 'Heavenly',
    logo: '/images/resorts/heavenly.svg',
    coords: { lat: 38.929011, lng: -119.906233 },
    location: 'Stateline, NV 89449',
    resortUrl: 'https://www.skiheavenly.com/',
  },
  kirkwood: {
    name: 'Kirkwood',
    logo: '/images/resorts/kirkwood.svg',
    coords: { lat: 38.678233, lng: -120.063198 },
    location: 'Kirkwood, CA 95646',
    resortUrl: 'https://www.kirkwood.com/',
  },
  northstar: {
    name: 'Northstar',
    logo: '/images/resorts/northstar.svg',
    coords: { lat: 39.258638, lng: -120.133293 },
    location: 'Truckee, CA 96161',
    resortUrl: 'https://www.northstarcalifornia.com/',
  },
  homewood: {
    name: 'Homewood',
    logo: '/images/resorts/homewood.svg',
    coords: { lat: 39.077952, lng: -120.171985 },
    location: 'Homewood, CA 96141',
    resortUrl: 'https://www.skihomewood.com/',
  },
  'sugar-bowl': {
    name: 'Sugar Bowl',
    logo: '/images/resorts/sugarbowl.svg',
    coords: { lat: 39.3000277, lng: -120.3437774 },
    location: 'Norden, CA 95724',
    resortUrl: 'https://www.sugarbowl.com/',
  },
  'donner-ski-ranch': {
    name: 'Donner Ski Ranch',
    logo: '/images/resorts/donner.svg',
    coords: { lat: 39.318255, lng: -120.330083 },
    location: 'Norden, CA 95724',
    resortUrl: 'https://www.donnerskiranch.com/',
  },
  'mt-rose': {
    name: 'Mt Rose',
    logo: '/images/resorts/mt-rose.svg',
    coords: { lat: 39.314905, lng: -119.881005 },
    location: 'Reno, NV 89511',
    resortUrl: 'https://skirose.com/',
  },
  boreal: {
    name: 'Boreal',
    logo: '/images/resorts/boreal.svg',
    coords: { lat: 39.332769, lng: -120.347075 },
    location: 'Soda Springs, CA 95728',
    resortUrl: 'https://www.rideboreal.com/',
  },
};

const getResortCoords = resortName => `${resortConstants[resortName].coords.lat},${resortConstants[resortName].coords.lng}`;

export const resortsConfig = {
  'sierra-at-tahoe': [
    // fnConfigs
    {
      // fnConfig
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('sierra-at-tahoe')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      // fnConfig
      url: 'https://www.sierraattahoe.com/weather-snow-report/',
      fn: createHtmlParser('snow', parseSierraSnow),
    },
    {
      // fnConfig
      url: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
      fn: createHtmlParser('liftCounts', parseSierraLiftCounts),
    },
    {
      // fnConfig
      url: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
      fn: createHtmlParser('trailCounts', parseSierraTrailCounts),
    },
    {
      // fnConfig
      url: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
      fn: createHtmlParser('lifts', parseSierraLifts),
    },
    {
      // fnConfig
      url: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
      fn: createHtmlParser('trails', parseSierraTrails),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/us50',
      fn: createTextParser('roads', parseCARoadCondition('US', '50')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr88',
      fn: createTextParser('roads', parseCARoadCondition('CA', '88')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'squaw-valley': [
    {
      // fnConfig
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('squaw-valley')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url:
        'http://squawalpine.com/skiing-riding/weather-conditions-webcams/snow-weather-reports-lake-tahoe?resort=squaw',
      fn: createHtmlParser('snow', parseSquawSnow),
    },
    {
      // fnConfig
      url:
        'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('liftCounts', parseSquawLiftCounts),
    },
    {
      // fnConfig
      url:
        'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('trailCounts', parseSquawTrailCounts),
    },
    {
      // fnConfig
      url:
        'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('lifts', parseSquawLifts),
    },
    {
      // fnConfig
      url:
        'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('trails', parseSquawTrails),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/i80',
      fn: createTextParser('roads', parseCARoadCondition('I', '80')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr28',
      fn: createTextParser('roads', parseCARoadCondition('CA', '28')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'alpine-meadows': [
    {
      // fnConfig
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('alpine-meadows')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url:
        'http://squawalpine.com/skiing-riding/weather-conditions-webcams/snow-weather-reports-lake-tahoe?resort=squaw',
      fn: createHtmlParser('snow', parseAlpineSnow),
    },
    {
      // fnConfig
      url:
        'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('liftCounts', parseAlpineLiftCounts),
    },
    {
      // fnConfig
      url:
        'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('trailCounts', parseAlpineTrailCounts),
    },
    {
      // fnConfig
      url:
        'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('lifts', parseAlpineLifts),
    },
    {
      // fnConfig
      url:
        'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
      fn: createHtmlParser('trails', parseAlpineTrails),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/i80',
      fn: createTextParser('roads', parseCARoadCondition('I', '80')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr28',
      fn: createTextParser('roads', parseCARoadCondition('CA', '28')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'diamond-peak': [
    {
      // fnConfig
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('diamond-peak')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'http://www.diamondpeak.com/mountain/conditions',
      fn: createHtmlParser('snow', parseDiamondSnow),
    },
    {
      // fnConfig
      url: 'http://www.diamondpeak.com/mountain/conditions',
      fn: createHtmlParser('liftCounts', parseDiamondLiftCounts),
    },
    {
      // fnConfig
      url: 'http://www.diamondpeak.com/mountain/conditions',
      fn: createHtmlParser('trailCounts', parseDiamondTrailCounts),
    },
    {
      // fnConfig
      url: 'http://www.diamondpeak.com/mountain/conditions',
      fn: createHtmlParser('lifts', parseDiamondLifts),
    },
    {
      // fnConfig
      url: 'http://www.diamondpeak.com/mountain/conditions',
      fn: createHtmlParser('trails', parseDiamondTrails),
    },
    {
      // fnConfig
      url: 'http://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createHtmlParser('roads', parseNVRoadCondition('NV', '28')),
    },
    {
      // fnConfig
      url: 'http://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createHtmlParser('roads', parseNVRoadCondition('NV', '431')),
    },
  ],
  heavenly: [
    {
      // fnConfig
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('heavenly')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url:
        'https://www.skiheavenly.com/the-mountain/mountain-conditions/snow-and-weather-report.aspx',
      fn: createHtmlParser('snow', parseHeavenlySnow),
    },
    {
      // fnConfig
      url:
        'https://www.skiheavenly.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('liftCounts', parseHeavenlyLiftCounts),
    },
    {
      // fnConfig
      url:
        'https://www.skiheavenly.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('trailCounts', parseHeavenlyTrailCounts),
    },
    {
      // fnConfig
      url:
        'http://m.skiheavenly.com/x4/website/content_vri_grooming.php?avs=1sl&cI=9017&lat=0&lon=0&accState=1',
      fn: createHtmlParser('lifts', parseHeavenlyLifts),
    },
    {
      // fnConfig
      url:
        'http://m.skiheavenly.com/x4/website/content_vri_grooming.php?avs=1sl&cI=9017&lat=0&lon=0&accState=1',
      fn: createHtmlParser('trails', parseHeavenlyTrails),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/us50',
      fn: createTextParser('roads', parseCARoadCondition('US', '50')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
    {
      // fnConfig
      url: 'http://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createHtmlParser('roads', parseNVRoadCondition('NV', '207')),
    },
  ],
  kirkwood: [
    {
      // fnConfig
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('kirkwood')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'https://www.kirkwood.com/the-mountain/mountain-conditions/snow-and-weather-report.aspx',
      fn: createHtmlParser('snow', parseKirkwoodSnow),
    },
    {
      // fnConfig
      url: 'https://www.kirkwood.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('liftCounts', parseKirkwoodLiftCounts),
    },
    {
      // fnConfig
      url: 'https://www.kirkwood.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('trailCounts', parseKirkwoodTrailCounts),
    },
    {
      // fnConfig
      url: 'https://www.kirkwood.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('lifts', parseKirkwoodLifts),
    },
    {
      // fnConfig
      url: 'https://www.kirkwood.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('trails', parseKirkwoodTrails),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/us50',
      fn: createTextParser('roads', parseCARoadCondition('US', '50')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr88',
      fn: createTextParser('roads', parseCARoadCondition('CA', '88')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  northstar: [
    {
      // fnConfig
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('northstar')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url:
        'https://www.northstarcalifornia.com/the-mountain/mountain-conditions/snow-and-weather-report.aspx',
      fn: createHtmlParser('snow', parseNorthstarSnow),
    },
    {
      // fnConfig
      url:
        'https://www.northstarcalifornia.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('liftCounts', parseNorthstarLiftCounts),
    },
    {
      // fnConfig
      url:
        'https://www.northstarcalifornia.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('trailCounts', parseNorthstarTrailCounts),
    },
    {
      // fnConfig
      url:
        'https://www.northstarcalifornia.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('lifts', parseNorthstarLifts),
    },
    {
      // fnConfig
      url:
        'https://www.northstarcalifornia.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('trails', parseNorthstarTrails),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr267',
      fn: createTextParser('roads', parseCARoadCondition('CA', '267')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr28',
      fn: createTextParser('roads', parseCARoadCondition('CA', '28')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  homewood: [
    {
      // fnConfig
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('homewood')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'http://www.skihomewood.com/mountain/snow-report',
      fn: createHtmlParser('snow', parseHomewoodSnow),
    },
    {
      // fnConfig
      url: 'http://www.skihomewood.com/mountain/snow-report',
      fn: createHtmlParser('liftCounts', parseHomewoodLiftCounts),
    },
    {
      // fnConfig
      url: 'http://www.skihomewood.com/mountain/snow-report',
      fn: createHtmlParser('trailCounts', parseHomewoodTrailCounts),
    },
    {
      // fnConfig
      url: 'http://www.skihomewood.com/mountain/snow-report',
      fn: createHtmlParser('lifts', parseHomewoodLifts),
    },
    {
      // fnConfig
      url: 'http://www.skihomewood.com/mountain/snow-report',
      fn: createHtmlParser('trails', parseHomewoodTrails),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'sugar-bowl': [
    // fnConfigs
    {
      // fnConfig
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('sugar-bowl')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      // fnConfig
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('snow', parseSugarSnow),
    },
    {
      // fnConfig
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('liftCounts', parseSugarLiftCounts),
    },
    {
      // fnConfig
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('trailCounts', parseSugarTrailCounts),
    },
    {
      // fnConfig
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('lifts', parseSugarLifts),
    },
    {
      // fnConfig
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('trails', parseSugarTrails),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/i80',
      fn: createTextParser('roads', parseCARoadCondition('I', '80')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'donner-ski-ranch': [
    // fnConfigs
    {
      // fnConfig
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('donner-ski-ranch')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      // fnConfig
      url: 'https://www.donnerskiranch.com/snow-report/',
      fn: createHtmlParser('snow', parseDonnerSnow),
    },
    {
      // fnConfig
      url: 'https://www.donnerskiranch.com/snow-report/',
      fn: createHtmlParser('liftCounts', parseDonnerLiftCounts),
    },
    {
      // fnConfig
      url: 'https://www.donnerskiranch.com/snow-report/',
      fn: createHtmlParser('trailCounts', parseDonnerTrailCounts),
    },
    {
      // fnConfig
      url: 'https://www.donnerskiranch.com/snow-report/',
      fn: createHtmlParser('lifts', parseDonnerLifts),
    },
    {
      // fnConfig
      url: 'https://www.donnerskiranch.com/snow-report/',
      fn: createHtmlParser('trails', parseDonnerTrails),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/i80',
      fn: createTextParser('roads', parseCARoadCondition('I', '80')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr267',
      fn: createTextParser('roads', parseCARoadCondition('CA', '267')),
    },
  ],
  'mt-rose': [
    // fnConfigs
    {
      // fnConfig
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('mt-rose')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      // fnConfig
      url: 'http://skirose.com/the-mountain/snow-report/',
      fn: createHtmlParser('snow', parseMtRoseSnow),
    },
    {
      // fnConfig
      url: 'http://skirose.com/the-mountain/snow-report/',
      fn: createHtmlParser('liftCounts', parseMtRoseLiftCounts),
    },
    {
      // fnConfig
      url: 'http://skirose.com/the-mountain/snow-report/',
      fn: createHtmlParser('trailCounts', parseMtRoseTrailCounts),
    },
    {
      // fnConfig
      url: 'http://skirose.com/the-mountain/snow-report/',
      fn: createHtmlParser('lifts', parseMtRoseLifts),
    },
    {
      // fnConfig
      url: 'http://skirose.com/the-mountain/snow-report/',
      fn: createHtmlParser('trails', parseMtRoseTrails),
    },
    {
      // fnConfig
      url: 'http://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createHtmlParser('roads', parseNVRoadCondition('NV', '28')),
    },
    {
      // fnConfig
      url: 'http://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createHtmlParser('roads', parseNVRoadCondition('NV', '431')),
    },
    {
      // fnConfig
      url: 'http://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createHtmlParser('roads', parseNVRoadCondition('I', '580')),
    },
  ],
  boreal: [
    // fnConfigs
    {
      // fnConfig
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('boreal')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      // fnConfig
      url: 'https://s3.us-east-2.amazonaws.com/tech4snow/feeds/9/conditions.json?time=1521572151',
      fn: createJSONParser('snow', parseBorealSnow),
    },
    {
      // fnConfig
      url: 'https://s3.us-east-2.amazonaws.com/tech4snow/feeds/9/conditions.json?time=1521572151',
      fn: createJSONParser('liftCounts', parseBorealLiftCounts, decodeEntities),
    },
    {
      // fnConfig
      url: 'https://s3.us-east-2.amazonaws.com/tech4snow/feeds/9/conditions.json?time=1521572151',
      fn: createJSONParser(
        'trailCounts',
        parseBorealTrailCounts,
        decodeEntities,
      ),
    },
    {
      // fnConfig
      url:
        'https://s3.us-east-2.amazonaws.com/tech4snow/feeds/9/status.json?time=1521572151',
      fn: createJSONParser('lifts', parseBorealLifts, decodeEntities),
    },
    {
      // fnConfig
      url:
        'https://s3.us-east-2.amazonaws.com/tech4snow/feeds/9/status.json?time=1521572151',
      fn: createJSONParser('trails', parseBorealTrails, decodeEntities),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/i80',
      fn: createTextParser('roads', parseCARoadCondition('I', '80')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr89',
      fn: createTextParser('roads', parseCARoadCondition('CA', '89')),
    },
    {
      // fnConfig
      url: 'http://www.dot.ca.gov/hq/roadinfo/sr267',
      fn: createTextParser('roads', parseCARoadCondition('CA', '267')),
    },
  ],
};
