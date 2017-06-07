import fs from 'fs';
import { parseBorealWeather, parseBorealLifts, parseBorealTrails } from '../boreal';
import { createJSONParser } from '../../parserFactory';

test('fetches Boreal weather data correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/fixtures/boreal-weather.json`);

  const resortData = await createJSONParser('weather', parseBorealWeather)(jsonText);
  expect(resortData).toEqual({
    weather: {
      status: 'closed',
      weatherIcon: null,
      temprature: 70,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: 170,
    },
  });
})

test('fetches all null for nonexisting values', async () => {
  const resortData = await createJSONParser('weather', parseBorealWeather)("{}");
  expect(resortData).toEqual({
    weather: {
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
  const resortData = await createJSONParser('weather', parseBorealWeather)();
  expect(resortData).toEqual({
    weather: {
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
  const jsonText = fs.readFileSync(`${__dirname}/fixtures/boreal-weather.json`);
  const resortData = await createJSONParser('lifts', parseBorealLifts)(jsonText);
  expect(resortData).toEqual({
    lifts: {
      total: 6,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createJSONParser('lifts', parseBorealLifts)("{}");
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Boreal trails data correctly', async () => {
  const jsonText = fs.readFileSync(`${__dirname}/fixtures/boreal-weather.json`);
  const resortData = await createJSONParser('trails', parseBorealTrails)(jsonText);
  expect(resortData).toEqual({
    trails: {
      total: 33,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createJSONParser('trails', parseBorealTrails)("{}");
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});
