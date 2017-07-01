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

export const parseSquawSnow = async ($) => {
  const weatherIcon = $('#squaw-elevation-0 .row.current .cellwrapper .cell h6').first().text().trim();
  const temperature = $('#squaw-elevation-0 .row.current .cellwrapper .cell .value').first().text().trim();
  //24
  const newSnow24Hr = $('.row.snow .cellwrapper .cell .value').slice(1,2).text().trim();
  // //Base
  const snowDepthBase = $('#squaw-elevation-2 .row.snow .cellwrapper .cell .value').slice(3,4).text().trim();
  const snowDepthSummit = $('#squaw-elevation-1 .row.snow .cellwrapper .cell .value').slice(3,4).text().trim();

  return {
    ...initialWeather,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    temperature: degreeOrNull(temperature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),

  };
}



export const parseSquawLifts = async ($) => {
  const open = numberOrNull(Number.parseInt($('#squaw-report .global-stats .cell.open-lifts .value').text().trim()));
  return {
    ...initialLifts,
    open: numberOrNull(open),
  };
}

export const parseSquawTrails = async ($) => {
  const open = numberOrNull(Number.parseInt($('#squaw-report .global-stats .cell.open-trails .value').text().trim()));
  return {
    ...initialTrails,
    open: numberOrNull(open),
  };
}


export const parseSquawLiftList = async ($) => {
  const list = [];

  $('#squaw-report .lift').map((index, rowElement) => {
    // squaw messed up their lifts list by including a shuttle in it
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
    const subheaderCategory = prevSubheaderCategories.get(0);

    const status = liftTrailStatusOrNull(statusElement.attr('class'));
    const name = notEmptyStringOrNull($(nameElement).text().trim());
    const category = notEmptyStringOrNull($(subheaderCategory).text().trim());

    const lift = {
      name,
      status,
      category,
    };
    list.push(lift)
  });

 return list;
}

export const parseSquawTrailList = async ($) => {
  const list = [];

  $('#squaw-report .runs .trail').map((index, rowElement) => {
    const columnElements = $(rowElement).find('.cell');
    const nameElement = columnElements[0];
    const levelElement = columnElements[1];
    const statusContainerElement = columnElements[3];

    const statusElement = $(columnElements[3]).find('span[class^="icon-status"]');

    const status = liftTrailStatusOrNull(statusElement.attr('class'));

    const prevSubheaderCategories = $(rowElement).prevAll('.area').find('h4');
    const subheaderCategory = prevSubheaderCategories.get(0);

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
