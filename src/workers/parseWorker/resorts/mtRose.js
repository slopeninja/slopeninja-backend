import cheerio from 'cheerio';

import {
  degreeOrNull,
  inchOrNull,
} from '../util';

const initialWeather = {
  status: null,
  weatherIcon: null,
  temprature: null,
  baseCondition: null,
  newSnow: null,
  snowDepthBase: null,
  snowDepthSummit: null,

};

const parseMtRoseWeather = async ($) => {
  const temprature = $('.sr-current-cond.sr-row.row .col-sm-6 .sr-cc-wrapper.row .sr-temp h1').text().trim();
  //24 Hours
  const newSnow24Hr = $('.sr-snow-totals.sr-row.row .sr-snow-total h2').first().text().trim() + '"';
  //Base
  // const snowDepthBase = $('.conditions-overlay .row.weather-row .large-4.columns .weather-data').slice(1,2).text().trim();
  // const snowDepthSummit = $('.snowConditions tbody tr td').slice(3,4).text().trim();
  return {
    ...initialWeather,
    temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    // snowDepthBase: inchOrNull(snowDepthBase),
    // snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const fetchMtRose = async (html) => {
  const $ = cheerio.load(html)

  const weather = await parseMtRoseWeather($);

  return {
    weather,
  };
}
