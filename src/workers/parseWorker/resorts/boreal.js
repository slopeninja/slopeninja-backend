import {
  inchOrNull,
  resortStatusOrNull,
  numberOrNull,
  weatherStatusOrNull,
  boralLiftTrailStatusOrNull,
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


export const parseBorealSnow = async (data) => {
  if (!data.default_data) {
    return {
      ...initialSnow,
    };
  }

  /* eslint-disable max-len */
  const weatherIcon = data.default_data[2].weather_report.forecast.forecast.simpleforecast.forecastday[0].conditions;
  const status = data.default_data[10].wrapper_content[0].items[5].body;
  const temperature = data.default_data[2].weather_report.forecast.forecast.simpleforecast.forecastday[0].high.fahrenheit;
  /* eslint-enable */
  // 24 Hours
  const newSnow24Hr = data.default_data[0].snow_report['24_hour'][0];
  // Base
  // const snowDepthBase =

  const snowDepthSummit = data.default_data[0].snow_report.season.Base.base;
  return {
    ...initialSnow,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    status: resortStatusOrNull(status),
    temperature: Number.parseInt(temperature, 10),
    newSnow: inchOrNull(newSnow24Hr),
    // snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: Number.parseInt(snowDepthSummit, 10),
  };
};

export const parseBorealLiftCounts = async (data) => {
  if (!data.default_data) {
    return {
      ...initialLifts,
    };
  }
  const openLifts = data.default_data[3].trail_open_report.lifts.open;
  const totalLifts = data.default_data[3].trail_open_report.lifts.total;
  return {
    ...initialLifts,
    total: numberOrNull(totalLifts),
    open: numberOrNull(openLifts),
  };
};

export const parseBorealTrailCounts = async (data) => {
  if (!data.default_data) {
    return {
      ...initialTrails,
    };
  }
  const openTrails = data.default_data[3].trail_open_report.trails.open;
  const totalTrails = data.default_data[3].trail_open_report.trails.total;
  return {
    ...initialTrails,
    total: numberOrNull(totalTrails),
    open: numberOrNull(openTrails),
  };
};

export const parseBorealLifts = async (data) => {
  if (!data.level_3) {
    return [];
  }

  const list = data.level_3.field_dynamic_content.items.map((liftItem) => {
    const name = liftItem.title;
    const status = boralLiftTrailStatusOrNull(liftItem.field_lift_open);
    const category = notEmptyStringOrNull(liftItem.field_area);
    const lift = {
      name,
      status,
      category,
    };
    return lift;
  });

  return list;
};

export const parseBorealTrails = async (data) => {
  if (!data.level_3) {
    return [];
  }
  const list = data.level_3.field_dynamic_content.items.map((trailItem) => {
    const name = trailItem.title;
    const status = boralLiftTrailStatusOrNull(trailItem.field_trail_open);
    const category = notEmptyStringOrNull(trailItem.field_area);
    const level = trailLevelOrNull(trailItem.field_participant_level);
    const trail = {
      name,
      status,
      category,
      level,
    };

    return trail;
  });

  return list;
};
