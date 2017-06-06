import fetch from 'isomorphic-fetch';
import { fetchSierra } from './resorts/sierra';
import { fetchSquaw } from './resorts/squaw';
import { fetchDiamond } from './resorts/diamond';
import { fetchHeavenly } from './resorts/heavenly';
import { fetchKirkwood } from './resorts/kirkwood';
import { fetchNorthstar } from './resorts/northstar';
import { fetchHomewood } from './resorts/homewood';
import { fetchBoreal } from './resorts/boreal';
import { fetchDonner } from './resorts/donner';
import { fetchSugar } from './resorts/sugar';
import { fetchMtRose } from './resorts/mtRose';


//FIXME: verify if heavenly/kirkwood/northstar/boreal 'BASE DEPTH' is summit or base depth
//currently using summit depth as 'BASE DEPTH'

const resortsConfig = {
  'sierra': {
    weatherUrl: 'https://www.sierraattahoe.com/weather-snow-report/',
    liftsUrl: 'https://www.sierraattahoe.com/lifts-trails-grooming/',
    fn: fetchSierra,
  },
  'squaw': {
    weatherUrl: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/snow-weather-reports-lake-tahoe?resort=squaw',
    fn: fetchSquaw,
  },
  'diamond': {
    weatherUrl: 'http://www.diamondpeak.com/mountain/conditions',
    fn: fetchDiamond,
  },
  'heavenly': {
    weatherUrl: 'http://www.skiheavenly.com/the-mountain/snow-report/snow-report.aspx',
    fn: fetchHeavenly,
  },
  'kirkwood': {
    weatherUrl: 'http://www.kirkwood.com/mountain/snow-and-weather-report.aspx',
    fn: fetchKirkwood,
  },
  'northstar': {
    weatherUrl: 'http://www.northstarcalifornia.com/the-mountain/snow-weather-report.aspx',
    fn: fetchNorthstar,
  },

  'homewood': {
    weatherUrl: 'http://www.skihomewood.com/mountain/snow-report',
    fn: fetchHomewood,
  },
  'sugar': {
    weatherUrl: 'http://www.sugarbowl.com/conditions',
    fn: fetchSugar,
  },
  'donner': {
    weatherUrl: 'https://www.donnerskiranch.com/snow-report/',
    fn: fetchDonner,
  },
  'mtRose': {
    weatherUrl: 'http://skirose.com/the-mountain/snow-report/',
    fn: fetchMtRose,
  },
  'boreal': {
    weatherUrl: 'http://api.rideboreal.com/api/v2?location=/&level=0',
    fn: fetchBoreal,
  },
};

const fetchResorts = async () => {
  const resorts = Object.keys(resortsConfig);

  const arrayOfPromises = resorts.map(async resortName => {
    const config = resortsConfig[resortName];

    const response = await fetch(config.weatherUrl);
    const text = await response.text();

    const fetchFunction = config.fn;

    const resortData = await fetchFunction(text);
    return {
      [resortName]: resortData,
    };
  });

  const arrayOfResortData = await Promise.all(arrayOfPromises);
  return arrayOfResortData;
}

const run = async () => {
  console.log('Worker starts');

  const resortsData = await fetchResorts();

  console.log(JSON.stringify(resortsData, null, 2));
  console.log('Worker quits');
}

run();
