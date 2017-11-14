import cheerio from 'cheerio';

import {
  degreeOrNull,
  inchOrNull,
  numberOrNull,
  weatherStatusOrNull,
  liftTrailStatusOrNull,
  notEmptyStringOrNull,
  trailLevelOrNull,
  resortStatusOrNull,
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

export const parseMtRoseSnow = async ($) => {
  const weatherIcon = $('.sr-current-cond .sr-cc-wrapper .sr-text').first().text().trim();
  const status = $('.sr-mountain-notes.sr-row .sr-text p').first().text().trim();
  const temperature = $('.sr-current-cond.sr-row.row .col-sm-6 .sr-cc-wrapper.row .sr-temp h1').text().trim();
  //24 Hours
  const newSnow24Hr = $('.sr-snow-totals.sr-row.row .sr-snow-total h2').first().text().trim();
  //Base
  const snowDepthBase = $('.sr-snow-totals.sr-row.row .sr-snow-total h2').slice(2,3).text().trim();
  const snowDepthSummit = $('.sr-snow-totals.sr-row.row .sr-snow-total h2').slice(2,3).text().slice(3).trim();
  return {
    ...initialSnow,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    status: resortStatusOrNull(status),
    temperature: degreeOrNull(temperature),
    newSnow: numberOrNull(Number.parseInt(newSnow24Hr)),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const parseMtRoseLiftCounts = async ($) => {
  return {
    ...initialLifts,
  };
}

export const parseMtRoseTrailCounts = async ($) => {
  return {
    ...initialTrails,
  };
}

export const parseMtRoseLifts = async ($) => {
  const list = [];

  $('.sr-lifts-wrapper .sr-ski-lift-wrapper').map((index, rowElement) => {
    const nameText = $(rowElement).find('.sr-lift-name').text().trim();
    const statusText = $(rowElement).find('.sr-lift-status').text().trim();
    //
    const name = notEmptyStringOrNull(nameText);
    const status = liftTrailStatusOrNull(statusText);
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

export const parseMtRoseTrails = async ($) => {
  const list = [];

 return list;
}
