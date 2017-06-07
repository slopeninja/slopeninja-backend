
import {
  degreeOrNull,
  inchOrNull,
  resortStatusOrNull,
  numberOrNull,
  weatherStatusOrNull,
} from '../util';

const initialWeather = {
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

export const parseSugarSnow = async ($) => {
  const weatherIcon = $('#conditions_status_col_left #conditions_status_col_left_weather .label_small').first().text().trim();
  const status = $('#container_312_outer .h3').first().text().trim();
  const temprature = $('#container_314_outer .conditions_col .table_text_01.c4').first().text().trim();
  //24 Hours
  const newSnow24Hr = $('#container_313_outer .conditions_col .table_text_01.c4').slice(3,4).text().trim();
  //Base
  const snowDepthBase = $('#container_314_outer .conditions_col.conditions_col_break1 .table_text_01.c4').text().trim();

  const snowDepthSummit = $('#container_313_outer .conditions_col.conditions_col_break1 .table_text_01.c4').text().trim();

  return {
    ...initialWeather,
    weatherIcon: weatherStatusOrNull(weatherIcon),
    status: resortStatusOrNull(status),
    temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const parseSugarLifts = async ($) => {
  const open = numberOrNull(Number.parseInt($('.c1 #conditions_status_col_left_openlifts .h3').text().trim()));
  return {
    ...initialLifts,
    open,
  };
}

export const parseSugarTrails = async ($) => {
  return {
    ...initialTrails,
  };
}
