import fs from 'fs';
import {
  parseBorealSnow,
  parseBorealLiftCounts,
  parseBorealTrailCounts,
  parseBorealLifts,
  parseBorealTrails,
} from '../boreal';
import { createJSONParser, decodeEntities } from '../../parserFactory';

test('fetches Boreal snow data correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/boreal-weather.json.input`);

  const resortData = await createJSONParser('snow', parseBorealSnow, decodeEntities)(jsonText);
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: null,
      temperature: null,
      baseCondition: null,
      newSnow: 8,
      snowDepthBase: 130,
      snowDepthSummit: 135,
    },
  });
});

test('fetches all null for nonexisting values', async () => {
  const resortData = await createJSONParser('snow', parseBorealSnow, decodeEntities)('{}');
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

test('fetches all null for no data', async () => {
  const resortData = await createJSONParser('snow', parseBorealSnow, decodeEntities)();
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

test('fetches Boreal lifts data correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/boreal-weather.json.input`);
  const resortData = await createJSONParser('liftCounts', parseBorealLiftCounts, decodeEntities)(jsonText);
  expect(resortData).toEqual({
    liftCounts: {
      total: 8,
      open: 7,
    },
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createJSONParser('liftCounts', parseBorealLiftCounts, decodeEntities)('{}');
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches Boreal trails data correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/boreal-weather.json.input`);
  const resortData = await createJSONParser('trailCounts', parseBorealTrailCounts, decodeEntities)(jsonText);
  expect(resortData).toEqual({
    trailCounts: {
      total: 34,
      open: 28,
    },
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createJSONParser('trailCounts', parseBorealTrailCounts, decodeEntities)('{}');
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches Boreal lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/boreal-lifts.json.input`);
  const resortData = await createJSONParser('lifts', parseBorealLifts, decodeEntities)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createJSONParser('lifts', parseBorealLifts, decodeEntities)('{}');
  expect(resortData).toMatchObject({ lifts: [] });
});

test('fetches Boreal trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/boreal-trails.json.input`);
  const resortData = await createJSONParser('trails', parseBorealTrails, decodeEntities)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createJSONParser('trails', parseBorealTrails, decodeEntities)('{}');
  expect(resortData).toMatchObject({ trails: [] });
});
