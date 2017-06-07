import fs from 'fs';
import { parseHomewoodWeather, parseHomewoodLifts, parseHomewoodTrails} from '../homewood';
import { createHtmlParser } from '../../parserFactory';

test('fetches Homewood weather data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/homewood-weather.html`);

  const resortData = await createHtmlParser('weather', parseHomewoodWeather)(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: null,
      weatherIcon: null,
      temprature: 72,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: 81,
      snowDepthSummit: 185,
    },
  });
})

test('fetches all null for nonexisting weather values', async () => {
  const resortData = await createHtmlParser('weather', parseHomewoodWeather)('<html></html>');
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

test('fetches Homewood lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/homewood-weather.html`);
  const resortData = await createHtmlParser('lifts', parseHomewoodLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseHomewoodLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Homewood trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/homewood-weather.html`);
  const resortData = await createHtmlParser('trails', parseHomewoodTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseHomewoodTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});
