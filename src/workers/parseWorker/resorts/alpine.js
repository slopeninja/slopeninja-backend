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

export const parseAlpineSnow = async ($) => {
  const weatherIcon = $('#alpine-report .row.current .cellwrapper .cell h6').first().text().trim();
  const temprature = $('#alpine-report .row.current .cellwrapper .cell .value').first().text().trim();
  //24
  const newSnow24Hr = $('.row.snow .cellwrapper .cell .value').slice(1,2).text().trim();
  // //Base
  const snowDepthBase = $('#alpine-elevation-2 .row.snow .cellwrapper .cell .value').slice(3,4).text().trim();
  const snowDepthSummit = $('#alpine-elevation-1 .row.snow .cellwrapper .cell .value').slice(3,4).text().trim();

  return {
    ...initialSnow,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),

  };
}

export const parseAlpineLifts = async ($) => {
  const open = numberOrNull(Number.parseInt($('#alpine-report .global-stats .cell.open-lifts .value').text().trim()));
  return {
    ...initialLifts,
    open: numberOrNull(open),
  };
}

export const parseAlpineTrails = async ($) => {
  const open = numberOrNull(Number.parseInt($('#alpine-report .global-stats .cell.open-trails .value').text().trim()));
  return {
    ...initialTrails,
    open: numberOrNull(open),
  };
}
export const parseAlpineLiftList = async ($) => {
  const list = [];
  $('#alpine-report .lift').map((index, rowElement) => {
    // alpine messed up their lifts list by including a shuttle in it
    // we need to make sure we exclude that from the list
    const isShuttle = $(rowElement).text().trim().toLowerCase().includes('shuttle');
    if(isShuttle) {
      return;
    }

    const columnElements = $(rowElement).find('.cell');
    const nameElement = columnElements[0];
    const statusContainerElement = columnElements[3];

    const statusElement = $(columnElements[3]).find('span[class^="icon-status"]');

    const prevSubheaderCategories = $(rowElement).prevAll('.subheader');

    const status = liftTrailStatusOrNull(statusElement.attr('class'));
    const name = notEmptyStringOrNull($(nameElement).text().trim());
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

export const parseAlpineTrailList = async ($) => {
  const list = [];

  $('#alpine-report .runs .trail').map((index, rowElement) => {
    const columnElements = $(rowElement).find('.cell');
    const nameElement = columnElements[0];
    const levelElement = columnElements[1];
    const statusContainerElement = columnElements[3];

    const statusElement = $(columnElements[3]).find('span[class^="icon-status"]');

    const prevSubheaderCategories = $(rowElement).prevAll('.area').find('h4');
    const subheaderCategory = prevSubheaderCategories.get(0);

    const status = liftTrailStatusOrNull(statusElement.attr('class'));
    const name = notEmptyStringOrNull($(nameElement).text().trim());
    const level = trailLevelOrNull($(levelElement).text().trim());
    const category = notEmptyStringOrNull($(subheaderCategory).text().trim());

    if (!level) {
      return;
    }

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
