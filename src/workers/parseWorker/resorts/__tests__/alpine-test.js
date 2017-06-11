import fs from 'fs';
import {
  parseAlpineSnow,
  parseAlpineLifts,
  parseAlpineLiftList,
  parseAlpineTrailList,
  parseAlpineTrails,
} from '../alpine';
import { createHtmlParser } from '../../parserFactory';

test('fetches Alpine snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/squaw-weather.html`);

  const resortData = await createHtmlParser('snow', parseAlpineSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: null,
      snowDepthSummit: 161,
    },
  });
})

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createHtmlParser('snow', parseAlpineSnow)('<html></html>');
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

test('fetches Alpine lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/squaw-lifts.html`);
  const resortData = await createHtmlParser('lifts', parseAlpineLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseAlpineLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Alpine trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/squaw-lifts.html`);
  const resortData = await createHtmlParser('trails', parseAlpineTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseAlpineTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});

test('fetches Alpine lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/squaw-lifts.html`);
  const resortData = await createHtmlParser('liftList', parseAlpineLiftList)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('liftList', parseAlpineLiftList)('<html></html>');
  expect(resortData).toMatchObject({ liftList: [] });
});

test('fetches Alpine trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/squaw-lifts.html`);
  const resortData = await createHtmlParser('trailList', parseAlpineTrailList)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trailList', parseAlpineTrailList)('<html></html>');
  expect(resortData).toMatchObject({ trailList: [] });
});
