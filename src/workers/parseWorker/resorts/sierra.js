import fetch from 'isomorphic-fetch';
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
  snowDepth: null,
  snowDepth: null,
};

const WEATHER_URL = 'https://www.sierraattahoe.com/weather-snow-report/';

const parseSeirraWeather = async ($) => {
  const temprature = $('.weather-block .value').first().text().trim();
  const base24Hour = $('.weather-block.weather-block-special .value').first().text().trim();

  return {
    ...initialWeather,
    temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(base24Hour),
  };
}

const parseSeirraLifts = async ($) => {
  return {
  };
}

export const fetchSierra = async () => {
  const response = await fetch(WEATHER_URL);
  const text = await response.text();

  const $ = cheerio.load(text)

  const weather = await parseSeirraWeather($);
  const lifts = await parseSeirraLifts($);

  return {
    weather,
    lifts
  };
}
