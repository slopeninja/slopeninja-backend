import femaleNames from 'datasets-female-first-names-en';
import maleNames from 'datasets-male-first-names-en';

export const extractFirstNameFromDeviceName = (string) => {
  if (!string) {
    return null;
  }
  const trimedString = string.split(' ')[0].split('\'s')[0];
  const femaleName = femaleNames.find(name => trimedString.toLowerCase() === name.toLowerCase());
  const maleName = maleNames.find(name => trimedString.toLowerCase() === name.toLowerCase());

  let name = femaleName ? femaleName : maleName;
  if (!name) {
    name = null;
  }

  return name;
};
