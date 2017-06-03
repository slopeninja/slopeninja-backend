import fetch from 'isomorphic-fetch';
import { fetchSierra } from './resorts/sierra';
import { fetchSquaw } from './resorts/squaw';


const resortsConfig = {
  'sierra': {
    weatherUrl: 'https://www.sierraattahoe.com/weather-snow-report/',
    fn: fetchSierra,
  },
  'squaw': {
    weatherUrl: 'http://squawalpine.com/skiing-riding/weather-conditions-webcams/snow-weather-reports-lake-tahoe?resort=squaw',
    fn: fetchSquaw,
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
