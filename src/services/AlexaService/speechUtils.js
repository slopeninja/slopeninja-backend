const getAvarageTemp = (resorts) => {
  if (!resorts || !resorts.length) {
    return null;
  }
  const sum = resorts.reduce((accum, resort) => accum + resort.weather.temperature, 0);
  return Math.floor(sum / resorts.length);
};

const getSnowingResorts = (resorts) => {
  if (!resorts || !resorts.length) {
    return null;
  }

  return resorts.reduce((accum, resort) => {
    const isResortSnowing = resort.weather.condition === 'snow';
    if (isResortSnowing) {
      return [...accum, resort.name];
    }

    return accum;
  }, []);
};

const getNumberOfOpenResorts = (resorts) => {
  if (!resorts || !resorts.length) {
    return null;
  }

  return resorts.reduce((accum, resort) => {
    const isResortOpen = resort.status === 'open';
    if (isResortOpen) {
      return accum + 1;
    }

    return accum;
  }, 0);
};

const getRoadConditionsFromRoads = (roads) => {
  const roadConditions = roads.reduce((accum, road) => {
    const roadFullName = `${road.prefix}-${road.number}`;

    let { closed } = accum;
    if (
      road.status === ('closed' || 'ambiguious') &&
      !closed.includes(roadFullName)
    ) {
      closed = [...accum.closed, roadFullName];
    }

    let { r1 } = accum;
    if (road.chainStatus === 'R1' && !r1.includes(roadFullName)) {
      r1 = [...accum.r1, roadFullName];
    }

    let { r2 } = accum;
    if (road.chainStatus === 'R2' && !r2.includes(roadFullName)) {
      r2 = [...accum.r2, roadFullName];
    }

    return {
      closed,
      r1,
      r2,
    };
  }, {
    closed: [],
    r1: [],
    r2: [],
  });

  return roadConditions;
};

const getRoadConditions = (resorts) => {
  if (!resorts || !resorts.length) {
    return null;
  }

  const roads = resorts.reduce((accum, resort) => ([...accum, ...resort.roads]), []);
  const roadConditions = getRoadConditionsFromRoads(roads);

  return roadConditions;
};

export const generateGeneralWeatherSpeech = (resorts) => {
  const averageTemp = getAvarageTemp(resorts);
  const numberOfOpenResorts = getNumberOfOpenResorts(resorts);
  const snowingResortNames = getSnowingResorts(resorts);
  const snowResortLength = snowingResortNames.length;

  const tempSpeech = `It’s currently ${averageTemp} degrees Fahrenheit in Lake Tahoe`;

  if (snowResortLength === 0 && numberOfOpenResorts) {
    return numberOfOpenResorts <= 1
      ? `${tempSpeech}, there is ${numberOfOpenResorts} resort open.`
      : `${tempSpeech}, there are ${numberOfOpenResorts} resorts open.`;
  }

  if (snowResortLength === 1) {
    return `${tempSpeech}, and it’s snowing at ${snowingResortNames[0]}!`;
  }

  if (snowResortLength === 2) {
    return `${tempSpeech}, ${snowingResortNames[0]} and ${snowingResortNames[1]} with reports of pow and more to come!`;
  }

  if (snowResortLength === 3) {
    return `${tempSpeech}, and it’s getting white all over! It's snowing at ${snowingResortNames[0]}, ${snowingResortNames[1]} and ${snowingResortNames[2]}!`;
  }

  if (snowResortLength >= 4) {
    return `${tempSpeech}, Everyone’s abuzz with reports of snow. ${snowResortLength} resorts reports of pow!`;
  }

  return tempSpeech;
};

const generateConditionSpeech = (listOfRoads) => {
  return listOfRoads.reduce((accum, road, index) => {
    if (index === 0) {
      return road;
    } else if (index === listOfRoads.length - 1) {
      return `${accum}, and ${road}`;
    }

    return `${accum}, ${road}`;
  }, '');
};

const getRoadConditionsSpeech = ({ r1, r2, closed }) => {
  const roadOpening = 'If you’re planning to hit the mountains, currently';

  if (!r1.length && !r2.length && !closed.length) {
    return `${roadOpening}, all roads are open with no chain controls.`;
  }

  const extractVerb = length => (length >= 2 ? 'are' : 'is');

  let r1Speech = '';
  if (r1.length) {
    r1Speech = `on ${generateConditionSpeech(r1)}, chains, all-wheel-drive or snow tires are required`;
  }

  let r2Speech = '';
  if (r2.length) {
    r2Speech = `on ${generateConditionSpeech(r2)}, chains or all-wheel-drive with snow tires are required`;
  }

  let closedSpeech = '';
  if (closed.length) {
    closedSpeech = `${generateConditionSpeech(closed)} ${extractVerb(closed.length)} partially closed`;
  }

  const conditionSpeech = `${r1Speech ? `, ${r1Speech}` : ''}${r2Speech ? `, ${r2Speech}` : ''}${closedSpeech ? `, ${closedSpeech}` : ''}`;

  return `${roadOpening}${conditionSpeech}.`;
};

export const generateGeneralRoadSpeech = (resorts) => {
  const roadConditions = getRoadConditions(resorts);

  return getRoadConditionsSpeech(roadConditions);
};

// eslint-disable-next-line no-unused-vars
export const generateLaunchSpeech = ({ locale, resorts }) => {
  if (!resorts.length) {
    return 'Welcome to Slope Ninja! For resort specific conditions, you can say "tell me snow conditions at Squaw Valley" or your favorite resort, or, you can say exit... What can I help you with?';
  }

  const tempSpeech = generateGeneralWeatherSpeech(resorts);
  const roadSpeech = generateGeneralRoadSpeech(resorts);
  return `Welcome to Slope Ninja! Here’s your snow update: ${tempSpeech} ${roadSpeech} For resort specific conditions, you can say "tell me snow conditions at Squaw Valley" or your favorite resort, or, you can say exit... What can I help you with?`;
};

const findResort = (resorts, resortShortName) => {
  if (!resorts || !resorts.length) {
    return null;
  }
  return resorts.find(resort => resort.shortName === resortShortName);
};

const generateResortWeatherSpeech = (resort) => {
  const { weather } = resort;
  const tempSpeech = !weather.temperature ? '' : `It’s currently ${weather.temperature} degrees Fahrenheit at ${resort.name}`;
  const conditonSpeech = !weather.condition ? '' : weather.condition;

  if (tempSpeech && conditonSpeech) {
    return `${tempSpeech}, ${conditonSpeech}.`;
  } if (tempSpeech) {
    return `${tempSpeech}.`;
  } if (conditonSpeech) {
    return `It’s currently ${conditonSpeech} at ${resort.name}`;
  }

  return '';
};

const generateLiftTrailsSpeech = (resort) => {
  if (!resort.liftCounts || !resort.trailCounts) {
    return '';
  }
  const { liftCounts, trailCounts } = resort;
  return `${resort.name} has a total of ${liftCounts.total} lifts and ${trailCounts.total} trails, of which ${liftCounts.open} lifts are currently spinning, ${trailCounts.open} trails are open.`;
};

const generateResortRoadSpeech = (resort) => {
  const roadConditions = getRoadConditionsFromRoads(resort.roads);

  return getRoadConditionsSpeech(roadConditions);
};

const generateNewSnowSpeech = (resort) => {
  if (!resort.weather) {
    return '';
  }
  const { newSnow, snowDepth } = resort.weather;
  if (newSnow) {
    return `The folks at ${resort.name} received ${newSnow}” inches of new snow in the past 24 hours, adding up to ${snowDepth} inches of snow depth.`;
  }

  return `${resort.name} has a snow depth of ${snowDepth} inches.`;
};

// eslint-disable-next-line no-unused-vars
export const generateSnowConditionsSpeech = ({ locale, resorts, resortShortName }) => {
  const resort = findResort(resorts, resortShortName);

  const tempSpeech = generateResortWeatherSpeech(resort);
  const liftTrailsSpeech = generateLiftTrailsSpeech(resort);
  const newSnowSpeech = generateNewSnowSpeech(resort);
  const roadSpeech = generateResortRoadSpeech(resort);

  const endingSpeech = 'For more information, go to slope.ninja. Happy shredding!';

  return `${tempSpeech} ${liftTrailsSpeech} ${newSnowSpeech} ${roadSpeech} ${endingSpeech}`;
};
