import fs from 'fs';
import {
  parseBorealSnow,
  parseBorealLifts,
  parseBorealTrails,
  parseBorealLiftList,
  parseBorealTrailList,
} from '../boreal';
import { createJSONParser, decodeEntities } from '../../parserFactory';

test('fetches Boreal snow data correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/boreal-weather.json.input`);

  const resortData = await createJSONParser('snow', parseBorealSnow, decodeEntities)(jsonText);
  expect(resortData).toEqual({
    snow: {
      status: 'closed',
      weatherIcon: 'cloudy',
      temprature: 70,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: 170,
    },
  });
})

test('fetches all null for nonexisting values', async () => {
  const resortData = await createJSONParser('snow', parseBorealSnow, decodeEntities)("{}");
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: null,
    }
  });
});

test('fetches all null for no data', async () => {
  const resortData = await createJSONParser('snow', parseBorealSnow, decodeEntities)();
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: null,
    }
  });
});

test('fetches Boreal lifts data correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/boreal-weather.json.input`);
  const resortData = await createJSONParser('lifts', parseBorealLifts, decodeEntities)(jsonText);
  expect(resortData).toEqual({
    lifts: {
      total: 6,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createJSONParser('lifts', parseBorealLifts, decodeEntities)("{}");
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Boreal trails data correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/__fixtures__/boreal-weather.json.input`);
  const resortData = await createJSONParser('trails', parseBorealTrails, decodeEntities)(jsonText);
  expect(resortData).toEqual({
    trails: {
      total: 33,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createJSONParser('trails', parseBorealTrails, decodeEntities)("{}");
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});

test('fetches Boreal lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/boreal-lifts.json.input`);
  const resortData = await createJSONParser('liftList', parseBorealLiftList, decodeEntities)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createJSONParser('liftList', parseBorealLiftList, decodeEntities)("{}");
  expect(resortData).toMatchObject({ liftList: [] });
});

test('fetches Boreal trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/boreal-trails.json.input`);
  const resortData = await createJSONParser('trailList', parseBorealTrailList, decodeEntities)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createJSONParser('trailList', parseBorealTrailList, decodeEntities)("{}");
  expect(resortData).toMatchObject({ trailList: [] });
});
