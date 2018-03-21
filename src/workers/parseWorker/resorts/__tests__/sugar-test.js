import fs from 'fs';
import {
  parseSugarSnow,
  parseSugarLiftCounts,
  parseSugarTrailCounts,
  parseSugarLifts,
  parseSugarTrails,
} from '../sugar';
import { createHtmlParser } from '../../parserFactory';

test('fetches Sugar snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sugar-weather.html.input`);

  const resortData = await createHtmlParser('snow', parseSugarSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: 'open',
      weatherIcon: 'cloudy',
      temperature: 30,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: 57,
      snowDepthSummit: 122,
    },
  });
});

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createHtmlParser('snow', parseSugarSnow)('<html></html>');
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

test('fetches Sugar lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sugar-weather.html.input`);
  const resortData = await createHtmlParser('liftCounts', parseSugarLiftCounts)(htmlText);
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: 1,
    },
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('liftCounts', parseSugarLiftCounts)('<html></html>');
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches Sugar trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sierra-lifts.html.input`);
  const resortData = await createHtmlParser('trailCounts', parseSugarTrailCounts)(htmlText);
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trailCounts', parseSugarTrailCounts)('<html></html>');
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: null,
    },
  });
});
test('fetches Sugar lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sugar-weather.html.input`);
  const resortData = await createHtmlParser('lifts', parseSugarLifts)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('lifts', parseSugarLifts)('<html></html>');
  expect(resortData).toMatchObject({ lifts: [] });
});

test('fetches Sugar trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sugar-weather.html.input`);
  const resortData = await createHtmlParser('trails', parseSugarTrails)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trails', parseSugarTrails)('<html></html>');
  expect(resortData).toMatchObject({ trails: [] });
});
