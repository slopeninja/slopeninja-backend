import {
  inchOrNull,
  numberOrNull,
  notEmptyStringOrNull,
  trailLevelOrNull,
  liftTrailStatusOrNull,
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
  if (!data.snowReport) {
    return {
      ...initialSnow,
    };
  }

  // 24 Hours
  const newSnow24Hr = data.snowReport[0].items.find(i => i.duration === '24 Hours').amount;
  // Base
  const snowDepthBase = data.snowReport[0].items.find(i => i.duration === 'base-depth').amount;

  const snowDepthSummit = data.snowReport[0].items.find(i => i.duration === 'upper-base-depth').amount;

  return {
    ...initialSnow,
    newSnow: inchOrNull(`${newSnow24Hr}"`),
    snowDepthBase: Number.parseInt(snowDepthBase, 10),
    snowDepthSummit: Number.parseInt(snowDepthSummit, 10),
  };
};

export const parseBorealLiftCounts = async (data) => {
  if (!data.liftReport) {
    return {
      ...initialLifts,
    };
  }

  const openLifts = data.liftReport.open;
  const totalLifts = data.liftReport.total;
  return {
    ...initialLifts,
    total: numberOrNull(totalLifts),
    open: numberOrNull(openLifts),
  };
};

export const parseBorealTrailCounts = async (data) => {
  if (!data.trailReport) {
    return {
      ...initialTrails,
    };
  }
  const openTrails = data.trailReport.open;
  const totalTrails = data.trailReport.total;
  return {
    ...initialTrails,
    total: numberOrNull(totalTrails),
    open: numberOrNull(openTrails),
  };
};

export const parseBorealLifts = async (data) => {
  if (!data.length) {
    return [];
  }

  const list = data.filter(item => item.type === 'lift').map((liftItem) => {
    const { name } = liftItem.properties;
    const status = liftTrailStatusOrNull(liftItem.status.find(s =>
      s.status_name === 'opening').status_value);
    const category = notEmptyStringOrNull(liftItem.sector);
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
  if (!data.length) {
    return [];
  }

  const list = data.filter(item => item.type === 'trail').map((trailItem) => {
    const { name } = trailItem.properties;
    const status = liftTrailStatusOrNull(trailItem.status.find(s =>
      s.status_name === 'opening').status_value);
    const category = notEmptyStringOrNull(trailItem.sector);
    const level = trailLevelOrNull(trailItem.properties.subtype);
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
