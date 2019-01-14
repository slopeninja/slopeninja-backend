const SLOPE_NINJA_URL_PREFIX = 'https://slope.ninja';

export const generateDatasources = ({ resorts }) => {
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
    hintText: 'Try, \"Alexa, select Sierra at Tahoe\"',
    listTemplate1Metadata: {
      type: 'object',
      objectId: 'lt1Metadata',
      title: 'Slope Ninja',
      logoUrl: 'https://slope.ninja/static/media/logo.658ad4d9.svg',
    },
    listTemplate1ListData: {
      type: 'list',
      listId: 'lt1Sample',
      totalNumberOfItems: listItems.length,
      listPage: {
        listItems,
      },
    },
  };
};
