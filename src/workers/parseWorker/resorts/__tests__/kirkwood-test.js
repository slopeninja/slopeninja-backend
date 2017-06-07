import fs from 'fs';
import { parseKirkwoodWeather, parseKirkwoodLifts, parseKirkwoodTrails } from '../kirkwood';
import { createHtmlParser } from '../../parserFactory';

test('fetches Kirkwood weather data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/kirkwood-weather.html`);

  const resortData = await createHtmlParser('weather', parseKirkwoodWeather)(htmlText);
  expect(resortData).toEqual({
    weather: {
      status: 'closed',
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: 10,
      snowDepthBase: null,
      snowDepthSummit: 1,
    },
  });
})

test('fetches all null for nonexisting weather values', async () => {
  const resortData = await createHtmlParser('weather', parseKirkwoodWeather)('<html></html>');
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

test('fetches Kirkwood lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/kirkwood-lifts.html`);
  const resortData = await createHtmlParser('lifts', parseKirkwoodLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: 15,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseKirkwoodLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Kirkwood trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/kirkwood-lifts.html`);
  const resortData = await createHtmlParser('trails', parseKirkwoodTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: 86,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseKirkwoodTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});
