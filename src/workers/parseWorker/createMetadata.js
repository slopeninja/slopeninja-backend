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
    coords: { lat: 39.1969822, lng: -120.2431388 },
    location: 'Olympic Valley, CA 96146'
  },
  'alpine-meadows': {
    name: 'Alpine Meadows',
    logo: '/images/resorts/squaw.svg',
    coords: { lat: 39.154969, lng: -120.238209 },
    location: 'Alpine Meadows, CA 96146'
  },
  'diamond-peak': {
    name: 'Diamond Peak',
    logo: '/images/resorts/diamond.svg',
    coords: { lat: 39.253813, lng: -119.92171 },
    location: 'Incline Village, NV 89451'
  },
  heavenly: {
    name: 'Heavenly',
    logo: '/images/resorts/heavenly.svg',
    coords: { lat: 38.929011, lng: -119.906233 },
    location: 'Stateline, NV 89449'
  },
  kirkwood: {
    name: 'Kirkwood',
    logo: '/images/resorts/kirkwood.svg',
    coords: { lat: 38.678233, lng: -120.063198 },
    location: 'Kirkwood, CA 95646'
  },
  northstar: {
    name: 'Northstar',
    logo: '/images/resorts/northstar.svg',
    coords: { lat: 39.258638, lng: -120.133293 },
    location: 'Truckee, CA 96161'
  },
  homewood: {
    name: 'Homewood',
    logo: '/images/resorts/homewood.svg',
    coords: { lat: 39.077952, lng: -120.171985 },
    location: 'Homewood, CA 96141'
  },
  'sugar-bowl': {
    name: 'Sugar Bowl',
    logo: '/images/resorts/sugarbowl.svg',
    coords: { lat: 39.3000277, lng: -120.3437774 },
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
    coords: { lat: 39.314905, lng: -119.881005 },
    location: 'Reno, NV 89511'
  },
  boreal: {
    name: 'Boreal',
    logo: '/images/resorts/boreal.svg',
    coords: { lat: 39.332769, lng: -120.347075 },
    location: 'Soda Springs, CA 95728'
  }
};

const createMetadata = (shortName, resort) => {
  let weatherIcon = resort.snow.weatherIcon;
  if (!weatherIcon && resort.weather.weatherIcon) {
    weatherIcon = resort.weather.weatherIcon;
  } else if (!weatherIcon && !resort.weather.weatherIcon){
    weatherIcon = 'cloudy';
  }

  let temperature = resort.snow.temperature;
  if (!temperature) {
    temperature = resort.weather.temperature;
  }

  let openLiftCounts = resort.liftCounts.open;
  if (!openLiftCounts) {
    const openLifts = resort.lifts.filter(lift => lift.status === 'open');
    openLiftCounts = openLifts.length;
  }

  let totalLiftCounts = resort.liftCounts.total;
  if (!totalLiftCounts) {
    totalLiftCounts = resort.lifts.length;
  }

  let openTrailsCounts = resort.trailCounts.open;
  if (!openTrailsCounts) {
    const openTrails = resort.trails.filter(lift => lift.status === 'open');
    openTrailsCounts = openTrails.length;
  }

  let totalTrailCounts = resort.trailCounts.total;
  if (!totalTrailCounts) {
    totalTrailCounts = resort.trails.length;
  }

  let status = 'closed';
  if (openLiftCounts > 0) {
    status = 'open';
  }

  const roads = Array.isArray(resort.roads) ? resort.roads : [resort.roads];

  return {
    ...metadata[shortName],
    status,
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
    roads,
  };
};

export default createMetadata;
