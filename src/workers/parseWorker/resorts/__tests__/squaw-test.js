import fs from 'fs';
import {
  parseSquawSnow,
  parseSquawLiftCounts,
  parseSquawLifts,
  parseSquawTrails,
  parseSquawTrailCounts,
} from '../squaw';
import { createHtmlParser } from '../../parserFactory';

test('fetches Squaw snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/squaw-weather.html.input`);

  const resortData = await createHtmlParser('snow', parseSquawSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: 'sunny',
      temperature: 52,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: null,
      snowDepthSummit: 161,
    },
  });
})

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createHtmlParser('snow', parseSquawSnow)('<html></html>');
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: null,
      temperature: null,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: null,
    }
  });
});

test('fetches Squaw lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/squaw-lifts.html.input`);
  const resortData = await createHtmlParser('liftCounts', parseSquawLiftCounts)(htmlText);
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: 1,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('liftCounts', parseSquawLiftCounts)('<html></html>');
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Squaw lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/squaw-lifts.html.input`);
  const resortData = await createHtmlParser('lifts', parseSquawLifts)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('lifts', parseSquawLifts)('<html></html>');
  expect(resortData).toMatchObject({ lifts: [] });
});

test('fetches Squaw trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/squaw-lifts.html.input`);
  const resortData = await createHtmlParser('trails', parseSquawTrails)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trails', parseSquawTrails)('<html></html>');
  expect(resortData).toMatchObject({ trails: [] });
});


test('fetches Squaw trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/squaw-lifts.html.input`);
  const resortData = await createHtmlParser('trailCounts', parseSquawTrailCounts)(htmlText);
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trailCounts', parseSquawTrailCounts)('<html></html>');
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: null,
    }
  });
});
