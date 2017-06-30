import cheerio from 'cheerio';

import {
  degreeOrNull,
  inchOrNull,
  resortStatusOrNull,
  weatherStatusOrNull,
  liftTrailStatusOrNull,
  notEmptyStringOrNull,
  trailLevelOrNull,
} from '../weatherUtil';

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

export const parseDiamondLiftList = async ($) => {
  const list = [];

  $('.lift-trail-conditions .lift-header').map((index, rowElement) => {
    const h1Elements = $(rowElement).find('h1');
    const spanElements = $(rowElement).find('span');

    const name = notEmptyStringOrNull($(h1Elements).text().trim());
    const status = liftTrailStatusOrNull($(spanElements).text().trim());
    const category = null;

    const lift = {
      name,
      status,
      category,
    };

    list.push(lift)
  });

 return list;
}

export const parseDiamondTrailList = async ($) => {
  const list = [];

  $('.trail').map((index, rowElement) => {
    const spanElements = $(rowElement).find('span');

    const spanElementName = spanElements[1];
    const spanElementStatus = spanElements[2];
    const spanElementLevel = spanElements[0];

    const parentElement = rowElement.parent.parent.parent;
    const h1ElementCategory = $(parentElement).prev().find('.lift-header').find('h1');

    const name = notEmptyStringOrNull($(spanElementName).text().trim());
    const status = liftTrailStatusOrNull($(spanElementStatus).text().trim());
    const level = trailLevelOrNull($(spanElementLevel).attr('class'));
    const category = notEmptyStringOrNull($(h1ElementCategory).text().trim());

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
