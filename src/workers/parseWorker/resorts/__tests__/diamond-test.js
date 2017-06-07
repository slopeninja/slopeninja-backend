import fs from 'fs';
import { parseDiamondWeather, parseDiamondLifts, parseDiamondTrails } from '../diamond';
import { createHtmlParser } from '../../parserFactory';

test('fetches Diamond weather data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/diamond-weather.html`);

  const resortData = await createHtmlParser('weather', parseDiamondWeather)(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: 'closed',
      weatherIcon: 'clear',
      temprature: 66,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: 84,
      snowDepthSummit: 132,
    },
  });
})

test('fetches all null for nonexisting weather values', async () => {
  const resortData = await createHtmlParser('weather', parseDiamondWeather)('<html></html>');
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

test('fetches Diamond lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/diamond-weather.html`);
  const resortData = await createHtmlParser('lifts', parseDiamondLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseDiamondLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Diamond trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/diamond-weather.html`);
  const resortData = await createHtmlParser('trails', parseDiamondTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseDiamondTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});
