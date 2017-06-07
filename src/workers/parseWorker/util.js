const DEGREE_SYMBOLS = ['°', 'deg', 'degree', 'degrees'];
const INCH_SYMBOLS = ['"', '”', 'in', 'inch', 'inches'];
const RESORT_STATUS = ['open', 'closed'];
const WEATHER_STATUS = ['sunny', 'clear', 'snow', 'rain', 'cloudy'];

export const isNumber = (value) => {
  return Number.isInteger(value);
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

export const numberOrNull = (value) => {
  if(isNumber(value)) {
    return value;
  }

  return null;
};
