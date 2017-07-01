import cheerio from 'cheerio';

import {
  degreeOrNull,
  inchOrNull,
  numberOrNull,
  weatherStatusOrNull,
  liftTrailStatusOrNull,
  notEmptyStringOrNull,
  trailLevelOrNull,
} from '../weatherUtil';

const initialWeather = {
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

export const parseDonnerSnow = async ($) => {
  // const temperature =
  //24 Hours
  // const newSnow24Hr =
  //Base
  // const snowDepthBase =
  // const snowDepthSummit =
  return {
    ...initialWeather,
    // temperature: degreeOrNull(temperature),
    // newSnow: inchOrNull(newSnow24Hr),
    // snowDepthBase: inchOrNull(snowDepthBase),
    // snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const parseDonnerLiftCounts = async ($) => {
  return {
    ...initialLifts,
  };
}

export const parseDonnerTrailCounts = async ($) => {
  return {
    ...initialTrails,
  };
}

export const parseDonnerLifts = async ($) => {
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

export const parseDonnerTrails = async ($) => {
  const list = [];

 return list;
}
