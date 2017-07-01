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

const initialSnow = {
  status: null,
  weatherIcon: null,
  temperature: null,
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

export const parseHeavenlySnow = async ($) => {
  const status = $('.snowConditions tr td').first().text().trim();
  // const temperature = $('.conditions-overlay .row.weather-row .large-4.columns').first().text().trim();
  //24 Hours
  const newSnow24Hr = $('.snowReportDataColumn2 .newSnow tbody td').slice(1,2).text().trim();
  //Base
  // const snowDepthBase = $('.conditions-overlay .row.weather-row .large-4.columns .weather-data').slice(1,2).text().trim();

  const snowDepthSummit = $('.snowConditions tbody tr td').slice(3,4).text().trim();
  return {
    ...initialSnow,
    status: resortStatusOrNull(status),
    // temperature: degreeOrNull(temperature),
    newSnow: inchOrNull(newSnow24Hr),
    // snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const parseHeavenlyLiftCounts = async ($) => {
  return {
    ...initialLifts,
  };
}

export const parseHeavenlyTrailCounts = async ($) => {
  return {
    ...initialTrails,
  };
}

export const parseHeavenlyLifts = async ($) => {
  const list = [];
  $('.liftContainer').map((index, rowElement) => {
    const liftType = $(rowElement).find('span').text();
    const statusImg = $(rowElement).find('img');

    const name = notEmptyStringOrNull($(rowElement).text().replace(liftType, ''));
    const status = liftTrailStatusOrNull($(statusImg).attr('src'));
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

export const parseHeavenlyTrails = async ($) => {
  const list = [];

  $('.groomingAreaRunContainer .runContainer').map((index, rowElement) => {
    const columnElements = $(rowElement).find('div');
    const statusElements = $(columnElements[2]).find('img');
    const categoryElements = $(columnElements[0]).find('img');

    const parentElement = rowElement.parent;
    const categoryElement = $(parentElement).prev();

    const name = notEmptyStringOrNull($(rowElement).text());
    const status = liftTrailStatusOrNull($(statusElements).attr('src'));
    const level = trailLevelOrNull($(categoryElements).attr('src'));
    const category = notEmptyStringOrNull($(categoryElement).text().trim());

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
