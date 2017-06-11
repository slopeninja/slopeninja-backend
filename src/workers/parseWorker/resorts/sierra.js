import cheerio from 'cheerio';

import {
  degreeOrNull,
  inchOrNull,
  numberOrNull,
  weatherStatusOrNull,
  liftTrailStatusOrNull,
  notEmptyStringOrNull,
  trailLevelOrNull,
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
  const liftListsCount = $('.lifts-list table tbody tr').length;

  return {
    ...initialLifts,
    total: numberOrNull(totalLifts),
    open: numberOrNull(openLifts),
  }
}

export const parseSierraTrails = async ($) => {
  const openTrails = Number.parseInt($('.lift-trail-stats .lift-trail-stat .value1').slice(1,2).text());
  const totalTrails = Number.parseInt($('.lift-trail-stats .lift-trail-stat .value2').slice(1,2).text().replace('/', ''));
  return {
    ...initialTrails,
    total: numberOrNull(totalTrails),
    open: numberOrNull(openTrails),
  }
}

export const parseSierraLiftList = async ($) => {
  const list = [];

  $('.lifts-list tbody > tr').map((index, rowElement) => {
    const tdElements = $(rowElement).find('td');

    const tdElementName = tdElements[1];
    const tdElementStatus = tdElements[2];

    const tableElement = tdElementName.parent.parent.parent;
    const thElementCategory = $(tableElement).find('thead > tr > th').get(1);

    const name = notEmptyStringOrNull($(tdElementName).text().trim());
    const status = liftTrailStatusOrNull($(tdElementStatus).text().trim());
    const category = notEmptyStringOrNull($(thElementCategory).text().trim());

    const lift = {
      name,
      status,
      category,
    };

    list.push(lift)
  });

 return list;
}

export const parseSierraTrailList = async ($) => {
  const list = [];

  $('.trails-list tbody > tr').map((index, rowElement) => {
    const tdElements = $(rowElement).find('td');

    const tdElementName = tdElements[1];
    const tdElementStatus = tdElements[2];
    const tdElementAccess = tdElements[4];

    const tableElement = tdElementName.parent.parent.parent;
    const thElementCategory = $(tableElement).find('thead > tr > th').get(1);

    const name = notEmptyStringOrNull($(tdElementName).text().trim());
    const status = liftTrailStatusOrNull($(tdElementStatus).text().trim());
    const level = trailLevelOrNull($(thElementCategory).text().trim());
    const category = notEmptyStringOrNull($(tdElementAccess).text().trim());

    const trail = {
      name,
      status,
      category,
      level,
    };

    list.push(trail)
  });

 return list;
}
