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

export const parseAlpineSnow = async ($) => {
  const weather = $('#alpine-elevation-0 .row .cellwrapper .cell h6')
    .first()
    .text()
    .trim();
  const temperature = $('#alpine-elevation-0 .row .cellwrapper .cell .value')
    .first()
    .text()
    .trim();
  // 24
  const newSnow24Hr = $('#alpine-elevation-1 .row.snow .cellwrapper .cell p.value').slice(5, 6).text().trim();
  // //Base
  const snowDepthBase = $('#alpine-elevation-2 .row.snow .cellwrapper .cell .value').slice(7, 8).text().trim();
  const snowDepthSummit = $('#alpine-elevation-1 .row.snow .cellwrapper .cell p.value').slice(7, 8).text().trim();

  return {
    ...initialSnow,
    weatherIcon: weatherStatusOrNull(weather),
    temperature: degreeOrNull(temperature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
};

export const parseAlpineLiftCounts = async ($) => {
  const open = numberOrNull(Number.parseInt(
    $('#alpine-report .global-stats .cell.open-lifts .value').text().trim(),
    10,
  ));

  return {
    ...initialLifts,
    open: numberOrNull(open),
  };
};

export const parseAlpineTrailCounts = async ($) => {
  const open = numberOrNull(Number.parseInt(
    $('#alpine-report .global-stats .cell.open-trails .value').text().trim(),
    10,
  ));

  return {
    ...initialTrails,
    open: numberOrNull(open),
  };
};

export const parseAlpineLifts = async ($) => {
  const list = [];
  $('#alpine-lifts .lift-wrapper .lift-trails-list.lifts .row').each((index, rowElement) => {
    // alpine messed up their lifts list by including a shuttle in it
    // we need to make sure we exclude that from the list
    const isShuttle = $(rowElement).text().trim().toLowerCase()
      .includes('shuttle');
    if (isShuttle) {
      return;
    }

    const columnElements = $(rowElement).find('.cell');
    const nameElement = columnElements[0];
    // const statusContainerElement = columnElements[3];

    const statusElement = $(columnElements[3]).find('span[class^="icon-status"]');

    const prevSubheaderCategories = $(rowElement).parent().parent().prevAll('.subheader');
    const subheaderCategory = prevSubheaderCategories.get(0);

    const status = liftTrailStatusOrNull(statusElement.attr('class'));
    const name = notEmptyStringOrNull($(nameElement).text().trim());
    const category = notEmptyStringOrNull($(subheaderCategory).text().trim());

    const lift = {
      name,
      status,
      category,
    };
    list.push(lift);
  });

  return list;
};

export const parseAlpineTrails = async ($) => {
  const list = [];

  $('#alpine-trails .area .lift-wrapper .lift-trails-list.trails .row').each((index, rowElement) => {
    const columnElements = $(rowElement).find('.cell');
    const nameElement = columnElements[0];
    const levelElement = $(columnElements[0]).find('span span');
    // const statusContainerElement = columnElements[3];

    const statusElement = $(columnElements[2]).find('span span');

    const status = liftTrailStatusOrNull(statusElement.attr('class'));

    const prevSubheaderCategories = $(rowElement)
      .parent()
      .parent()
      .parent()
      .parent()
      .prevAll('.subheader')
      .slice(0, 1);

    const name = notEmptyStringOrNull($(nameElement).text().trim());
    const level = trailLevelOrNull($(levelElement).attr('class'));
    const category = notEmptyStringOrNull($(prevSubheaderCategories).text().trim());

    if (!level) {
      return;
    }

    const trail = {
      name,
      status,
      category,
      level,
    };
    list.push(trail);
  });

  return list;
};
