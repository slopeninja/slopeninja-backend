import {
  degreeOrNull,
  inchOrNull,
  numberOrNull,
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

export const parseAlpineSnow = async (data) => {
  const baseCondition = data?.SnowReport?.BaseConditions;
  const weatherIcon = data?.CurrentConditions?.Base?.Conditions;
  const temperature = data?.CurrentConditions?.Base?.TemperatureF;
  // 24
  const newSnow24Hr = data?.SnowReport?.MidMountainArea?.Last24HoursIn;
  // //Base
  const snowDepthBase = data?.SnowReport?.BaseArea?.BaseIn;
  const snowDepthSummit = data?.SnowReport?.MidMountainArea?.BaseIn;

  return {
    ...initialWeather,
    baseCondition: notEmptyStringOrNull(baseCondition),
    weatherIcon: weatherStatusOrNull(weatherIcon),
    temperature: degreeOrNull(temperature, { omitUnitSign: true }),
    newSnow: inchOrNull(newSnow24Hr, { omitUnitSign: true }),
    snowDepthBase: inchOrNull(snowDepthBase, { omitUnitSign: true }),
    snowDepthSummit: inchOrNull(snowDepthSummit, { omitUnitSign: true }),
  };
};

export const parseAlpineLiftCounts = async (data) => {
  const open = data?.SnowReport?.TotalOpenLifts;
  const total = data?.SnowReport?.TotalLifts;

  return {
    ...initialLifts,
    open: numberOrNull(open),
    total: numberOrNull(total),
  };
};

export const parseAlpineTrailCounts = async (data) => {
  const open = data?.SnowReport?.TotalOpenTrails;
  const total = data?.SnowReport?.TotalTrails;

  return {
    ...initialTrails,
    open: numberOrNull(open),
    total: numberOrNull(total),
  };
};


export const parseAlpineLifts = async (data) => {
  return data?.MountainAreas?.reduce((accum, area) => {
    const lifts = area.Lifts?.map(lift => ({
      name: notEmptyStringOrNull(lift.Name),
      status: liftTrailStatusOrNull(lift.Status),
      category: notEmptyStringOrNull(area),
    }));

    return [
      ...accum,
      ...lifts,
    ];
  }, []) || [];
};

export const parseAlpineTrails = async (data) => {
  return data?.MountainAreas?.reduce((accum, area) => {
    const trails = area.Trails?.map(trail => ({
      name: notEmptyStringOrNull(trail.Name),
      status: liftTrailStatusOrNull(trail.Status),
      category: notEmptyStringOrNull(area.Name),
      level: trailLevelOrNull(trail.TrailIcon),
    }));

    return [
      ...accum,
      ...trails,
    ];
  }, []) || [];
};
