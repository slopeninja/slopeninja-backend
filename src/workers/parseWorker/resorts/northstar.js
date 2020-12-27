import {
  inchOrNull,
  liftTrailStatusOrNull,
  trailLevelOrNull,
  numberOrNull,
  notEmptyStringOrNull,
} from '../weatherUtil';

import { extractJSONFromScriptElement } from './heavenly';

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

export const parseNorthstarSnow = async ($) => {
  const snowReportData = extractJSONFromScriptElement(
    $,
    'snowReportSettings',
    'FR.snowReportData = {',
    '};',
    ['{', '}'],
  );

  return {
    ...initialSnow,
    // status: resortStatusOrNull(),
    // temperature: degreeOrNull(temperature),
    newSnow: inchOrNull(snowReportData ?
      `${snowReportData.TwentyFourHourSnowfall.Inches} inches` :
      null),
    // snowDepthBase: inchOrNull(snowDepthBase),
    snowDepthSummit: inchOrNull(snowReportData ?
      `${snowReportData.BaseDepth.Inches} inches` :
      null),
    baseCondition: notEmptyStringOrNull(snowReportData ?
      snowReportData.OverallSnowConditions :
      null),
  };
};

export const parseNorthstarLiftCounts = async ($) => {
  const openLifts = Number.parseInt(
    $('.c118__number1--v1').first().text(),
    10,
  );
  const totalLifts = Number.parseInt(
    $('.c118__number2--v1').first().text().replace('/', ''),
    10,
  );

  return {
    ...initialLifts,
    total: numberOrNull(totalLifts),
    open: numberOrNull(openLifts),
  };
};

export const parseNorthstarTrailCounts = async ($) => {
  const openTrails = Number.parseInt(
    $('.c118__number1--v1').slice(1, 2).text(),
    10,
  );
  const totalTrails = Number.parseInt(
    $('.c118__number2--v1').slice(1, 2).text().replace('/', ''),
    10,
  );

  return {
    ...initialTrails,
    total: numberOrNull(totalTrails),
    open: numberOrNull(openTrails),
  };
};

export const parseNorthstarLifts = async ($) => {
  const liftsReportData = extractJSONFromScriptElement(
    $,
    'TerrainStatusFeed',
    'FR.TerrainStatusFeed = {',
    '};',
    ['{', '}'],
  );

  let allLifts = [];
  if (liftsReportData) {
    allLifts = liftsReportData.Lifts.map(lift => ({
      name: lift.Name,
      category: lift.Mountain,
      status: liftTrailStatusOrNull(`${lift.Status}`),
    }));
  }
  return allLifts;
};

export const parseNorthstarTrails = async ($) => {
  const trailsReportData = extractJSONFromScriptElement(
    $,
    'TerrainStatusFeed',
    'FR.TerrainStatusFeed = {',
    '};',
    ['{', '}'],
  );

  let allTrails = [];
  if (trailsReportData) {
    allTrails = trailsReportData.GroomingAreas.reduce((trails, category) => {
      category.Runs.forEach((run) => {
        const trail = {
          name: run.Name,
          status: liftTrailStatusOrNull(`${run.IsOpen}`),
          category: category.Name,
          level: trailLevelOrNull(`${run.Type}`),
        };
        trails.push(trail);
      });
      return trails;
    }, []);

    const trailsExcludingParks = allTrails.filter(trail =>
      !trail.name.includes('Terrain Park'));
    return trailsExcludingParks;
  }

  return allTrails;
};
