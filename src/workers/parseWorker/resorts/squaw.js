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

export const parseSquawWeather = async ($) => {
  const weatherIcon = $('#squaw-elevation-0 .row.current .cellwrapper .cell h6').first().text().trim();
  const temprature = $('#squaw-elevation-0 .row.current .cellwrapper .cell .value').first().text().trim();
  //24
  const newSnow24Hr = $('.row.snow .cellwrapper .cell .value').slice(1,2).text().trim();
  // //Base
  const snowDepthBase = $('#squaw-elevation-2 .row.snow .cellwrapper .cell .value').slice(3,4).text().trim();
  const snowDepthSummit = $('#squaw-elevation-1 .row.snow .cellwrapper .cell .value').slice(3,4).text().trim();

  return {
    ...initialWeather,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),

  };
}

export const parseSquawLifts = async ($) => {
  const open = numberOrNull(Number.parseInt($('#squaw-report .global-stats .cell.open-lifts .value').text().trim()));
  return {
    ...initialLifts,
    open: numberOrNull(open),
  };
}

export const parseSquawTrails = async ($) => {
  const open = numberOrNull(Number.parseInt($('#squaw-report .global-stats .cell.open-trails .value').text().trim()));
  return {
    ...initialTrails,
    open: numberOrNull(open),
  };
}
