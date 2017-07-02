const metadata = {
  'sierra-at-tahoe': {
    name: 'Sierra-at-Tahoe',
    logo: '/images/resorts/sierra.svg',
    coords: { lat: 38.79935, lng: -120.080906 },
    location: 'Twin Bridges, CA 95735'
  },
  'squaw-valley': {
    name: 'Squaw Valley',
    logo: '/images/resorts/squaw.svg',
    coords: { lat: 39.197607, lng: -120.235442 },
    location: 'Olympic Valley, CA 96146'
  },
  'alpine-meadows': {
    name: 'Alpine Meadows',
    logo: '/images/resorts/squaw.svg',
    coords: { lat: 39.164428, lng: -120.2411641 },
    location: 'Alpine Meadows, CA 96146'
  },
  'diamond-peak': {
    name: 'Diamond Peak',
    logo: '/images/resorts/diamond.svg',
    coords: { lat: 39.254483, lng: -119.913972 },
    location: 'Incline Village, NV 89451'
  },
  heavenly: {
    name: 'Heavenly',
    logo: '/images/resorts/heavenly.svg',
    coords: { lat: 38.956813, lng: -119.942654 },
    location: 'Stateline, NV 89449'
  },
  kirkwood: {
    name: 'Kirkwood',
    logo: '/images/resorts/kirkwood.svg',
    coords: { lat: 38.684751, lng: -120.065167 },
    location: 'Kirkwood, CA 95646'
  },
  northstar: {
    name: 'Northstar',
    logo: '/images/resorts/northstar.svg',
    coords: { lat: 39.274839, lng: -120.120605 },
    location: 'Truckee, CA 96161'
  },
  homewood: {
    name: 'Homewood',
    logo: '/images/resorts/homewood.svg',
    coords: { lat: 33.471773, lng: -86.800823 },
    location: 'Homewood, CA 96141'
  },
  'sugar-bowl': {
    name: 'Sugar Bowl',
    logo: '/images/resorts/sugarbowl.svg',
    coords: { lat: 39.300444, lng: -120.333402 },
    location: 'Norden, CA 95724'
  },
  'donner-ski-ranch': {
    name: 'Donner Ski Ranch',
    logo: '/images/resorts/donner.svg',
    coords: { lat: 39.318255, lng: -120.330083 },
    location: 'Norden, CA 95724'
  },
  'mt-rose': {
    name: 'Mt Rose',
    logo: '/images/resorts/mt-rose.svg',
    coords: { lat: 39.328435, lng: -119.885375 },
    location: 'Reno, NV 89511'
  },
  boreal: {
    name: 'Boreal',
    logo: '/images/resorts/boreal.svg',
    coords: { lat: 39.336454, lng: -120.349835 },
    location: 'Soda Springs, CA 95728'
  }
};

export const createMetadata = (shortName, resort) => {
  let weatherIcon = resort.snow.weatherIcon;
  if (!weatherIcon) {
    weatherIcon = resort.weather.weatherIcon;
  }
  let temperature = resort.snow.temperature;
  if (!temperature) {
    temperature = resort.weather.temperature;
  }
  let openLiftCounts = resort.liftCounts.open;
  if (!openLiftCounts) {
    openLifts = resort.lifts.filter(lift => lift.status === 'open');
    openLiftCounts = openLifts.length;
  }
  let totalLiftCounts = resort.liftCounts.total;
  if (!totalLiftCounts) {
    totalLiftCounts = resort.lifts.length;
  }
  let openTrailsCounts = resort.trailCounts.open;
  if (!openTrailsCounts) {
    openTrails = resort.trails.filter(lift => lift.status === 'open');
    openTrailsCounts = openTrails.length;
  }
  let totalTrailCounts = resort.trailCounts.total;
  if (!totalTrailCounts) {
    totalTrailCounts = resort.trails.length;
  }

  return {
    ...metadata[shortName],
    status: resort.snow.status,
    weather: {
      base: resort.snow.baseCondition,
      newSnow: resort.snow.newSnow,
      condition: weatherIcon,
      snowDepth: resort.snow.snowDepthSummit,
      temperature
    },
    liftCounts: {
      open: openLiftCounts,
      total: totalLiftCounts
    },
    trailCounts: {
      open: openTrailsCounts,
      total: totalTrailCounts
    },
    roads: resort.roads
  };
};
