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

const parseKirkwoodWeather = async ($) => {
  const status = $('.snowConditions tr td').first().text().trim();

  // const temprature = $('.conditions-overlay .row.weather-row .large-4.columns').first().text().trim();
  //24 Hours
  const newSnow24Hr = $('.snowReportDataColumn2 .newSnow tbody td').slice(1,2).text().trim();
  //Base
  // const snowDepthBase = $('.conditions-overlay .row.weather-row .large-4.columns .weather-data').slice(1,2).text().trim();

  //FIXME: verify if heavenly BASE DEPTH is summit or bade depth
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

export const fetchKirkwood = async (html) => {
  const $ = cheerio.load(html)

  const weather = await parseKirkwoodWeather($);

  return {
    weather,
  };
}
