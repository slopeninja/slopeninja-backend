import fs from 'fs';
import { parseHeavenlySnow, parseHeavenlyLifts, parseHeavenlyTrails } from '../heavenly';
import { createHtmlParser, createJSONParser } from '../../parserFactory';

test('fetches Heavenly snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/heavenly-weather.html`);

  const resortData = await createHtmlParser('snow', parseHeavenlySnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
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

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createHtmlParser('snow', parseHeavenlySnow)('<html></html>');
  expect(resortData).toEqual({
    snow: {
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
