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
// const initialLifts = {
//   total: null,
//   open: null,
// };
// const initialTrails = {
//   total: null,
//   open: null,
// };

const parseSierraWeather = async ($) => {
  const temprature = $('.weather-block .value').first().text().trim();
  //24 Hours
  const newSnow24Hr = $('.weather-block.weather-block-special .value').first().text().trim();
  //Base
  const snowDepthBase = $('.weather-block.weather-block-small.table-column .value').last().text().trim();
  const snowDepthSummit = $('.weather-block.weather-block-small.table-column .value').slice( 8,9 ).text().trim();
  return {
    ...initialWeather,
    temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}
// const parseSierraLifts = async ($) => {
//   const openLifts = $('.lift-trail-stats .lift-trail-stat .value1').first().text();
//   console.warn(openLifts)
//   const totalLifts = $('.lift-trail-stats .lift-trail-stat .value2').first().text().trim();
//   return {
//     ...initialLifts,
//     total: Number.parseInt(openLifts),
//     open: Number.parseInt(totalLifts),
//   }
// }

export const fetchSierra = async (html) => {
  const $ = cheerio.load(html)

  const weather = await parseSierraWeather($);
  // const lifts = await parseSierraLifts($);

  return {
    weather,
    // lifts
  };
}
