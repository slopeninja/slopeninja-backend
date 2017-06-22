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

export const parseDonnerLiftList = async ($) => {
  const list = [];

  $('.sqs-block-content p').slice(4, 12).map((index, rowElement) => {
    const rowText = $(rowElement).text().trim();
    const nameText = rowText.split(':')[0];
    const statusText = rowText.split(':')[1];

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

export const parseDonnerTrailList = async ($) => {
  const list = [];

 return list;
}
