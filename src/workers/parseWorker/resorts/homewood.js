import {
  parseNumberFromString,
  liftTrailStatusOrNull,
  notEmptyStringOrNull,
  trailLevelOrNull,
  numberOrNull,
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

export const parseHomewoodSnow = async ($) => {
  // const temperature = $('.time_temperature').text().trim();
  // 24 Hours
  const newSnow24Hr = $('.snow-24-hr').slice(2, 3).text().trim();
  // Base
  const snowDepthBase = $('.snow-depth ')
    .slice(0, 1)
    .text()
    .trim();

  const snowDepthSummit = $('.snow-depth ').slice(2, 3).text().trim();
  return {
    ...initialSnow,
    // temperature: degreeOrNull(temperature),
    newSnow: numberOrNull(parseNumberFromString(newSnow24Hr)),
    snowDepthBase: numberOrNull(parseNumberFromString(snowDepthBase)),
    snowDepthSummit: numberOrNull(parseNumberFromString(snowDepthSummit)),
  };
};

export const parseHomewoodLiftCounts = async ($) => {
  const open = Number.parseInt($('#lift-stats-wrapper .numerator').first().text().trim(), 10);
  const total = Number.parseInt(
    $('#lift-stats-wrapper .denominator')
      .first()
      .text()
      .trim()
      .replace('/', ''),
    10,
  );

  return {
    ...initialLifts,
    open: numberOrNull(open),
    total: numberOrNull(total),
  };
};

export const parseHomewoodTrailCounts = async ($) => {
  const open = Number.parseInt($('#lift-stats-wrapper .numerator').slice(1, 2).text().trim(), 10);
  const total = Number.parseInt(
    $('#lift-stats-wrapper .denominator')
      .slice(1, 2)
      .text()
      .trim()
      .replace('/', ''),
    10,
  );

  return {
    ...initialTrails,
    open: numberOrNull(open),
    total: numberOrNull(total),
  };
};

export const parseHomewoodLifts = async ($) => {
  const list = [];

  $('.chair-header').each((index, liftHeaderElement) => {
    const nameElements = $(liftHeaderElement).find('h2');
    const statusElements = $(liftHeaderElement).find('span.chair-details');

    const name = notEmptyStringOrNull($(nameElements).text().trim());
    const status = liftTrailStatusOrNull($(statusElements).text().trim());
    const category = null;

    const lift = {
      name,
      status,
      category,
    };

    list.push(lift);
  });

  return list;
};

export const parseHomewoodTrails = async ($) => {
  const list = [];

  $('.runs-wrapper').find('.run').each((index, rowElement) => {
    const nameElement = $(rowElement).find('.run-name');
    const levelElement = $(rowElement).find('.run-level img');
    const statusElement = $(rowElement).find('.run-status img');
    const categoryElement = $(rowElement.parent.parent).prev('.chair-header').find('h2').first();

    const name = notEmptyStringOrNull($(nameElement).text().trim());
    const status = liftTrailStatusOrNull($(statusElement).attr('alt'));
    const level = trailLevelOrNull($(levelElement).attr('alt'));
    const category = notEmptyStringOrNull($(categoryElement).text().trim());

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
