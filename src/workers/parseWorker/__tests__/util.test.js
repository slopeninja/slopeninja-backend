import {
  isNumber,
  isDegreeNumber,
  isInchNumber,
  degreeOrNull,
  inchOrNull,
  numberOrNull,
} from '../util';

test('tests if valid number', () => {
  expect(isNumber(4)).toBe(true);
  expect(isNumber(100)).toBe(true);
  expect(isNumber(-100)).toBe(true);
  expect(isNumber('100')).toBe(false);
  expect(isNumber('abc')).toBe(false);
  expect(isNumber()).toBe(false);
});

test('tests if valid degree number', () => {
  expect(isDegreeNumber('100°')).toBe(true);
  expect(isDegreeNumber('abc')).toBe(false);
  expect(isDegreeNumber()).toBe(false);
  expect(isDegreeNumber(100)).toBe(false);
});

test('tests if valid inch number', () => {
  expect(isInchNumber('100"')).toBe(true);
  expect(isInchNumber('100in')).toBe(true);
  expect(isInchNumber('100inch')).toBe(true);
  expect(isInchNumber('100inches')).toBe(true);
  expect(isInchNumber('100 in')).toBe(true);
  expect(isInchNumber('100 inch')).toBe(true);
  expect(isInchNumber('100 inches')).toBe(true);
  expect(isInchNumber('100 deg')).toBe(false);
  expect(isInchNumber('100deg')).toBe(false);
  expect(isInchNumber('abc')).toBe(false);
  expect(isInchNumber()).toBe(false);
  expect(isInchNumber(100)).toBe(false);
});

test('returns valid degree value or null', () => {
  expect(degreeOrNull('100°')).toBe('100°');
  expect(degreeOrNull('100"')).toBe(null);
  expect(degreeOrNull()).toBe(null);
  expect(degreeOrNull('abc')).toBeNull();
});

test('returns valid inch value or null', () => {
  expect(inchOrNull('100"')).toBe('100"');
  expect(inchOrNull('100°')).toBe(null);
  expect(inchOrNull()).toBe(null);
  expect(inchOrNull('abc')).toBeNull();
});

test('returns valid number value or null', () => {
  expect(numberOrNull()).toBe(null);
  expect(numberOrNull('100"')).toBe(null);
  expect(numberOrNull('100°')).toBe(null);
  expect(numberOrNull('abc')).toBe(null);
  expect(numberOrNull(100)).toBe(100);
  expect(numberOrNull(-100)).toBe(-100);
});
