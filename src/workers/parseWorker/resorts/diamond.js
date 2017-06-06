import cheerio from 'cheerio';

import {
  degreeOrNull,
  inchOrNull,
  statusOrNull,
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

const parseSeirraWeather = async ($) => {
  const status = $('.surface-conditions p').first().text().trim();
  const temprature = $('.conditions-overlay .row.weather-row .large-4.columns').first().text().trim();
  //24 Hours
  const newSnow24Hr = $('.conditions-overlay .row.weather-row .large-4.columns .weather-data').slice(3,4).text().trim();
  //Base
  const snowDepthBase = $('.conditions-overlay .row.weather-row .large-4.columns .weather-data').slice(1,2).text().trim();
  const snowDepthSummit = $('.conditions-overlay .row.weather-row .peak-depth.large-4.columns .weather-data').first().text().trim();
  return {
    ...initialWeather,
    status: statusOrNull(status),
    temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const fetchDiamond = async (html) => {
  const $ = cheerio.load(html)

  const weather = await parseSeirraWeather($);

  return {
    weather,
  };
}
