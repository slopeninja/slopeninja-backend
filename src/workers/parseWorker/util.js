const DEGREE_SYMBOLS = ['°', 'deg', 'degree', 'degrees'];
const INCH_SYMBOLS = ['"', 'in', 'inch', 'inches'];

export const isNumber = (value) => {
  return Number.isInteger(value);
}

export const isDegreeNumber = (value) => {
  if (!value || typeof value !== 'string') {
    return false;
  }

  let symbol = DEGREE_SYMBOLS.find(symbol => value.split(symbol).length === 2);

  const arr = value.split(symbol);

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

  let symbol = INCH_SYMBOLS.find(symbol => value.split(symbol).length === 2);

  const arr = value.split(symbol);

  if(arr.length !== 2) {
    return false;
  }

  const inch = Number.parseInt(arr[0]);

  return isNumber(inch);
}

export const inchNumber = (value) => {
  if (!value || typeof value !== 'string') {
    return false;
  }

  let symbol = INCH_SYMBOLS.find(symbol => value.split(symbol).length === 2);

  const arr = value.split(symbol);

  if(arr.length !== 2) {
    return false;
  }

  const inch = Number.parseInt(arr[0]);
  return inch + '"';
}

// export const JAKEJAKE = (value) => {
//   if (!value || typeof value !== 'string') {
//     return false;
//   }
//
//   const arr = value.split(INCH_SYMBOL);
//
//   if(arr.length !== 2) {
//     return false;
//   }
//
//   const inch = Number.parseInt(arr[0]);
//
//   return isNumber(inch);
// }

export const degreeOrNull = (value) => {
  if(isDegreeNumber(value)) {
    return value;
  }

  return null;
};

export const inchOrNull = (value) => {
  if(isInchNumber(value)) {
    return inchNumber(value);
  }

  return null;
};

export const numberOrNull = (value) => {
  if(isNumber(value)) {
    return value;
  }

  return null;
};
