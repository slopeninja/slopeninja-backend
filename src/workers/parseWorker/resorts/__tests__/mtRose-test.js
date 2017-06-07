import fs from 'fs';
import { parseMtRoseWeather, parseMtRoseLifts, parseMtRoseTrails } from '../mtRose';
import { createHtmlParser } from '../../parserFactory';

test('fetches MtRose weather data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/mtRose-weather.html`);

  const resortData = await createHtmlParser('weather', parseMtRoseWeather)(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: 'closed',
      weatherIcon: 'sunny',
      temprature: 53,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: null,
      snowDepthSummit: null,
    },
  });
})

test('fetches all null for nonexisting weather values', async () => {
  const resortData = await createHtmlParser('weather', parseMtRoseWeather)('<html></html>');
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

test('fetches MtRose lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/mtRose-weather.html`);
  const resortData = await createHtmlParser('lifts', parseMtRoseLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseMtRoseLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches MtRose trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/mtRose-weather.html`);
  const resortData = await createHtmlParser('trails', parseMtRoseTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseMtRoseTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});
