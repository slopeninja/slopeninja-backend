import cheerio from 'cheerio';
import {
  degreeOrNull,
  inchOrNull,
  numberOrNull,
  weatherStatusOrNull,
} from '../util';

const initialSnow = {
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

export const parseAlpineSnow = async ($) => {
  const weatherIcon = $('#alpine-report .row.current .cellwrapper .cell h6').first().text().trim();
  const temprature = $('#alpine-report .row.current .cellwrapper .cell .value').first().text().trim();
  //24
  const newSnow24Hr = $('.row.snow .cellwrapper .cell .value').slice(1,2).text().trim();
  // //Base
  const snowDepthBase = $('#alpine-elevation-2 .row.snow .cellwrapper .cell .value').slice(3,4).text().trim();
  const snowDepthSummit = $('#alpine-elevation-1 .row.snow .cellwrapper .cell .value').slice(3,4).text().trim();

  return {
    ...initialSnow,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),

  };
}

export const parseAlpineLifts = async ($) => {
  const open = numberOrNull(Number.parseInt($('#alpine-report .global-stats .cell.open-lifts .value').text().trim()));
  return {
    ...initialLifts,
    open: numberOrNull(open),
  };
}

export const parseAlpineTrails = async ($) => {
  const open = numberOrNull(Number.parseInt($('#alpine-report .global-stats .cell.open-trails .value').text().trim()));
  return {
    ...initialTrails,
    open: numberOrNull(open),
  };
}
