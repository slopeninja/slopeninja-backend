const DEGREE_SYMBOLS = ['°', 'deg', 'degree', 'degrees'];
const INCH_SYMBOLS = ['"', '”', 'in', 'inch', 'inches'];
const RESORT_STATUS = ['open', 'opened', 'yes', 'close', 'closed', 'no'];


const OPEN_STATUS = ['open', 'opened', 'yes', 'groomed', 'status_1', 'o' , 'g'];
const CLOSED_STATUS = ['close', 'closed', 'no', 'status_0', 'c'];
const ON_HOLD_STATUS = ['pending', 'scheduled', 'on hold'];

const WEATHER_STATUS = ['sunny', 'clear', 'snow', 'rain', 'cloudy', 'thunderstorm'];

const BEGINNER_LEVEL = ['green', 'beginner', 'easier', 'easiest', 'circle', 'type_1'];
const IMTERNEDIATE_LEVEL = ['blue', 'intermediate', 'square', 'moredifficult', 'type_2'];
const ADVANCED_LEVEL = [
  'black',
  'advanced',
  'difficult',
  'mostdifficult',
  'diamond',
  'type_3',
];
const EXPERT_LEVEL = ['expert', 'double', 'type_4'];

export const isNumber = (value) => {
  return Number.isInteger(value);
}

export const parseTrailLevel = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }

  if (BEGINNER_LEVEL.find((level) => string.includes(level))) {
    return 'beginner';
  }
  else if (IMTERNEDIATE_LEVEL.find((level) => string.includes(level))) {
    return 'intermediate';
  }
  else if (EXPERT_LEVEL.find((level) => string.includes(level))) {
    return 'expert';
  }
  else if (ADVANCED_LEVEL.find((level) => string.includes(level))) {
    return 'advanced';
  }

  return null;
}

export const parseLiftTrailStatus = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }

  const matchStatus = status => {
    // make sure single character statueses don't match
    // pretty much any status that includes that char
    if(status.length === 1) {
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
}

export const parseResortStatus = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }
  const status = RESORT_STATUS.find((status) => string.includes(status));
  const OPEN_STATUS = ['open', 'opened', 'yes'];
  const CLOSED_STATUS = ['close', 'closed', 'no'];
  if (status) {
    let parsedStatus = null;
    if (OPEN_STATUS.find((status) => string.includes(status))) {
      parsedStatus = 'open';
    }
    if (CLOSED_STATUS.find((status) => string.includes(status))) {
      parsedStatus = 'closed';
    }
    return parsedStatus;
  }
  return null;
}

export const parseWeatherStatus = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }
  let status = WEATHER_STATUS.find(status => string.includes(status));
  return status;
}

export const parseDegreeNumber = (value) => {
  if (!value || typeof value !== 'string') {
    return NaN;
  }

  let symbol = DEGREE_SYMBOLS.find(symbol => value.split(symbol).length === 2);

  const arr = value.split(symbol);

  if(arr.length !== 2) {
    return NaN;
  }

  return Number.parseInt(arr[0]);
}

export const parseInchNumber = (value) => {
  if (!value || typeof value !== 'string') {
    return NaN;
  }

  let symbol = INCH_SYMBOLS.find(symbol => value.split(symbol).length === 2);

  const arr = value.split(symbol);

  if(arr.length !== 2) {
    return NaN;
  }

  return Number.parseInt(arr[0])
}

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
}

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
}

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
}
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
}
export const degreeOrNull = (value) => {
  const degreeNumber = parseDegreeNumber(value);
  if(!Number.isNaN(degreeNumber)) {
    return degreeNumber;
  }
  return null;
};

export const inchOrNull = (value) => {
  const inchNumber = parseInchNumber(value);
  if(!Number.isNaN(inchNumber)) {
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
  if(isNumber(value)) {
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
}

export const boralLiftTrailStatusOrNull = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }
  const lift_status = {
    0: 'closed',
    1: 'open'
  }

  return lift_status[string] || null;
}
