import fs from 'fs';
import {
  parseAlpineSnow,
  parseAlpineLiftCounts,
  parseAlpineLifts,
  parseAlpineTrails,
  parseAlpineTrailCounts,
} from '../alpine';
import { createJSONParser } from '../../parserFactory';

test('fetches Alpine snow data correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/alpine-lifts.json.input`);
  const resortData = await createJSONParser('snow', parseAlpineSnow)(jsonText);

  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: 'cloudy',
      temperature: 43,
      baseCondition: 'Corn snow',
      newSnow: 0,
      snowDepthBase: 19,
      snowDepthSummit: 27,
    },
  });
});

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createJSONParser('snow', parseAlpineSnow)('{}');
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: null,
      temperature: null,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: null,
    },
  });
});

test('fetches Alpine lifts data correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/alpine-lifts.json.input`);
  const resortData = await createJSONParser('liftCounts', parseAlpineLiftCounts)(jsonText);

  expect(resortData).toEqual({
    liftCounts: {
      total: 12,
      open: 0,
    },
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createJSONParser('liftCounts', parseAlpineLiftCounts)('{}');
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches Alpine trails data correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/alpine-lifts.json.input`);
  const resortData = await createJSONParser('trailCounts', parseAlpineTrailCounts)(jsonText);

  expect(resortData).toEqual({
    trailCounts: {
      total: 115,
      open: 0,
    },
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createJSONParser('trailCounts', parseAlpineTrailCounts)('{}');
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches Alpine lift list correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/alpine-lifts.json.input`);
  const resortData = await createJSONParser('lifts', parseAlpineLifts)(jsonText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createJSONParser('lifts', parseAlpineLifts)('{}');

  expect(resortData).toMatchObject({ lifts: [] });
});

test('fetches Alpine trail list correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/alpine-lifts.json.input`);
  const resortData = await createJSONParser('trails', parseAlpineTrails)(jsonText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createJSONParser('trails', parseAlpineTrails)('{}');
  expect(resortData).toMatchObject({ trails: [] });
});
