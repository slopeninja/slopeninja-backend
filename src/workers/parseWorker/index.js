import fetch from 'isomorphic-fetch';

import { parseSierraWeather, parseSierraLifts } from './resorts/sierra';
import { fetchSquaw } from './resorts/squaw';
import { fetchDiamond } from './resorts/diamond';
import { fetchHeavenly } from './resorts/heavenly';
import { fetchKirkwood } from './resorts/kirkwood';
import { fetchNorthstar } from './resorts/northstar';
import { fetchHomewood } from './resorts/homewood';
import { fetchBoreal } from './resorts/boreal';
import { fetchDonner } from './resorts/donner';
import { parseSugarWeather, parseSugarLifts } from './resorts/sugar';
import { fetchMtRose } from './resorts/mtRose';

import { createHtmlParser, createJSONParser } from './parserFactory';

//FIXME: verify if heavenly/kirkwood/northstar/boreal 'BASE DEPTH' is summit or base depth
//currently using summit depth as 'BASE DEPTH'

const resortsConfig = {
  'sierra': [ // fnConfigs
    { // fnConfig
      url: 'https://www.sierraattahoe.com/weather-snow-report/',
      fn: createHtmlParser('weather', parseSierraWeather),
    },
    { // fnConfig
      url: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
      fn: createHtmlParser('lifts', parseSierraLifts),
    }
  ],
  // 'squaw': {
  //   weatherUrl: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/snow-weather-reports-lake-tahoe?resort=squaw',
  //   fn: fetchSquaw,
  // },
  // 'diamond': {
  //   weatherUrl: 'http://www.diamondpeak.com/mountain/conditions',
  //   fn: fetchDiamond,
  // },
  // 'heavenly': {
  //   weatherUrl: 'http://www.skiheavenly.com/the-mountain/snow-report/snow-report.aspx',
  //   fn: fetchHeavenly,
  // },
  // 'kirkwood': {
  //   weatherUrl: 'http://www.kirkwood.com/mountain/snow-and-weather-report.aspx',
  //   fn: fetchKirkwood,
  // },
  // 'northstar': {
  //   weatherUrl: 'http://www.northstarcalifornia.com/the-mountain/snow-weather-report.aspx',
  //   fn: fetchNorthstar,
  // },
  //
  // 'homewood': {
  //   weatherUrl: 'http://www.skihomewood.com/mountain/snow-report',
  //   fn: fetchHomewood,
  // },
  'sugar': [ // fnConfigs
    { // fnConfig
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('weather', parseSugarWeather),
    },
    { // fnConfig
      url: 'http://www.sugarbowl.com/conditions',
      fn: createHtmlParser('lifts', parseSugarLifts),
    }
  ],
  // 'donner': {
  //   weatherUrl: 'https://www.donnerskiranch.com/snow-report/',
  //   fn: fetchDonner,
  // },
  // 'mtRose': {
  //   weatherUrl: 'http://skirose.com/the-mountain/snow-report/',
  //   fn: fetchMtRose,
  // },
  // 'boreal': {
  //   weatherUrl: 'http://api.rideboreal.com/api/v2?location=/&level=0',
  //   fn: fetchBoreal,
  // },
};

const fetchResort = async (resortName) => {
  const fnConfigs = resortsConfig[resortName];

  const arrayOfResultPromises = fnConfigs.map(async fnConfig => {

    const response = await fetch(fnConfig.url);
    const text = await response.text();

    const fetchFunction = fnConfig.fn;

    const result = await fetchFunction(text);

    return result;
  })

  const arrayOfResults = await Promise.all(arrayOfResultPromises);

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

const run = async () => {
  console.log('Worker starts');

  const resortsData = await fetchResorts();

  console.log(JSON.stringify(resortsData, null, 2));
  console.log('Worker quits');
}

run();
