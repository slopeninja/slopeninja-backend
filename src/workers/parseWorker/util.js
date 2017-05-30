const DEGREE_SYMBOL = '°';
const INCH_SYMBOL = '"';

export const isNumber = (value) => {
  return Number.isInteger(value);
}

export const isDegreeNumber = (value) => {
  if (!value || typeof value !== 'string') {
    return false;
  }

  const arr = value.split(DEGREE_SYMBOL);

  if(arr.length !== 2) {
    return false;
  }

  const temprature = Number.parseInt(arr[0]);

  return isNumber(temprature);
}

export const isInchNumber = (value) => {
  if (!value || typeof value !== 'string') {
    return false;
  }

  const arr = value.split(INCH_SYMBOL);

  if(arr.length !== 2) {
    return false;
  }

  const inch = Number.parseInt(arr[0]);

  return isNumber(inch);
}

export const degreeOrNull = (value) => {
  if(isDegreeNumber(value)) {
    return value;
  }

  return null;
};

export const inchOrNull = (value) => {
  if(isInchNumber(value)) {
    return value;
  }

  return null;
};

export const numberOrNull = (value) => {
  if(isNumber(value)) {
    return value;
  }

  return null;
};
