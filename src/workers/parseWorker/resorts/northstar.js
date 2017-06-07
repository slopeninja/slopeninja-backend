import cheerio from 'cheerio';

import {
  degreeOrNull,
  inchOrNull,
  statusOrNull,
  numberOrNull,
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

export const parseNorthstarWeather = async ($) => {
  const status = $('.snowConditions tr td').first().text().trim();
  // const temprature = $('.conditions-overlay .row.weather-row .large-4.columns').first().text().trim();
  //24 Hours
  const newSnow24Hr = $('.snowReportDataColumn2 .newSnow tbody td').slice(1,2).text().trim();
  //Base
  // const snowDepthBase = $('.conditions-overlay .row.weather-row .large-4.columns .weather-data').slice(1,2).text().trim();

  const snowDepthSummit = $('.snowConditions tbody tr td').slice(3,4).text().trim();
  return {
    ...initialWeather,
    status: statusOrNull(status),
    // temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    // snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const parseNorthstarLifts = async ($) => {
  const openLifts = Number.parseInt($('.gradBorderModule .terrainConditions .firstItem span').first().text());
  const totalLifts = Number.parseInt($('.gradBorderModule .terrainConditions .firstItem span').slice(1,2).text());

  return {
    ...initialLifts,
    total: numberOrNull(totalLifts),
    open: numberOrNull(openLifts),
  };
}

export const parseNorthstarTrails = async ($) => {
  const openTrails = Number.parseInt($('.gradBorderModule .terrainConditions li span').slice(2,3).text());
  const totalTrails = Number.parseInt($('.gradBorderModule .terrainConditions li span').slice(3,4).text());
  return {
    ...initialTrails,
    total: numberOrNull(totalTrails),
    open: numberOrNull(openTrails),
  };
}
