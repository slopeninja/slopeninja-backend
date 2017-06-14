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

export const parseHomewoodSnow = async ($) => {
  const temprature = $('#current_temp_hi').text().trim();
  //24 Hours
  const newSnow24Hr = $('#current_snow_conditions table tr td').slice(4,5).text().trim();
  //Base
  const snowDepthBase = $('#current_snow_conditions table tr td').slice(1,2).text().trim();

  const snowDepthSummit = $('#current_snow_conditions table tr td').slice(2,3).text().trim();
  return {
    ...initialSnow,
    temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const parseHomewoodLifts = async ($) => {
  return {
    ...initialLifts,
  };
}

export const parseHomewoodTrails = async ($) => {
  return {
    ...initialTrails,
  };
}

export const parseHomewoodLiftList = async ($) => {
  const list = [];

  $('.lifts_table .lift_header').map((index, liftHeaderElement) => {
    const nameElements = $(liftHeaderElement).find('h4');
    const statusElements = $(liftHeaderElement).find('div');

    const name = notEmptyStringOrNull($(nameElements).text().trim());
    const status = liftTrailStatusOrNull($(statusElements).text().trim());
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

export const parseHomewoodTrailList = async ($) => {
  const list = [];

  $('#lifts_wrapper td').map((index, trailElement) => {
    console.warn($(trailElement).filter('tr:has(img)').text())
    const trElement = trailElement.parent;
    const trElementStatus = $(trElement).find('td[class^="run_status"]');
    // const tdElementCatgory = tdElements[4];

    // const tableElement = tdElementName.parent.parent.parent;
    // const thElementCategory = $(tableElement).find('thead > tr > th').get(1);

    const name = notEmptyStringOrNull($(trailElement).text().trim());
    const status = liftTrailStatusOrNull($(trElementStatus).text().trim());
    // const level = trailLevelOrNull($(thElementCategory).text().trim());
    // const category = notEmptyStringOrNull($(tdElementCatgory).text().trim());

    const trail = {
      name,
      status,
      // category,
      // level,
    };

    list.push(trail)
  });

 return list;
}
