import fs from 'fs';
import {
  parseSquawSnow,
  parseSquawLiftCounts,
  parseSquawLifts,
  parseSquawTrails,
  parseSquawTrailCounts,
} from '../squaw';
import { createJSONParser } from '../../parserFactory';

test('fetches Squaw snow data correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/squaw-lifts.json.input`);

  const resortData = await createJSONParser('snow', parseSquawSnow)(jsonText);
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: 'clear',
      temperature: 38,
      baseCondition: 'Corn snow',
      newSnow: 0,
      snowDepthBase: 18,
      snowDepthSummit: 27,
    },
  });
});

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createJSONParser('snow', parseSquawSnow)('{}');
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

test('fetches Squaw lifts data correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/squaw-lifts.json.input`);
  const resortData = await createJSONParser('liftCounts', parseSquawLiftCounts)(jsonText);
  expect(resortData).toEqual({
    liftCounts: {
      total: 27,
      open: 0,
    },
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createJSONParser('liftCounts', parseSquawLiftCounts)('{}');
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches Squaw trails data correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/squaw-lifts.json.input`);
  const resortData = await createJSONParser('trailCounts', parseSquawTrailCounts)(jsonText);

  expect(resortData).toEqual({
    trailCounts: {
      total: 177,
      open: 0,
    },
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createJSONParser('trailCounts', parseSquawTrailCounts)('{}');
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches Squaw lift list correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/squaw-lifts.json.input`);
  const resortData = await createJSONParser('lifts', parseSquawLifts)(jsonText);

  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createJSONParser('lifts', parseSquawLifts)('{}');
  expect(resortData).toMatchObject({ lifts: [] });
});

test('fetches Squaw trail list correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/squaw-lifts.json.input`);
  const resortData = await createJSONParser('trails', parseSquawTrails)(jsonText);

  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createJSONParser('trails', parseSquawTrails)('{}');
  expect(resortData).toMatchObject({ trails: [] });
});
