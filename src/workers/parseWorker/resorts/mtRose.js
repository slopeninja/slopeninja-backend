import cheerio from 'cheerio';

import {
  degreeOrNull,
  inchOrNull,
  resortStatusOrNull,
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

export const parseMtRoseSnow = async ($) => {
  const weatherIcon = $('.sr-current-cond .sr-cc-wrapper .sr-text').first().text().trim();
  const status = $('.sr-mountain-notes.sr-row .sr-text p').first().text().trim();
  const temprature = $('.sr-current-cond.sr-row.row .col-sm-6 .sr-cc-wrapper.row .sr-temp h1').text().trim();
  //24 Hours
  const newSnow24Hr = $('.sr-snow-totals.sr-row.row .sr-snow-total h2').first().text().trim();
  //Base
  // const snowDepthBase = $('.conditions-overlay .row.weather-row .large-4.columns .weather-data').slice(1,2).text().trim();
  // const snowDepthSummit = $('.snowConditions tbody tr td').slice(3,4).text().trim();
  return {
    ...initialWeather,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    status: resortStatusOrNull(status),
    temprature: degreeOrNull(temprature),
    newSnow: numberOrNull(Number.parseInt(newSnow24Hr)),
    // snowDepthBase: inchOrNull(snowDepthBase),
    // snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const parseMtRoseLifts = async ($) => {
  return {
    ...initialLifts,
  };
}

export const parseMtRoseTrails = async ($) => {
  return {
    ...initialTrails,
  };
}
