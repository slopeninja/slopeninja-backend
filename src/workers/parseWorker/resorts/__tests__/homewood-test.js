import fs from 'fs';
import {
  parseHomewoodSnow,
  parseHomewoodLifts,
  parseHomewoodLiftList,
  parseHomewoodTrailList,
  parseHomewoodTrails
} from '../homewood';
import { createHtmlParser, createJSONParser } from '../../parserFactory';

test('fetches Homewood snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/homewood-weather.html.input`);

  const resortData = await createHtmlParser('snow', parseHomewoodSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
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

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createHtmlParser('snow', parseHomewoodSnow)('<html></html>');
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

test('fetches Homewood lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/homewood-weather.html.input`);
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
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/homewood-weather.html.input`);
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

test('fetches Homewood lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/homewood-weather.html.input`);
  const resortData = await createHtmlParser('liftList', parseHomewoodLiftList)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('liftList', parseHomewoodLiftList)('<html></html>');
  expect(resortData).toMatchObject({ liftList: [] });
});

test('fetches Homewood trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/homewood-weather.html.input`);
  const resortData = await createHtmlParser('trailList', parseHomewoodTrailList)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trailList', parseHomewoodTrailList)('<html></html>');
  expect(resortData).toMatchObject({ trailList: [] });
});
