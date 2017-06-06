
import {
  degreeOrNull,
  inchOrNull,
  statusOrNull,
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

export const parseSugarWeather = async ($) => {
  const status = $('#container_312_outer .h3').first().text().trim();
  const temprature = $('#container_314_outer .conditions_col .table_text_01.c4').first().text().trim();
  //24 Hours
  const newSnow24Hr = $('#container_313_outer .conditions_col .table_text_01.c4').slice(3,4).text().trim();
  //Base
  const snowDepthBase = $('#container_314_outer .conditions_col.conditions_col_break1 .table_text_01.c4').text().trim();

  const snowDepthSummit = $('#container_313_outer .conditions_col.conditions_col_break1 .table_text_01.c4').text().trim();

  return {
    ...initialWeather,
    status: statusOrNull(status),
    temprature: degreeOrNull(temprature),
    newSnow: inchOrNull(newSnow24Hr),
    snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowDepthSummit),
  };
}

export const parseSugarLifts = async ($) => {
  return {
    ...initialLifts,
  };
}
