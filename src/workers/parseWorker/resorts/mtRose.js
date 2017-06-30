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

export const parseMtRoseSnow = async ($) => {
  const weatherIcon = $('.sr-current-cond .sr-cc-wrapper .sr-text').first().text().trim();
  const status = $('.sr-mountain-notes.sr-row .sr-text p').first().text().trim();
  const temprature = $('.sr-current-cond.sr-row.row .col-sm-6 .sr-cc-wrapper.row .sr-temp h1').text().trim();
  //24 Hours
  const newSnow24Hr = $('.sr-snow-totals.sr-row.row .sr-snow-total h2').first().text().trim();
  //Base
  // const snowDepthBase = $('.conditions-overlay .row.weather-row .large-4.columns .weather-data').slice(1,2).text().trim();
  // const snowDepthSummit = $('.snowConditions tbody tr td').slice(3,4).text().trim();
  return {
    ...initialSnow,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    status: resortStatusOrNull(status),
    temprature: degreeOrNull(temprature),
    newSnow: numberOrNull(Number.parseInt(newSnow24Hr)),
    // snowDepthBase: inchOrNull(snowDepthBase),
    // snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const parseMtRoseLifts = async ($) => {
  return {
    ...initialLifts,
  };
}

export const parseMtRoseTrails = async ($) => {
  return {
    ...initialTrails,
  };
}

export const parseMtRoseLiftList = async ($) => {
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

export const parseMtRoseTrailList = async ($) => {
  const list = [];

 return list;
}
