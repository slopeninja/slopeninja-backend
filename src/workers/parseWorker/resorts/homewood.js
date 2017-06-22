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

  $('#lifts_wrapper .lifts_table tbody').map((index, tableElement) => {
    $(tableElement).find('td.beginner, td.intermediate, td.advanced, td.expert').map((index, tdElement) => {

      const statusElement = $(tdElement).next();
      const nameElement = $(tdElement);
      const levelElement = $(tdElement);
      const categoryElement = $(tdElement.parent).siblings().first().find('h4');

      const name = notEmptyStringOrNull($(nameElement).text().trim());
      const status = liftTrailStatusOrNull($(statusElement).text().trim());
      const level = trailLevelOrNull(levelElement.attr('class'));
      const category = notEmptyStringOrNull($(categoryElement).text().trim())


      const trail = {
        name,
        status,
        category,
        level,
      };

      list.push(trail)

    })
  });
  
 return list;
}
