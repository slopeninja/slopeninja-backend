import cheerio from 'cheerio';

import {
  degreeOrNull,
  inchOrNull,
  numberOrNull,
  weatherStatusOrNull,
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

const initialLifts = {
  total: null,
  open: null,
};

const initialTrails = {
  total: null,
  open: null,
};

// const initialTrails = {
//   total: null,
//   open: null,
// };

export const parseSierraSnow = async ($) => {
  const weatherIcon = $('.weather-stat-wrapper .weather-stat p').first().text().trim();
  const temprature = $('.weather-block .value').first().text().trim();
  //24 Hours
  const newSnow24Hr = $('.weather-block.weather-block-special .value').first().text().trim();
  //Base
  const snowDepthBase = $('.weather-block.weather-block-small.table-column .value').last().text().trim();
  const snowDepthSummit = $('.weather-block.weather-block-small.table-column .value').slice( 8,9 ).text().trim();
  return {
    ...initialWeather,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const parseSierraLifts = async ($) => {
  const openLifts = Number.parseInt($('.lift-trail-stats .lift-trail-stat .value1').first().text());
  const totalLifts = Number.parseInt($('.lift-trail-stats .lift-trail-stat .value2').first().text().replace('/', ''));
  return {
    ...initialLifts,
    total: numberOrNull(totalLifts),
    open: numberOrNull(openLifts),
  }
}

export const parseSierraTrails = async ($) => {
  const openLifts = Number.parseInt($('.lift-trail-stats .lift-trail-stat .value1').slice(1,2).text());
  const totalLifts = Number.parseInt($('.lift-trail-stats .lift-trail-stat .value2').slice(1,2).text().replace('/', ''));
  return {
    ...initialLifts,
    total: numberOrNull(totalLifts),
    open: numberOrNull(openLifts),
  }
}
