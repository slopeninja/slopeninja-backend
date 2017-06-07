import fs from 'fs';
import { parseNorthstarWeather, parseNorthstarLifts, parseNorthstarTrails } from '../northstar';
import { createHtmlParser } from '../../parserFactory';

test('fetches Northstar weather data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/northstar-weather.html`);

  const resortData = await createHtmlParser('weather', parseNorthstarWeather)(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: 'closed',
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: 2,
      snowDepthBase: null,
      snowDepthSummit: 0,
    },
  });
})

test('fetches all null for nonexisting weather values', async () => {
  const resortData = await createHtmlParser('weather', parseNorthstarWeather)('<html></html>');
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

test('fetches Northstar lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/northstar-lifts.html`);
  const resortData = await createHtmlParser('lifts', parseNorthstarLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: 20,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseNorthstarLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Northstar trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/northstar-lifts.html`);
  const resortData = await createHtmlParser('trails', parseNorthstarTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: 100,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseNorthstarTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});
