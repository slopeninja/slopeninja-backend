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

const initialLifts = {
  total: null,
  open: null,
};

const initialTrails = {
  total: null,
  open: null,
};

export const parseDonnerSnow = async ($) => {
  // const temprature =
  //24 Hours
  // const newSnow24Hr =
  //Base
  // const snowDepthBase =
  // const snowDepthSummit =
  return {
    ...initialWeather,
    // temprature: degreeOrNull(temprature),
    // newSnow: inchOrNull(newSnow24Hr),
    // snowDepthBase: inchOrNull(snowDepthBase),
    // snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const parseDonnerLifts = async ($) => {
  return {
    ...initialLifts,
  };
}

export const parseDonnerTrails = async ($) => {
  return {
    ...initialTrails,
  };
}
