import idx from 'idx';

import { resortConstants } from './resortsConfig';

const createMetadata = (shortName, resort) => {
  const weatherIcon =
    idx(resort, _ => _.weather.weatherIcon) ||
    idx(resort, _ => _.snow.weatherIcon);

  const temperature =
    idx(resort, _ => _.weather.temperature) ||
    idx(resort, _ => _.snow.temperature);

  const openLifts = resort.lifts && resort.lifts.filter(lift => lift.status === 'open');
  let openLiftCounts = openLifts && openLifts.length;
  if (!openLiftCounts && resort.liftCounts && resort.liftCounts.open) {
    openLiftCounts = resort.liftCounts && resort.liftCounts.open;
  }

  let totalLiftCounts = resort.lifts && resort.lifts.length;
  if (!totalLiftCounts && (!resort.liftCounts || !resort.liftCounts.total)) {
    totalLiftCounts = null;
  } else if (!totalLiftCounts && resort.liftCounts && resort.liftCounts.total) {
    totalLiftCounts = resort.liftCounts && resort.liftCounts.total;
  }

  const openTrails = resort.trails.filter(lift => lift.status === 'open');
  let openTrailsCounts = openTrails && openTrails.length;
  if (!openTrailsCounts && resort.trailCounts && resort.trailCounts.open) {
    openTrailsCounts = resort.trailCounts && resort.trailCounts.open;
  }

  let totalTrailCounts = resort.trails.length;
  if (!totalTrailCounts && (!resort.trailCounts || !resort.trailCounts.total)) {
    totalTrailCounts = null;
  } else if (!totalTrailCounts && resort.trailCounts && resort.trailCounts.total) {
    totalTrailCounts = resort.trailCounts && resort.trailCounts.total;
  }

  let status = 'closed';
  if (openLiftCounts > 0 || openTrailsCounts > 0) {
    status = 'open';
  }

  const roads = Array.isArray(resort.roads) ? resort.roads : [resort.roads];

  return {
    ...resortConstants[shortName],
    status,
    weather: {
      base: resort.snow && resort.snow.baseCondition,
      newSnow: resort.snow && resort.snow.newSnow,
      condition: weatherIcon,
      snowDepth: resort.snow && resort.snow.snowDepthSummit,
      temperature,
    },
    liftCounts: {
      open: openLiftCounts,
      total: totalLiftCounts,
    },
    trailCounts: {
      open: openTrailsCounts,
      total: totalTrailCounts,
    },
    roads,
    stale: resort.stale,
  };
};

export default createMetadata;
