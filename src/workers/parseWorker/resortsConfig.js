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
  'palisades-tahoe': {
    name: 'Palisades Tahoe',
    logo: '/images/resorts/palisades.svg',
    coords: { lat: 39.1969822, lng: -120.2431388 },
    location: 'Olympic Valley, CA 96146',
    resortUrl: 'https://www.palisadestahoe.com/',
  },
  'alpine-meadows': {
    name: 'Alpine Meadows',
    logo: '/images/resorts/palisades.svg',
    coords: { lat: 39.154969, lng: -120.238209 },
    location: 'Alpine Meadows, CA 96146',
    resortUrl: 'https://www.palisadestahoe.com/',
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

const qs = (params, joinWith = '&') => Object.keys(params).sort().map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join(joinWith);

export const resortsConfig = {
  'sierra-at-tahoe': [
    {
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('sierra-at-tahoe')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'https://www.sierraattahoe.com/weather-snow-report/',
      fn: createHtmlParser('snow', parseSierraSnow),
    },
    {
      url: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
      fn: createHtmlParser('liftCounts', parseSierraLiftCounts),
    },
    {
      url: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
      fn: createHtmlParser('trailCounts', parseSierraTrailCounts),
    },
    {
      url: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
      fn: createHtmlParser('lifts', parseSierraLifts),
    },
    {
      url: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
      fn: createHtmlParser('trails', parseSierraTrails),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=50',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '50',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('US', '50')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=88',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '88',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '88')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=89',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '89',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'palisades-tahoe': [
    {
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('palisades-tahoe')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'https://mtnpowder.com/feed?resortId=61',
      fn: createJSONParser('snow', parseSquawSnow),
    },
    {
      url:
        'https://mtnpowder.com/feed?resortId=61',
      fn: createJSONParser('liftCounts', parseSquawLiftCounts),
    },
    {
      url:
        'https://mtnpowder.com/feed?resortId=61',
      fn: createJSONParser('trailCounts', parseSquawTrailCounts),
    },
    {
      url:
        'https://mtnpowder.com/feed?resortId=61',
      fn: createJSONParser('lifts', parseSquawLifts),
    },
    {
      url:
        'https://mtnpowder.com/feed?resortId=61',
      fn: createJSONParser('trails', parseSquawTrails),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=80',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '80',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('I', '80')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=28',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '28',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '28')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=89',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '89',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'alpine-meadows': [
    {
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('alpine-meadows')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url:
        'https://mtnpowder.com/feed?resortId=62',
      fn: createJSONParser('snow', parseAlpineSnow),
    },
    {
      url:
        'https://mtnpowder.com/feed?resortId=62',
      fn: createJSONParser('liftCounts', parseAlpineLiftCounts),
    },
    {
      url:
        'https://mtnpowder.com/feed?resortId=62',
      fn: createJSONParser('trailCounts', parseAlpineTrailCounts),
    },
    {
      url:
        'https://mtnpowder.com/feed?resortId=62',
      fn: createJSONParser('lifts', parseAlpineLifts),
    },
    {
      url:
        'https://mtnpowder.com/feed?resortId=62',
      fn: createJSONParser('trails', parseAlpineTrails),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=80',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '80',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('I', '80')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=28',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '28',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '28')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=89',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '89',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'diamond-peak': [
    {
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('diamond-peak')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'https://www.diamondpeak.com/mountain/conditions',
      fn: createHtmlParser('snow', parseDiamondSnow),
    },
    {
      url: 'https://www.diamondpeak.com/mountain/conditions',
      fn: createHtmlParser('liftCounts', parseDiamondLiftCounts),
    },
    {
      url: 'https://www.diamondpeak.com/mountain/conditions',
      fn: createHtmlParser('trailCounts', parseDiamondTrailCounts),
    },
    {
      url: 'https://www.diamondpeak.com/mountain/conditions',
      fn: createHtmlParser('lifts', parseDiamondLifts),
    },
    {
      url: 'https://www.diamondpeak.com/mountain/conditions',
      fn: createHtmlParser('trails', parseDiamondTrails),
    },
    {
      url: 'https://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createHtmlParser('roads', parseNVRoadCondition('NV', '28')),
    },
    {
      url: 'https://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createHtmlParser('roads', parseNVRoadCondition('NV', '431')),
    },
  ],
  heavenly: [
    {
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('heavenly')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url:
        'https://www.skiheavenly.com/the-mountain/mountain-conditions/snow-and-weather-report.aspx',
      fn: createHtmlParser('snow', parseHeavenlySnow),
      fetchConfig: {
        headers: {
          'user-agent': 'Googlebot/2.1',
        },
      },
    },
    {
      url:
        'https://www.skiheavenly.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('liftCounts', parseHeavenlyLiftCounts),
      fetchConfig: {
        headers: {
          'user-agent': 'Googlebot/2.1',
        },
      },
    },
    {
      url:
        'https://www.skiheavenly.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('trailCounts', parseHeavenlyTrailCounts),
      fetchConfig: {
        headers: {
          'user-agent': 'Googlebot/2.1',
        },
      },
    },
    {
      url:
        'https://www.skiheavenly.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('lifts', parseHeavenlyLifts),
      fetchConfig: {
        headers: {
          'user-agent': 'Googlebot/2.1',
        },
      },
    },
    {
      url:
        'https://www.skiheavenly.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('trails', parseHeavenlyTrails),
      fetchConfig: {
        headers: {
          'user-agent': 'Googlebot/2.1',
        },
      },
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=50',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '50',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('US', '50')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=89',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '89',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '89')),
    },
    {
      url: 'https://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createHtmlParser('roads', parseNVRoadCondition('NV', '207')),
    },
  ],
  kirkwood: [
    {
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('kirkwood')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'https://www.kirkwood.com/the-mountain/mountain-conditions/snow-and-weather-report.aspx',
      fn: createHtmlParser('snow', parseKirkwoodSnow),
      fetchConfig: {
        headers: {
          'user-agent': 'Googlebot/2.1',
        },
      },
    },
    {
      url: 'https://www.kirkwood.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('liftCounts', parseKirkwoodLiftCounts),
      fetchConfig: {
        headers: {
          'user-agent': 'Googlebot/2.1',
        },
      },
    },
    {
      url: 'https://www.kirkwood.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('trailCounts', parseKirkwoodTrailCounts),
      fetchConfig: {
        headers: {
          'user-agent': 'Googlebot/2.1',
        },
      },
    },
    {
      url: 'https://www.kirkwood.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('lifts', parseKirkwoodLifts),
      fetchConfig: {
        headers: {
          'user-agent': 'Googlebot/2.1',
        },
      },
    },
    {
      url: 'https://www.kirkwood.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('trails', parseKirkwoodTrails),
      fetchConfig: {
        headers: {
          'user-agent': 'Googlebot/2.1',
        },
      },
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=50',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '50',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('US', '50')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=88',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '88',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '88')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=89',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '89',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  northstar: [
    {
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('northstar')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url:
        'https://www.northstarcalifornia.com/the-mountain/mountain-conditions/snow-and-weather-report.aspx',
      fn: createHtmlParser('snow', parseNorthstarSnow),
      fetchConfig: {
        headers: {
          'user-agent': 'Googlebot/2.1',
        },
      },
    },
    {
      url:
        'https://www.northstarcalifornia.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('liftCounts', parseNorthstarLiftCounts),
      fetchConfig: {
        headers: {
          'user-agent': 'Googlebot/2.1',
        },
      },
    },
    {
      url:
        'https://www.northstarcalifornia.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('trailCounts', parseNorthstarTrailCounts),
      fetchConfig: {
        headers: {
          'user-agent': 'Googlebot/2.1',
        },
      },
    },
    {
      url:
        'https://www.northstarcalifornia.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('lifts', parseNorthstarLifts),
      fetchConfig: {
        headers: {
          'user-agent': 'Googlebot/2.1',
        },
      },
    },
    {
      url:
        'https://www.northstarcalifornia.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx',
      fn: createHtmlParser('trails', parseNorthstarTrails),
      fetchConfig: {
        headers: {
          'user-agent': 'Googlebot/2.1',
        },
      },
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=80',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '80',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('I', '80')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=267',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '267',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '267')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=28',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '28',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '28')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=89',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '89',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  homewood: [
    {
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('homewood')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'https://www.skihomewood.com/mountain/snow-report/',
      fn: createHtmlParser('snow', parseHomewoodSnow),
    },
    {
      url: 'https://www.skihomewood.com/mountain/snow-report/',
      fn: createHtmlParser('liftCounts', parseHomewoodLiftCounts),
    },
    {
      url: 'https://www.skihomewood.com/mountain/snow-report/',
      fn: createHtmlParser('trailCounts', parseHomewoodTrailCounts),
    },
    {
      url: 'https://www.skihomewood.com/mountain/snow-report/',
      fn: createHtmlParser('lifts', parseHomewoodLifts),
    },
    {
      url: 'https://www.skihomewood.com/mountain/snow-report/',
      fn: createHtmlParser('trails', parseHomewoodTrails),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=89',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '89',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'sugar-bowl': [
    {
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('sugar-bowl')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('snow', parseSugarSnow),
    },
    {
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('liftCounts', parseSugarLiftCounts),
    },
    {
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('trailCounts', parseSugarTrailCounts),
    },
    {
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('lifts', parseSugarLifts),
    },
    {
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('trails', parseSugarTrails),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=80',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '80',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('I', '80')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=89',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '89',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '89')),
    },
  ],
  'donner-ski-ranch': [
    {
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('donner-ski-ranch')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'https://www.donnerskiranch.com/snow-report/',
      fn: createHtmlParser('snow', parseDonnerSnow),
    },
    {
      url: 'https://www.donnerskiranch.com/snow-report/',
      fn: createHtmlParser('liftCounts', parseDonnerLiftCounts),
    },
    {
      url: 'https://www.donnerskiranch.com/snow-report/',
      fn: createHtmlParser('trailCounts', parseDonnerTrailCounts),
    },
    {
      url: 'https://www.donnerskiranch.com/snow-report/',
      fn: createHtmlParser('lifts', parseDonnerLifts),
    },
    {
      url: 'https://www.donnerskiranch.com/snow-report/',
      fn: createHtmlParser('trails', parseDonnerTrails),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=80',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '80',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('I', '80')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=89',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '89',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '89')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=267',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '267',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '267')),
    },
  ],
  'mt-rose': [
    {
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('mt-rose')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'https://skirose.com/snow-report/',
      fn: createHtmlParser('snow', parseMtRoseSnow),
    },
    {
      url: 'https://skirose.com/snow-report/',
      fn: createHtmlParser('liftCounts', parseMtRoseLiftCounts),
    },
    {
      url: 'https://skirose.com/snow-report/',
      fn: createHtmlParser('trailCounts', parseMtRoseTrailCounts),
    },
    {
      url: 'https://skirose.com/snow-report/',
      fn: createHtmlParser('lifts', parseMtRoseLifts),
    },
    {
      url: 'https://skirose.com/snow-report/',
      fn: createHtmlParser('trails', parseMtRoseTrails),
    },
    {
      url: 'https://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createHtmlParser('roads', parseNVRoadCondition('NV', '28')),
    },
    {
      url: 'https://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createHtmlParser('roads', parseNVRoadCondition('NV', '431')),
    },
    {
      url: 'https://nvroads.com/icx/pages/incidentlist.aspx',
      fn: createHtmlParser('roads', parseNVRoadCondition('I', '580')),
    },
  ],
  boreal: [
    {
      url: `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${getResortCoords('boreal')}`,
      fn: createJSONParser('weather', parseWeather),
    },
    {
      url: 'https://s3.us-east-2.amazonaws.com/tech4snow/feeds/9/conditions.json',
      fn: createJSONParser('snow', parseBorealSnow),
    },
    {
      url: 'https://s3.us-east-2.amazonaws.com/tech4snow/feeds/9/conditions.json',
      fn: createJSONParser('liftCounts', parseBorealLiftCounts, decodeEntities),
    },
    {
      url: 'https://s3.us-east-2.amazonaws.com/tech4snow/feeds/9/conditions.json',
      fn: createJSONParser(
        'trailCounts',
        parseBorealTrailCounts,
        decodeEntities,
      ),
    },
    {
      url:
        'https://www.rideboreal.com/api/v1/dor/status',
      fn: createJSONParser('lifts', parseBorealLifts, decodeEntities),
    },
    {
      url:
        'https://www.rideboreal.com/api/v1/dor/status',
      fn: createJSONParser('trails', parseBorealTrails, decodeEntities),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=80',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '80',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('I', '80')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=89',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '89',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '89')),
    },
    {
      url: 'https://roads.dot.ca.gov?SLOPE_NINJA_CACHE_BUST=267',
      fetchConfig: {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs({
          roadnumber: '267',
          submit: 'Search',
        }),
      },
      fn: createHtmlParser('roads', parseCARoadCondition('CA', '267')),
    },
  ],
};
