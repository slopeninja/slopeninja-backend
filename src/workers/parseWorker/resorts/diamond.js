import cheerio from 'cheerio';

import {
  degreeOrNull,
  inchOrNull,
  resortStatusOrNull,
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

export const parseDiamondSnow = async ($) => {
  const status = $('.surface-conditions p').first().text().trim();
  const weatherIcon = $('.weather-condition .weather-condition-wrapper .weather-forecast').first().text().trim();
  const temprature = $('.conditions-overlay .row.weather-row .large-4.columns').first().text().trim();
  //24 Hours
  const newSnow24Hr = $('.conditions-overlay .row.weather-row .large-4.columns .weather-data').slice(3,4).text().trim();
  //Base
  const snowDepthBase = $('.conditions-overlay .row.weather-row .large-4.columns .weather-data').slice(1,2).text().trim();
  const snowDepthSummit = $('.conditions-overlay .row.weather-row .peak-depth.large-4.columns .weather-data').first().text().trim();
  return {
    ...initialWeather,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    status: resortStatusOrNull(status),
    temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const parseDiamondLifts = async ($) => {
  return {
    ...initialLifts,
  };
}

export const parseDiamondTrails = async ($) => {
  return {
    ...initialTrails,
  };
}
