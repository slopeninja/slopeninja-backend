import {
  isNumber,
  parseDegreeNumber,
  parseInchNumber,
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
  expect(parseDegreeNumber('100°')).toBe(100);
  expect(parseDegreeNumber('abc')).toBeNaN();
  expect(parseDegreeNumber()).toBeNaN();
  expect(parseDegreeNumber(100)).toBeNaN();
});

test('tests if valid inch number', () => {
  expect(parseInchNumber('a"')).toBeNaN();
  expect(parseInchNumber('100"')).toBe(100);
  expect(parseInchNumber('100in')).toBe(100);
  expect(parseInchNumber('100inch')).toBe(100);
  expect(parseInchNumber('100inches')).toBe(100);
  expect(parseInchNumber('100 in')).toBe(100);
  expect(parseInchNumber('100 inch')).toBe(100);
  expect(parseInchNumber('100 inches')).toBe(100);
  expect(parseInchNumber('100 deg')).toBeNaN();
  expect(parseInchNumber('100deg')).toBeNaN();
  expect(parseInchNumber('abc')).toBeNaN();
  expect(parseInchNumber('')).toBeNaN();
  expect(parseInchNumber()).toBeNaN();
  expect(parseInchNumber(100)).toBeNaN();
});

test('returns valid degree value or null', () => {
  expect(degreeOrNull('100°')).toBe(100);
  expect(degreeOrNull('100"')).toBe(null);
  expect(degreeOrNull()).toBe(null);
  expect(degreeOrNull('abc')).toBeNull();
});

test('returns valid inch value or null', () => {
  expect(inchOrNull('100"')).toBe(100);
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
