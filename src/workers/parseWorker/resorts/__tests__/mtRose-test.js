import fs from 'fs';
import {
  parseMtRoseSnow,
  parseMtRoseLiftCounts,
  parseMtRoseTrailCounts,
  parseMtRoseLifts,
  parseMtRoseTrails,
} from '../mtRose';
import { createHtmlParser } from '../../parserFactory';

test('fetches MtRose snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/mtRose-weather.html.input`);

  const resortData = await createHtmlParser('snow', parseMtRoseSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: 'snow',
      temperature: 26,
      baseCondition: null,
      newSnow: 12,
      snowDepthBase: 240,
      snowDepthSummit: 302,
    },
  });
});

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createHtmlParser('snow', parseMtRoseSnow)('<html></html>');
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

test('fetches MtRose lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/mtRose-weather.html.input`);
  const resortData = await createHtmlParser('liftCounts', parseMtRoseLiftCounts)(htmlText);
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('liftCounts', parseMtRoseLiftCounts)('<html></html>');
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches MtRose trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/mtRose-weather.html.input`);
  const resortData = await createHtmlParser('trailCounts', parseMtRoseTrailCounts)(htmlText);
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trailCounts', parseMtRoseTrailCounts)('<html></html>');
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches MtRose lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/mtRose-weather.html.input`);
  const resortData = await createHtmlParser('lifts', parseMtRoseLifts)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('lifts', parseMtRoseLifts)('<html></html>');
  expect(resortData).toMatchObject({ lifts: [] });
});

test('fetches MtRose trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/mtRose-weather.html.input`);
  const resortData = await createHtmlParser('trails', parseMtRoseTrails)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trails', parseMtRoseTrails)('<html></html>');
  expect(resortData).toMatchObject({ trails: [] });
});
