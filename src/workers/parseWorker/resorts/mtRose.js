import {
  degreeOrNull,
  inchOrNull,
  numberOrNull,
  // weatherStatusOrNull,
  // liftTrailStatusOrNull,
  // notEmptyStringOrNull,
  // resortStatusOrNull,
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

const parseInRange = (string = '', min = true) => {
  if (!string.includes('-')) {
    return string;
  }

  return min ? string.split('-')[0] : string.split('-')[1];
};

export const parseMtRoseSnow = async ($) => {
  // const weatherIcon = $('.sr-current-cond .sr-cc-wrapper .sr-text').first().text().trim();
  // const status = $('.sr-mountain-notes.sr-row .sr-text p').first().text().trim();
  const temperature = $('.current-condition-1 .conditions h2').first().text().trim();
  // 24 Hours
  const newSnow24Hr = parseInRange($('.current-condition-2 h2').first().text().trim(), false);
  // Base
  const snowDepthBase = parseInRange($('.current-condition-1 .conditions h2').slice(3, 4).text().trim());
  const snowDepthSummit = parseInRange($('.current-condition-1 .conditions h2').slice(3, 4).text().trim(), false);

  return {
    ...initialSnow,
    // weatherIcon: weatherStatusOrNull(weatherIcon),
    // status: resortStatusOrNull(status),
    temperature: degreeOrNull(temperature),
    newSnow: numberOrNull(Number.parseInt(newSnow24Hr, 10)),
    snowDepthBase: inchOrNull(`${snowDepthBase}"`),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
};

export const parseMtRoseLiftCounts = async () => {
  return {
    ...initialLifts,
  };
};

export const parseMtRoseTrailCounts = async () => {
  return {
    ...initialTrails,
  };
};

export const parseMtRoseLifts = async () => {
  const list = [];

  // $('.sr-lifts-wrapper .sr-ski-lift-wrapper').each((index, rowElement) => {
  //   const nameText = $(rowElement).find('.sr-lift-name').text().trim();
  //   const statusText = $(rowElement).find('.sr-lift-status').text().trim();
  //   //
  //   const name = notEmptyStringOrNull(nameText);
  //   const status = liftTrailStatusOrNull(statusText);
  //   const category = null;
  //
  //   const lift = {
  //     name,
  //     status,
  //     category,
  //   };
  //
  //   list.push(lift);
  // });

  return list;
};

export const parseMtRoseTrails = async () => {
  const list = [];

  return list;
};
