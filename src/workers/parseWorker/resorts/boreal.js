// import cheerio from 'cheerio';

import {
  degreeOrNull,
  inchOrNull,
  resortStatusOrNull,
  numberOrNull,
  weatherStatusOrNull,
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


export const parseBorealSnow = async (data) => {
  if (!data.default_data) {
    return {
      ...initialSnow,
    };
  };
  const weatherIcon = data.default_data[2].weather_report.forecast.forecast.simpleforecast.forecastday[0].conditions;
  const status = data.default_data[10].wrapper_content[0].items[5].body;
  const temprature = data.default_data[2].weather_report.forecast.forecast.simpleforecast.forecastday[0].high.fahrenheit;
  //24 Hours
  const newSnow24Hr = data.default_data[0].snow_report['24_hour'][0];
  //Base
  // const snowDepthBase =

  const snowDepthSummit = data.default_data[0].snow_report.season.Base.base;
  return {
    ...initialSnow,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    status: resortStatusOrNull(status),
    temprature: Number.parseInt(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    // snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: Number.parseInt(snowDepthSummit),
  };
}

export const parseBorealLifts = async (data) => {
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
  }
}

export const parseBorealTrails = async (data) => {
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
  }
}
