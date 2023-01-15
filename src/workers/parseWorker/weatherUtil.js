const DEGREE_SYMBOLS = ['°', 'deg', 'degree', 'degrees'];
const INCH_SYMBOLS = ['"', '”', 'in', 'inch', 'inches'];
const RESORT_STATUS = ['open', 'opened', 'true', 'yes', 'close', 'closed', 'false', 'no'];

const OPEN_STATUS = ['open', 'opened', 'yes', 'groomed', 'status_1', 'o', 'g', 'true'];
const CLOSED_STATUS = ['close', 'closed', 'no', 'status_0', 'c', 'false'];
const ON_HOLD_STATUS = ['pending', 'scheduled', 'on hold'];

const WEATHER_STATUS = ['clear-day', 'clear-night', 'clear', 'rain', 'snow', 'sleet', 'wind', 'fog', 'cloudy', 'partly-cloudy-day', 'partly-cloudy-night', 'hail', 'thunderstorm', 'tornado'];

const BEGINNER_LEVEL = ['green', 'beginner', 'easier', 'easiest', 'circle', 'type_1'];
const IMTERNEDIATE_LEVEL = ['blue', 'intermediate', 'square', 'moredifficult', 'type_2'];
const ADVANCED_LEVEL = [
  'black',
  'advanced',
  'difficult',
  'mostdifficult',
  'diamond',
  'type_3',
  'tree',
];
const EXPERT_LEVEL = ['expert', 'double', 'type_4'];

export const isNumber = (value) => {
  return Number.isInteger(value);
};

export const parseTrailLevel = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }

  if (string.length === 1) {
    if (string === '1') {
      return 'beginner';
    } else if (string === '2') {
      return 'intermediate';
    } else if (string === '3') {
      return 'expert';
    } else if (string === '4') {
      return 'advanced';
    }
  }

  if (BEGINNER_LEVEL.find(level => string.includes(level))) {
    return 'beginner';
  } else if (IMTERNEDIATE_LEVEL.find(level => string.includes(level))) {
    return 'intermediate';
  } else if (EXPERT_LEVEL.find(level => string.includes(level))) {
    return 'expert';
  } else if (ADVANCED_LEVEL.find(level => string.includes(level))) {
    return 'advanced';
  }

  return null;
};

export const parseLiftTrailStatus = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }

  if (string.length === 1) {
    if (string === '0') {
      return 'closed';
    } else if (string === '1') {
      return 'open';
    }
  }

  const matchStatus = (status) => {
    // make sure single character statueses don't match
    // pretty much any status that includes that char
    if (status.length === 1) {
      return string === status;
    }

    return string.includes(status);
  };

  if (OPEN_STATUS.find(matchStatus)) {
    return 'open';
  }
  if (CLOSED_STATUS.find(matchStatus)) {
    return 'closed';
  }
  if (ON_HOLD_STATUS.find(matchStatus)) {
    return 'on hold';
  }

  return null;
};

export const parseResortStatus = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }
  const status = RESORT_STATUS.find(s => string.includes(s));
  const openStatus = ['open', 'opened', 'yes', 'true'];
  const closedStatus = ['close', 'closed', 'no', 'false'];
  if (status) {
    let parsedStatus = null;
    if (openStatus.find(s => string.includes(s))) {
      parsedStatus = 'open';
    }
    if (closedStatus.find(s => string.includes(s))) {
      parsedStatus = 'closed';
    }
    return parsedStatus;
  }
  return null;
};

export const parseWeatherStatus = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }
  const status = WEATHER_STATUS.find(s => string.includes(s));
  return status;
};

export const parseDegreeNumber = (value) => {
  if (!value || typeof value !== 'string') {
    return NaN;
  }

  const symbol = DEGREE_SYMBOLS.find(sym => value.split(sym).length === 2);

  const arr = value.split(symbol);

  if (arr.length !== 2) {
    return NaN;
  }

  return Number.parseInt(arr[0], 10);
};

export const parseInchNumberFromString = (value) => {
  if (!value || typeof value !== 'string') {
    return NaN;
  }

  const symbol = INCH_SYMBOLS.find(sym => value.split(sym).length === 2);

  const arr = value.split(symbol);

  if (arr.length !== 2) {
    return NaN;
  }

  return Number.parseInt(arr[0], 10);
};

export const parseInchNumberFromFloat = (value) => {
  if ((!value && value !== 0) || Number.isNaN(Number.parseInt(value, 10))) {
    return NaN;
  }

  return Number.parseInt(value, 10);
};

export const parseNumberFromString = (string) => {
  if (!string || typeof string !== 'string') {
    return NaN;
  }
  return Number.parseInt(string.match(/(\d+)/), 10);
};

export const trailLevelOrNull = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }
  const lowerCaseString = string.toLocaleLowerCase();
  const status = parseTrailLevel(lowerCaseString);
  if (status) {
    return status;
  }
  return null;
};

export const liftTrailStatusOrNull = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }
  const lowerCaseString = string.toLocaleLowerCase();
  const status = parseLiftTrailStatus(lowerCaseString);
  if (status) {
    return status;
  }
  return null;
};

export const resortStatusOrNull = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }

  const lowerCaseString = string.toLocaleLowerCase();
  const status = parseResortStatus(lowerCaseString);

  if (status) {
    return status;
  }

  return null;
};

export const weatherStatusOrNull = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }

  const lowerCaseString = string.toLocaleLowerCase();
  const status = parseWeatherStatus(lowerCaseString);

  if (status) {
    return status;
  }

  return null;
};

export const degreeOrNull = (value, options = { omitUnitSign: false }) => {
  let degreeNumber = parseDegreeNumber(value);

  if (options?.omitUnitSign) {
    degreeNumber = parseInchNumberFromFloat(value);
  }

  if (!Number.isNaN(degreeNumber)) {
    return degreeNumber;
  }

  return null;
};

export const inchOrNull = (value, options = { omitUnitSign: false }) => {
  let inchNumber = parseInchNumberFromString(value);

  if (options?.omitUnitSign) {
    inchNumber = parseInchNumberFromFloat(value);
  }

  if (!Number.isNaN(inchNumber)) {
    return inchNumber;
  }

  return null;
};

export const notEmptyStringOrNull = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }
  if (string && string.trim().length) {
    return string;
  }
  return null;
};

export const numberOrNull = (value) => {
  if (isNumber(value)) {
    return value;
  }

  return null;
};

export const removeNumberInFrontOfName = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }
  const splitedStringArr = string.split(' ');
  const constructedString = splitedStringArr.slice(1).join(' ');
  return constructedString;
};
