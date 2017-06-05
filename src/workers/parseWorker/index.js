import fetch from 'isomorphic-fetch';
import { fetchSierra } from './resorts/sierra';
import { fetchSquaw } from './resorts/squaw';
import { fetchDiamond } from './resorts/diamond';
import { fetchHeavenly } from './resorts/heavenly';
import { fetchKirkwood } from './resorts/kirkwood';
import { fetchNorthstar } from './resorts/northstar';



//FIXME: verify if heavenly/kirkwood/northstar BASE DEPTH is summit or bade depth

const resortsConfig = {
  'sierra': {
    weatherUrl: 'https://www.sierraattahoe.com/weather-snow-report/',
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
    fn: fecthNorthstar,
  }
  'boreal': {
    weatherUrl: '',
    fn: fecthBoreal,
  },
  'homewood': {
    weatherUrl: 'http://www.skihomewood.com/mountain/snow-report',
    fn: fecthHomewood,
  },
  'sugar': {
    weatherUrl: 'http://www.sugarbowl.com/conditions',
    fn: fecthSugar,
  },
  'donner': {
    weatherUrl: '',
    fn: fecthDonner,
  }
  'mtRose': {
    weatherUrl: 'http://skirose.com/the-mountain/snow-report/',
    fn: fecthMtRose,
  }

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
