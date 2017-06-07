import fs from 'fs';
import { parseHeavenlyWeather, parseHeavenlyLifts, parseHeavenlyTrails } from '../heavenly';
import { createHtmlParser } from '../../parserFactory';

test('fetches Heavenly weather data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/heavenly-weather.html`);

  const resortData = await createHtmlParser('weather', parseHeavenlyWeather)(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: 'closed',
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: null,
      snowDepthSummit: 0,
    },
  });
})

test('fetches all null for nonexisting weather values', async () => {
  const resortData = await createHtmlParser('weather', parseHeavenlyWeather)('<html></html>');
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

test('fetches Heavenly lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/heavenly-weather.html`);
  const resortData = await createHtmlParser('lifts', parseHeavenlyLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseHeavenlyLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Heavenly trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/heavenly-weather.html`);
  const resortData = await createHtmlParser('trails', parseHeavenlyTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseHeavenlyTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});
