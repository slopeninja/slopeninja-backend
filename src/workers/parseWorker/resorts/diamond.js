import {
  degreeOrNull,
  inchOrNull,
  resortStatusOrNull,
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

export const parseDiamondSnow = async ($) => {
  const status = $('.surface-conditions p').first().text().trim();
  const weatherIcon = $('.weather-condition .weather-condition-wrapper .weather-forecast').first().text().trim();
  const temperature = $('.conditions-overlay .row.weather-row .large-4.columns').first().text().trim();
  // 24 Hours
  const newSnow24Hr = $('.report div dd').slice(1, 2).text().trim()
    .split(' ')[0];
  // Base
  const snowDepthBase = $('.report div dd').slice(3, 4).text().trim()
    .split(' ')[0];
  const snowDepthSummit = $('.report div dd').slice(4, 5).text().trim()
    .split(' ')[0];
  return {
    ...initialWeather,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    status: resortStatusOrNull(status),
    temperature: degreeOrNull(temperature),
    newSnow: inchOrNull(newSnow24Hr, { omitUnitSign: true }),
    snowDepthBase: inchOrNull(snowDepthBase, { omitUnitSign: true }),
    snowDepthSummit: inchOrNull(snowDepthSummit, { omitUnitSign: true }),
  };
};

export const parseDiamondLiftCounts = async () => {
  return {
    ...initialLifts,
  };
};

export const parseDiamondTrailCounts = async () => {
  return {
    ...initialTrails,
  };
};

export const parseDiamondLifts = async ($) => {
  const list = [];

  $('.conditions .conditions__row--header').each((index, rowElement) => {
    const h3Elements = $(rowElement).find('.conditions__name');
    const divlements = $(rowElement).find('.conditions__status');

    const name = notEmptyStringOrNull($(h3Elements).text().trim());
    const status = liftTrailStatusOrNull($(divlements).text().trim());
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

export const parseDiamondTrails = async ($) => {
  const list = [];

  $('.conditions .conditions__row:not(.conditions__row--header)').each((index, rowElement) => {
    // const parentElement = rowElement.parent.parent.parent;
    const h3ElementCategory = $(rowElement).prevAll('.conditions__row--header').slice(-1).find('.conditions__name');

    const name = notEmptyStringOrNull($(rowElement).find('.conditions__name').text().trim());
    const status = liftTrailStatusOrNull($(rowElement).find('.conditions__status').text().trim());
    const level = trailLevelOrNull($(rowElement).find('.conditions__rating span').attr('class'));
    const category = notEmptyStringOrNull($(h3ElementCategory).text().trim());

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
