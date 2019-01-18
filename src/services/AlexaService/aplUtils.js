const SLOPE_NINJA_URL_PREFIX = 'https://slope.ninja';

export const generateMainDatasources = ({ resorts }) => {
  if (!resorts || !resorts.length) {
    return null;
  }

  const sortedResorts = resorts.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  const listItems = sortedResorts.map((resort, index) => ({
    listItemIdentifier: resort.shortName,
    ordinalNumber: index + 1,
    textContent: {
      primaryText: {
        type: 'PlainText',
        text: resort.name,
      },
      secondaryText: {
        type: 'PlainText',
        text: resort.location,
      },
      resortLiftStatus: {
        type: 'PlainText',
        text:
          resort.liftCounts.open && resort.liftCounts.total
            ? `${resort.liftCounts.open} / ${resort.liftCounts.total}`
            : '-',
      },
      resortTrailStatus: {
        type: 'PlainText',
        text:
          resort.trailCounts.open && resort.trailCounts.total
            ? `${resort.trailCounts.open} / ${resort.trailCounts.total}`
            : '-',
      },
      resortStatus: {
        type: 'PlainText',
        text: resort.status,
      },
    },
    image: {
      contentDescription: null,
      smallSourceUrl: null,
      largeSourceUrl: null,
      sources: [
        {
          url: `${SLOPE_NINJA_URL_PREFIX}${resort.logo}`,
          size: 'small',
          widthPixels: 0,
          heightPixels: 0,
        },
        {
          url: `${SLOPE_NINJA_URL_PREFIX}/emailAssets/weatherIcons/${
            resort.weather.condition
          }.png`,
          size: 'large',
          widthPixels: 0,
          heightPixels: 0,
        },
      ],
    },
    token: resort.shortName,
  }));

  return {
    hintText: 'Try, "Alexa, select Sierra at Tahoe"',
    title: 'Slope Ninja',
    logoUrl: 'https://slope.ninja/static/media/logo.658ad4d9.svg',
    totalNumberOfItems: 12,
    listPage: {
      listItems,
    },
  };
};

/* eslint-disable no-param-reassign */
const getRouteCondition = (roads) => {
  const roadConditions = roads.reduce(
    (accum, road) => {
      if (road.status === 'closed' || road.status === 'ambiguous') {
        accum.openRoutes.closed = accum.openRoutes.closed
          ? `${accum.openRoutes.closed} ${road.prefix}-${road.number}`
          : `${road.prefix}-${road.number}`;
      } else {
        accum.openRoutes.open = accum.openRoutes.open
          ? `${accum.openRoutes.open} ${road.prefix}-${road.number}`
          : `${road.prefix}-${road.number}`;
      }

      if (road.chainStatus === 'R1') {
        accum.chains.r1 = `${accum.chains.r1 ? accum.chains.r1 : 'R1'} ${
          road.prefix
        }-${road.number}`;
      } else if (road.chainStatus === 'R2') {
        accum.chains.r2 = `${accum.chains.r2 ? accum.chains.r2 : 'R2'} ${
          road.prefix
        }-${road.number}`;
      }

      return accum;
    },
    {
      openRoutes: {
        open: '',
        closed: '',
      },
      chains: {
        r1: '',
        r2: '',
      },
    },
  );
  /* eslint-enble */

  roadConditions.openRoutes.open = roadConditions.openRoutes.open
    ? roadConditions.openRoutes.open
    : undefined;
  roadConditions.openRoutes.closed = roadConditions.openRoutes.closed
    ? roadConditions.openRoutes.closed
    : undefined;
  roadConditions.chains.r1 = roadConditions.chains.r1
    ? roadConditions.chains.r1
    : undefined;
  roadConditions.chains.r2 =
    roadConditions.chains.r2 && roadConditions.chains.r2
      ? roadConditions.chains.r2
      : undefined;

  if (!roadConditions.openRoutes.closed) {
    roadConditions.openRoutes.open = 'All Routes are Open';
    roadConditions.openRoutes.closed = '';
  }

  if (!roadConditions.chains.r1 && !roadConditions.chains.r2) {
    roadConditions.chains.r1 = 'No Chain Controls';
    roadConditions.chains.r2 = '';
  }

  return roadConditions;
};

export const generateResortDatasources = ({ resorts, resortShortName }) => {
  const resort = resorts.find(r => r.shortName === resortShortName);

  if (!resort) {
    return null;
  }

  const roadConditions = getRouteCondition(resort.roads);

  const resortDetails = {
    temperature: `${resort.weather.temperature}°`,
    newSnow: `${resort.weather.newSnow}"`,
    snowDepth: `${resort.weather.snowDepth}"`,
    resortLogo: `${SLOPE_NINJA_URL_PREFIX}${resort.logo}`,
    resortName: resort.name,
    resortStatus: resort.status,
    weatherIcon: `${SLOPE_NINJA_URL_PREFIX}/emailAssets/weatherIcons/${
      resort.weather.condition
    }.png`,
    ...roadConditions,
    openLifts:
      resort.liftCounts.open && resort.liftCounts.total
        ? `${resort.liftCounts.open} / ${resort.liftCounts.total}`
        : '-',
    openTrails:
      resort.trailCounts.open && resort.trailCounts.total
        ? `${resort.trailCounts.open} / ${resort.trailCounts.total}`
        : '-',
  };

  return {
    hintText: 'Try, "Alexa, select Sierra at Tahoe"',
    title: 'Slope Ninja',
    logoUrl: 'https://slope.ninja/static/media/logo.658ad4d9.svg',
    resortDetails,
  };
};
