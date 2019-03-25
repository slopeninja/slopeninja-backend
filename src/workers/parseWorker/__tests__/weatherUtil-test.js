import {
  isNumber,
  parseDegreeNumber,
  parseInchNumber,
  degreeOrNull,
  inchOrNull,
  numberOrNull,
  parseTrailLevel,
  parseLiftTrailStatus,
  parseResortStatus,
  liftTrailStatusOrNull,
  resortStatusOrNull,
  weatherStatusOrNull,
  notEmptyStringOrNull,
  removeNumberInFrontOfName,
} from '../weatherUtil';

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

test('returns valid trail level', () => {
  expect(parseTrailLevel()).toBe(null);
  expect(parseTrailLevel('black')).toBe('advanced');
  expect(parseTrailLevel('difficult')).toBe('advanced');
  expect(parseTrailLevel('mostdifficult')).toBe('advanced');
  expect(parseTrailLevel('type_1')).toBe('beginner');
  expect(parseTrailLevel('type_3')).toBe('advanced');
  expect(parseTrailLevel('double')).toBe('expert');
  expect(parseTrailLevel('2')).toBe('intermediate');
  expect(parseTrailLevel('1')).toBe('beginner');
  expect(parseTrailLevel('abc')).toBe(null);
  expect(parseTrailLevel(100)).toBe(null);
  expect(parseTrailLevel('type_2')).toBe('intermediate');
  expect(parseTrailLevel('100')).toBe(null);
  expect(parseTrailLevel('http://sugar3.sugarbowl.com/tahoe/178/site/graphics/2016site/icons/conditions/icon_beginner.png')).toBe('beginner');
});

test('returns valid trail lift status', () => {
  expect(parseLiftTrailStatus()).toBe(null);
  expect(parseLiftTrailStatus('open')).toBe('open');
  expect(parseLiftTrailStatus('closed')).toBe('closed');
  expect(parseLiftTrailStatus('true')).toBe('open');
  expect(parseLiftTrailStatus('false')).toBe('closed');
  expect(parseLiftTrailStatus('abc')).toBe(null);
  expect(liftTrailStatusOrNull('100')).toBe(null);
  expect(liftTrailStatusOrNull('0')).toBe('closed');
  expect(liftTrailStatusOrNull('1')).toBe('open');
  expect(parseLiftTrailStatus(100)).toBe(null);
  expect(parseLiftTrailStatus('status_1')).toBe('open');
  expect(parseLiftTrailStatus('pending')).toBe('on hold');
  expect(parseLiftTrailStatus('yesStatus')).toBe('open');
  expect(parseLiftTrailStatus('icon-status_open')).toBe('open');
  expect(parseLiftTrailStatus('icon-status_close')).toBe('closed');
});

test('returns valid resort status', () => {
  expect(parseResortStatus()).toBe(null);
  expect(parseResortStatus('open')).toBe('open');
  expect(parseResortStatus('closed')).toBe('closed');
  expect(parseResortStatus('true')).toBe('open');
  expect(parseResortStatus('false')).toBe('closed');
  expect(parseResortStatus('abc')).toBe(null);
  expect(parseResortStatus(100)).toBe(null);
  expect(parseResortStatus('100')).toBe(null);
  expect(parseResortStatus('pending')).toBe(null);
});

test('returns valid trail lift status or null', () => {
  expect(liftTrailStatusOrNull()).toBe(null);
  expect(liftTrailStatusOrNull('100')).toBe(null);
  expect(liftTrailStatusOrNull('abc')).toBe(null);
  expect(liftTrailStatusOrNull('open')).toBe('open');
  expect(liftTrailStatusOrNull('closed')).toBe('closed');
  expect(liftTrailStatusOrNull('close')).toBe('closed');
  expect(parseResortStatus('true')).toBe('open');
  expect(parseResortStatus('false')).toBe('closed');
  expect(liftTrailStatusOrNull('yes')).toBe('open');
  expect(liftTrailStatusOrNull(100)).toBe(null);
  expect(liftTrailStatusOrNull(-100)).toBe(null);
});

test('returns valid resort status or null', () => {
  expect(resortStatusOrNull()).toBe(null);
  expect(resortStatusOrNull('100')).toBe(null);
  expect(resortStatusOrNull('abc')).toBe(null);
  expect(resortStatusOrNull('open')).toBe('open');
  expect(resortStatusOrNull('closed')).toBe('closed');
  expect(resortStatusOrNull('close')).toBe('closed');
  expect(resortStatusOrNull('yes')).toBe('open');
  expect(resortStatusOrNull(100)).toBe(null);
  expect(resortStatusOrNull(-100)).toBe(null);
});

test('returns valid weather status or null', () => {
  expect(weatherStatusOrNull()).toBe(null);
  expect(weatherStatusOrNull('rain')).toBe('rain');
  expect(weatherStatusOrNull('clear-day')).toBe('clear-day');
  expect(weatherStatusOrNull('open')).toBe(null);
  expect(weatherStatusOrNull('closed')).toBe(null);
  expect(weatherStatusOrNull('close')).toBe(null);
  expect(weatherStatusOrNull('yes')).toBe(null);
  expect(weatherStatusOrNull(100)).toBe(null);
  expect(weatherStatusOrNull(-100)).toBe(null);
});

test('returns a not emprty string or null', () => {
  expect(notEmptyStringOrNull()).toBe(null);
  expect(notEmptyStringOrNull('rain')).toBe('rain');
  expect(notEmptyStringOrNull('clear-day')).toBe('clear-day');
  expect(notEmptyStringOrNull('open')).toBe('open');
  expect(notEmptyStringOrNull('sleet')).toBe('sleet');
  expect(notEmptyStringOrNull('')).toBe(null);
  expect(notEmptyStringOrNull(-100)).toBe(null);
});

test('removes the first index and returns a string or null', () => {
  expect(removeNumberInFrontOfName()).toBe(null);
  expect(removeNumberInFrontOfName('1 rain')).toBe('rain');
  expect(removeNumberInFrontOfName('567 clear-day')).toBe('clear-day');
  expect(removeNumberInFrontOfName('')).toBe(null);
  expect(removeNumberInFrontOfName(-100)).toBe(null);
});
