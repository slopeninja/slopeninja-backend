import fs from 'fs';
import { parseSugarWeather, parseSugarLifts } from '../sugar';
import { createHtmlParser } from '../../parserFactory';

test('fetches Sugar data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/sugar-weather.html`);

  const resortData = await createHtmlParser('weather', parseSugarWeather)(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: 'closed',
      weatherIcon: null,
      temprature: 32,
      baseCondition: null,
      newSnow: 7,
      snowDepthBase: 87,
      snowDepthSummit: 195,
    },
  });
})

test('fetches all null for nonexisting weather values', async () => {
  const resortData = await createHtmlParser('weather', parseSugarWeather)('<html></html>');
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

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseSugarLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});
