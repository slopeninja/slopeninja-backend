import fs from 'fs';
import {
  parseHomewoodSnow,
  parseHomewoodLiftCounts,
  parseHomewoodLifts,
  parseHomewoodTrails,
  parseHomewoodTrailCounts,
} from '../homewood';
import { createHtmlParser } from '../../parserFactory';

test('fetches Homewood snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/homewood-weather.html.input`);

  const resortData = await createHtmlParser('snow', parseHomewoodSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: null,
      temperature: null,
      baseCondition: null,
      newSnow: 3,
      snowDepthBase: 4,
      snowDepthSummit: 8,
    },
  });
});

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createHtmlParser('snow', parseHomewoodSnow)('<html></html>');
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: null,
      temperature: null,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: null,
    },
  });
});

test('fetches Homewood lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/homewood-weather.html.input`);
  const resortData = await createHtmlParser('liftCounts', parseHomewoodLiftCounts)(htmlText);
  expect(resortData).toEqual({
    liftCounts: {
      total: 8,
      open: 0,
    },
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('liftCounts', parseHomewoodLiftCounts)('<html></html>');
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches Homewood trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/homewood-weather.html.input`);
  const resortData = await createHtmlParser('trailCounts', parseHomewoodTrailCounts)(htmlText);
  expect(resortData).toEqual({
    trailCounts: {
      total: 67,
      open: 0,
    },
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trailCounts', parseHomewoodTrailCounts)('<html></html>');
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches Homewood lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/homewood-weather.html.input`);
  const resortData = await createHtmlParser('lifts', parseHomewoodLifts)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('lifts', parseHomewoodLifts)('<html></html>');
  expect(resortData).toMatchObject({ lifts: [] });
});

test('fetches Homewood trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/homewood-weather.html.input`);
  const resortData = await createHtmlParser('trails', parseHomewoodTrails)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trails', parseHomewoodTrails)('<html></html>');
  expect(resortData).toMatchObject({ trails: [] });
});
