const DEGREE_SYMBOLS = ['°', 'deg', 'degree', 'degrees'];
const INCH_SYMBOLS = ['"', '”', 'in', 'inch', 'inches'];
const RESORT_STATUS = ['open', 'closed'];
const LIFT_TRAIL_STATUS = ['open', 'opened', 'yes','closed', 'close', 'no', 'scheduled','pending', 'on hold'];
const WEATHER_STATUS = ['sunny', 'clear', 'snow', 'rain', 'cloudy', 'hunderstorm'];
const TRAIL_LEVEL_SYMBOLS = ['green', 'beginner', 'easier', 'circle', 'blue', 'intermediate', 'square', 'black', 'advanced', 'difficult', 'diamond'];

export const isNumber = (value) => {
  return Number.isInteger(value);
}

export const parseTrailLevel = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }
  const level = TRAIL_LEVEL_SYMBOLS.find((level) => string.includes(level));
  const BEGINNER_LEVEL = ['green', 'beginner', 'easier', 'circle'];
  const IMTERNEDIATE_LEVEL = ['blue', 'intermediate', 'square'];
  const ADVANCED_LEVEL = ['black', 'advanced', 'difficult', 'diamond'];

  if (level) {
    let parsedLevel;
    if (BEGINNER_LEVEL.find((level) => string.includes(level))) {
      parsedLevel = 'begineer';
    }
    if (IMTERNEDIATE_LEVEL.find((level) => string.includes(level))) {
      parsedLevel = 'intermediate';
    }
    if (ADVANCED_LEVEL.find((level) => string.includes(level))) {
      parsedLevel = 'advanced';
    }
    return parsedLevel;
  }
}

export const parseLiftTrailStatus = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }
  const status = LIFT_TRAIL_STATUS.find((status) => string.includes(status));
  const OPEN_STATUS = ['open', 'opened', 'yes'];
  const CLOSED_STATUS = ['close', 'closed', 'no'];
  const ON_HOLD_STATUS = ['pending', 'scheduled', 'on hold'];

  if (status) {
    let parsedStatus;
    if (OPEN_STATUS.find((status) => string.includes(status))) {
      parsedStatus = 'open';
    }
    if (CLOSED_STATUS.find((status) => string.includes(status))) {
      parsedStatus = 'closed';
    }
    if (ON_HOLD_STATUS.find((status) => string.includes(status))) {
      parsedStatus = 'on hold';
    }
    return parsedStatus;
  }
}

export const parseResortStatus = (string) => {
  if (!string || typeof string !== 'string') {
    return null;
  }
  const status = RESORT_STATUS.find((status) => string.includes(status));
  return status;
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
  const lowerCaseString = string.toLocaleLowerCase();
  const status = parseTrailLevel(lowerCaseString);
  if (status) {
    return status;
  }
  return null;
}

export const liftTrailStatusOrNull = (string) => {
  const lowerCaseString = string.toLocaleLowerCase();
  const status = parseLiftTrailStatus(lowerCaseString);
  if (status) {
    return status;
  }
  return null;
}



export const resortStatusOrNull = (string) => {
  const lowerCaseString = string.toLocaleLowerCase();
  const status = parseResortStatus(lowerCaseString);
  if (status) {
    return status;
  }
  return null;
}
export const weatherStatusOrNull = (string) => {
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
