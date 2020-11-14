import fs from 'fs';
import {
  parseSierraSnow,
  parseSierraLiftCounts,
  parseSierraLifts,
  parseSierraTrails,
  parseSierraTrailCounts,
} from '../sierra';
import { createHtmlParser } from '../../parserFactory';

test('fetches Sierra snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sierra-weather.html.input`);

  const resortData = await createHtmlParser('snow', parseSierraSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: 'cloudy',
      temperature: 32,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: 17,
      snowDepthSummit: 20,
    },
  });
});

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createHtmlParser('snow', parseSierraSnow)('<html></html>');
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

test('fetches Sierra lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sierra-lifts.html.input`);
  const resortData = await createHtmlParser('liftCounts', parseSierraLiftCounts)(htmlText);
  expect(resortData).toEqual({
    liftCounts: {
      total: 14,
      open: 0,
    },
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('liftCounts', parseSierraLiftCounts)('<html></html>');
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches Sierra lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sierra-lifts.html.input`);
  const resortData = await createHtmlParser('lifts', parseSierraLifts)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('lifts', parseSierraLifts)('<html></html>');
  expect(resortData).toMatchObject({ lifts: [] });
});

test('fetches Sierra trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sierra-lifts.html.input`);
  const resortData = await createHtmlParser('trails', parseSierraTrails)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trails', parseSierraTrails)('<html></html>');
  expect(resortData).toMatchObject({ trails: [] });
});

test('fetches Sierra trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sierra-lifts.html.input`);
  const resortData = await createHtmlParser('trailCounts', parseSierraTrailCounts)(htmlText);
  expect(resortData).toEqual({
    trailCounts: {
      total: 46,
      open: 0,
    },
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trailCounts', parseSierraTrailCounts)('<html></html>');
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: null,
    },
  });
});
