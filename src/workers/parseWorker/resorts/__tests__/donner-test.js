import fs from 'fs';
import { parseDonnerWeather, parseDonnerLifts, parseDonnerTrails } from '../donner';
import { createHtmlParser } from '../../parserFactory';

test('fetches Donner weather data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/donner-weather.html`);

  const resortData = await createHtmlParser('weather', parseDonnerWeather)(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: null,
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: null,
    },
  });
})

test('fetches all null for nonexisting weather values', async () => {
  const resortData = await createHtmlParser('weather', parseDonnerWeather)('<html></html>');
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

test('fetches Donner lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/donner-weather.html`);
  const resortData = await createHtmlParser('lifts', parseDonnerLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseDonnerLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Donner trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/donner-weather.html`);
  const resortData = await createHtmlParser('trails', parseDonnerTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseDonnerTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});
