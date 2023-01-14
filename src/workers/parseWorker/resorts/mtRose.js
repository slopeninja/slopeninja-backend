import {
  degreeOrNull,
  inchOrNull,
  numberOrNull,
  weatherStatusOrNull,
  liftTrailStatusOrNull,
  notEmptyStringOrNull,
  // resortStatusOrNull,
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

const parseInRange = (string = '', min = true) => {
  if (!string.includes('-')) {
    return string;
  }

  return min ? string.split('-')[0] : string.split('-')[1];
};

export const parseMtRoseSnow = async ($) => {
  const weatherIcon = $('.condition-text .bigger-bolder').text().trim();
  // const status = $('.sr-mountain-notes.sr-row .sr-text p').first().text().trim();
  const temperature = $('.temperatures').text().trim();
  // 24 Hours
  const newSnow24Hr = parseInRange($('.snow-total').slice(1, 2).text().trim(), false);
  // Base
  const snowDepthBase = parseInRange($('.snow-total').slice(3, 4).text().trim(), true);
  const snowDepthSummit = parseInRange($('.snow-total').slice(3, 4).text().trim(), false);

  return {
    ...initialSnow,
    weatherIcon: weatherStatusOrNull(weatherIcon),
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

export const parseMtRoseLifts = async ($) => {
  const list = [];

  $('#lift-status .report-data .row').each((index, rowElement) => {
    const nameText = $(rowElement).find('.rose-name').text().trim();
    const statusText = $(rowElement).find('.column').slice(1, 2).text()
      .trim();

    const name = notEmptyStringOrNull(nameText);
    const status = liftTrailStatusOrNull(statusText);
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

export const parseMtRoseTrails = async ($) => {
  const list = [];

  $('.run-area .rose-panel').each((index, rowElement) => {
    $(rowElement).find('.rose-data').each((trailIndex, trailElement) => {
      const nameText = $(trailElement).find('.rose-name').text().trim();
      const statusText = $(trailElement).find('.column').slice(1, 2).text()
        .trim();
      const categoryText = $(rowElement).parent().find('.run-area-title').text()
        .trim();
      const levelText = $(rowElement).prev().find('.rose-name').text()
        .trim();

      const name = notEmptyStringOrNull(nameText);
      const status = liftTrailStatusOrNull(statusText);
      const category = notEmptyStringOrNull(categoryText);
      const level = trailLevelOrNull(levelText);

      const trail = {
        name,
        status,
        category,
        level,
      };

      list.push(trail);
    });
  });

  return list;
};
