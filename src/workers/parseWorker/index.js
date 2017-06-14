import fetch from 'isomorphic-fetch';
import performanceNow from 'performance-now';

import {
  parseSierraSnow,
  parseSierraLifts,
  parseSierraTrails,
  parseSierraLiftList,
  parseSierraTrailList,
} from './resorts/sierra';
import {
  parseSquawSnow,
  parseSquawLifts,
  parseSquawTrails,
  parseSquawLiftList,
  parseSquawTrailList,
} from './resorts/squaw';
import {
  parseAlpineSnow,
  parseAlpineLifts,
  parseAlpineTrails,
  parseAlpineLiftList,
  parseAlpineTrailList,
} from './resorts/alpine';
import {
  parseDiamondSnow,
  parseDiamondLifts,
  parseDiamondTrails,
  parseDiamondLiftList,
  parseDiamondTrailList,
} from './resorts/diamond';
import {
  parseHeavenlySnow,
  parseHeavenlyLifts,
  parseHeavenlyTrails,
  parseHeavenlyLiftList,
  parseHeavenlyTrailList,
} from './resorts/heavenly';
import {
  parseKirkwoodSnow,
  parseKirkwoodLifts,
  parseKirkwoodTrails,
  parseKirkwoodLiftList,
  parseKirkwoodTrailList,
} from './resorts/kirkwood';
import {
  parseNorthstarSnow,
  parseNorthstarLifts,
  parseNorthstarTrails,
  parseNorthstarLiftList,
  parseNorthstarTrailList,
} from './resorts/northstar';
import {
  parseHomewoodSnow,
  parseHomewoodLifts,
  parseHomewoodTrails,
  parseHomewoodLiftList,
  parseHomewoodTrailList,
} from './resorts/homewood';
import { parseDonnerSnow, parseDonnerLifts, parseDonnerTrails } from './resorts/donner';
import { parseSugarSnow, parseSugarLifts, parseSugarTrails } from './resorts/sugar';
import { parseMtRoseSnow, parseMtRoseLifts, parseMtRoseTrails } from './resorts/mtRose';
import { parseBorealSnow, parseBorealLifts, parseBorealTrails } from './resorts/boreal';

import { createHtmlParser, createJSONParser } from './parserFactory';
import { parseWeather } from './parseWeather';


//FIXME: verify if heavenly/kirkwood/northstar/boreal 'BASE DEPTH' is summit or base depth
//currently using summit depth as 'BASE DEPTH'

const resortsConfig = {
  // 'sierra': [ // fnConfigs
  //   { // fnConfig
  //     url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Twin_Bridges.json',
  //     fn: createJSONParser('weather', parseWeather),
  //   },
  //   { // fnConfig
  //     url: 'https://www.sierraattahoe.com/weather-snow-report/',
  //     fn: createHtmlParser('snow', parseSierraSnow),
  //   },
  //   { // fnConfig
  //     url: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
  //     fn: createHtmlParser('lifts', parseSierraLifts),
  //   },
  //   { // fnConfig
  //     url: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
  //     fn: createHtmlParser('trails', parseSierraTrails),
  //   },
  //   { // fnConfig
  //     url: 'http://m.skiheavenly.com/desktop-grooming.html',
  //     fn: createHtmlParser('liftList', parseSierraLiftList),
  //   },
  //   { // fnConfig
  //     url: 'http://m.skiheavenly.com/desktop-grooming.html',
  //     fn: createHtmlParser('trailList', parseSierraTrailList),
  //   },
  // ],
  // 'squaw': [
  //   { // fnConfig
  //     url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Olympic_Valley.json',
  //     fn: createJSONParser('weather', parseWeather),
  //   },
  //   {
  //     url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/snow-weather-reports-lake-tahoe?resort=squaw',
  //     fn: createHtmlParser('snow', parseSquawSnow),
  //   },
  //   { // fnConfig
  //     url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
  //     fn: createHtmlParser('lifts', parseSquawLifts),
  //   },
  //   { // fnConfig
  //     url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
  //     fn: createHtmlParser('trails', parseSquawTrails),
  //   },
  //   { // fnConfig
  //     url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
  //     fn: createHtmlParser('liftList', parseSquawLiftList),
  //   },
  //   { // fnConfig
  //     url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
  //     fn: createHtmlParser('trailList', parseSquawTrailList),
  //   },
  // ],
  // 'alpine': [
  //   { // fnConfig
  //     url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Olympic_Valley.json',
  //     fn: createJSONParser('weather', parseWeather),
  //   },
  //   {
  //     url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/snow-weather-reports-lake-tahoe?resort=squaw',
  //     fn: createHtmlParser('snow', parseAlpineSnow),
  //   },
  //   { // fnConfig
  //     url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
  //     fn: createHtmlParser('lifts', parseAlpineLifts),
  //   },
  //   { // fnConfig
  //     url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
  //     fn: createHtmlParser('trails', parseAlpineTrails),
  //   },
  //   { // fnConfig
  //     url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
  //     fn: createHtmlParser('liftList', parseAlpineLiftList),
  //   },
  //   { // fnConfig
  //     url: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/lift-grooming-status',
  //     fn: createHtmlParser('trailList', parseAlpineTrailList),
  //   },
  // ],
  // 'diamond': [
  //   { // fnConfig
  //     url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/NV/Incline_Village.json',
  //     fn: createJSONParser('weather', parseWeather),
  //   },
  //   {
  //     url: 'http://www.diamondpeak.com/mountain/conditions',
  //     fn: createHtmlParser('snow', parseDiamondSnow),
  //   },
  //   { // fnConfig
  //     url: 'http://www.diamondpeak.com/mountain/conditions',
  //     fn: createHtmlParser('lifts', parseDiamondLifts),
  //   },
  //   { // fnConfig
  //     url: 'http://www.diamondpeak.com/mountain/conditions',
  //     fn: createHtmlParser('trails', parseDiamondTrails),
  //   },
  //   { // fnConfig
  //     url: 'http://www.diamondpeak.com/mountain/conditions',
  //     fn: createHtmlParser('liftList', parseDiamondLiftList),
  //   },
  //   { // fnConfig
  //     url: 'http://www.diamondpeak.com/mountain/conditions',
  //     fn: createHtmlParser('trailList', parseDiamondTrailList),
  //   },
  // ],
  // 'heavenly': [
  //   { // fnConfig
  //     url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/South_Lake_Tahoe.json',
  //     fn: createJSONParser('weather', parseWeather),
  //   },
  //   {
  //     url: 'http://www.skiheavenly.com/the-mountain/snow-report/snow-report.aspx',
  //     fn: createHtmlParser('snow', parseHeavenlySnow),
  //   },
  //   { // fnConfig
  //     url: 'http://www.skiheavenly.com/the-mountain/terrain-and-lift-status.aspx',
  //     fn: createHtmlParser('lifts', parseHeavenlyLifts),
  //   },
  //   { // fnConfig
  //     url: 'http://www.skiheavenly.com/the-mountain/terrain-and-lift-status.aspx',
  //     fn: createHtmlParser('trails', parseHeavenlyTrails),
  //   },
  //   { // fnConfig
  //     url: 'http://m.skiheavenly.com/x4/website/content_vri_grooming.php?avs=1sl&cI=9017&lat=0&lon=0&accState=1',
  //     fn: createHtmlParser('liftList', parseHeavenlyLiftList),
  //   },
  //   { // fnConfig
  //     url: 'http://m.skiheavenly.com/x4/website/content_vri_grooming.php?avs=1sl&cI=9017&lat=0&lon=0&accState=1',
  //     fn: createHtmlParser('trailList', parseHeavenlyTrailList),
  //   },
  // ],
  // 'kirkwood': [
  //   { // fnConfig
  //       url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Kirkwood.json',
  //     fn: createJSONParser('weather', parseWeather),
  //   },
  //   {
  //     url: 'http://www.kirkwood.com/mountain/snow-and-weather-report.aspx',
  //     fn: createHtmlParser('snow', parseKirkwoodSnow),
  //   },
  //   { // fnConfig
  //     url: 'http://www.kirkwood.com/mountain/terrain-status.aspx#/Lifts',
  //     fn: createHtmlParser('lifts', parseKirkwoodLifts),
  //   },
  //   { // fnConfig
  //     url: 'http://www.kirkwood.com/mountain/terrain-status.aspx#/Lifts',
  //     fn: createHtmlParser('trails', parseKirkwoodTrails),
  //   },
  //   { // fnConfig
  //     url: 'http://www.kirkwood.com/mountain/terrain-status.aspx#/Lifts',
  //     fn: createHtmlParser('liftList', parseKirkwoodLiftList),
  //   },
  //   { // fnConfig
  //     url: 'http://www.kirkwood.com/mountain/terrain-status.aspx#/Lifts',
  //     fn: createHtmlParser('trailList', parseKirkwoodTrailList),
  //   },
  // ],
  // 'northstar': [
  //   { // fnConfig
  //     url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Truckee.json',
  //     fn: createJSONParser('weather', parseWeather),
  //   },
  //   {
  //     url: 'http://www.northstarcalifornia.com/the-mountain/snow-weather-report.aspx',
  //     fn: createHtmlParser('snow', parseNorthstarSnow),
  //   },
  //   { // fnConfig
  //     url: 'http://www.northstarcalifornia.com/the-mountain/terrain-status.aspx#/Lifts',
  //     fn: createHtmlParser('lifts', parseNorthstarLifts),
  //   },
  //   { // fnConfig
  //     url: 'http://www.northstarcalifornia.com/the-mountain/terrain-status.aspx#/Lifts',
  //     fn: createHtmlParser('trails', parseNorthstarTrails),
  //   },
  //   { // fnConfig
  //     url: 'http://www.northstarcalifornia.com/the-mountain/terrain-status.aspx#/Lifts',
  //     fn: createHtmlParser('liftList', parseNorthstarLiftList),
  //   },
  //   { // fnConfig
  //     url: 'http://www.northstarcalifornia.com/the-mountain/terrain-status.aspx#/Lifts',
  //     fn: createHtmlParser('trailList', parseNorthstarTrailList),
  //   },
  // ],
  // 'homewood': [
  //   { // fnConfig
  //     url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Homewood.json',
  //     fn: createJSONParser('weather', parseWeather),
  //   },
  //   {
  //     url: 'http://www.skihomewood.com/mountain/snow-report',
  //     fn: createHtmlParser('snow', parseHomewoodSnow),
  //   },
  //   { // fnConfig
  //     url: 'http://www.skihomewood.com/mountain/snow-report',
  //     fn: createHtmlParser('lifts', parseHomewoodLifts),
  //   },
  //   { // fnConfig
  //     url: 'http://www.skihomewood.com/mountain/snow-report',
  //     fn: createHtmlParser('trails', parseHomewoodTrails),
  //   },
  //   { // fnConfig
  //     url: 'http://www.skihomewood.com/mountain/snow-report',
  //     fn: createHtmlParser('liftList', parseHomewoodLiftList),
  //   },
  //   { // fnConfig
  //     url: 'http://www.skihomewood.com/mountain/snow-report',
  //     fn: createHtmlParser('trailList', parseHomewoodTrailList),
  //   },
  // ],
  // 'sugar': [ // fnConfigs
  //   { // fnConfig
  //     url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Truckee.json',
  //     fn: createJSONParser('weather', parseWeather),
  //   },
  //   { // fnConfig
  //     url: 'http://www.sugarbowl.com/conditions',
  //     fn: createHtmlParser('snow', parseSugarSnow),
  //   },
  //   { // fnConfig
  //     url: 'http://www.sugarbowl.com/conditions',
  //     fn: createHtmlParser('lifts', parseSugarLifts),
  //   },
  //   { // fnConfig
  //     url: 'http://www.sugarbowl.com/conditions',
  //     fn: createHtmlParser('trails', parseSugarTrails),
  //   }
  // ],
  // 'donner': [ // fnConfigs
  //   { // fnConfig
  //     url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Truckee.json',
  //     fn: createJSONParser('weather', parseWeather),
  //   },
  //   { // fnConfig
  //     url: 'https://www.donnerskiranch.com/snow-report/',
  //     fn: createHtmlParser('snow', parseDonnerSnow),
  //   },
  //   { // fnConfig
  //     url: 'https://www.donnerskiranch.com/snow-report/',
  //     fn: createHtmlParser('lifts', parseDonnerLifts),
  //   },
  //   { // fnConfig
  //     url: 'https://www.donnerskiranch.com/snow-report/',
  //     fn: createHtmlParser('trails', parseDonnerTrails),
  //   }
  // ],
  // 'mtRose': [ // fnConfigs
  //   { // fnConfig
  //     url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/NV/Reno.json',
  //     fn: createJSONParser('weather', parseWeather),
  //   },
  //   { // fnConfig
  //     url: 'http://skirose.com/the-mountain/snow-report/',
  //     fn: createHtmlParser('snow', parseMtRoseSnow),
  //   },
  //   { // fnConfig
  //     url: 'http://skirose.com/the-mountain/snow-report/',
  //     fn: createHtmlParser('lifts', parseMtRoseLifts),
  //   },
  //   { // fnConfig
  //     url: 'http://skirose.com/the-mountain/snow-report/',
  //     fn: createHtmlParser('trails', parseMtRoseTrails),
  //   }
  // ],
  // 'boreal': [ // fnConfigs
  //   { // fnConfig
  //     url: 'http://api.wunderground.com/api/555b4e1b8a4d6734/conditions/q/CA/Truckee.json',
  //     fn: createJSONParser('weather', parseWeather),
  //   },
  //   { // fnConfig
  //     url: 'http://api.rideboreal.com/api/v2?location=/&level=0',
  //     fn: createJSONParser('snow', parseBorealSnow),
  //   },
  //   { // fnConfig
  //     url: 'http://api.rideboreal.com/api/v2?location=/&level=0',
  //     fn: createJSONParser('lifts', parseBorealLifts),
  //   },
  //   { // fnConfig
  //     url: 'http://api.rideboreal.com/api/v2?location=/&level=0',
  //     fn: createJSONParser('trails', parseBorealTrails),
  //   }
  // ],
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
  for(let i = 0; i < fnConfigs.length; i++) {
    const fnConfig = fnConfigs[i];

    const text = await lookUpOrFetch(fnConfig.url);

    const parser = fnConfig.fn;

    const result = await parser(text);

    arrayOfResults.push(result);
  }

  // flatten the array
  const resortData = arrayOfResults.reduce((acc, result) => {
    return {
      ...acc,
      ...result,
    };
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
