import fs from 'fs';
import { parseSierraWeather, parseSierraLifts, parseSierraTrails} from '../sierra';
import { createHtmlParser } from '../../parserFactory';

test('fetches Sierra weather data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/sierra-weather.html`);

  const resortData = await createHtmlParser('weather', parseSierraWeather)(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: null,
      weatherIcon: 'sunny',
      temprature: 43,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: 110,
      snowDepthSummit: 211,
    }
  });
})

test('fetches all null for nonexisting weather values', async () => {
  const resortData = await createHtmlParser('weather', parseSierraWeather)('<html></html>');
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

test('fetches Sierra lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/sierra-lifts.html`);
  const resortData = await createHtmlParser('lifts', parseSierraLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: 14,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseSierraLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Sierra trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/sierra-lifts.html`);
  const resortData = await createHtmlParser('trails', parseSierraTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: 46,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseSierraTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});
