import fs from 'fs';
import {
  parseAlpineSnow,
  parseAlpineLiftCounts,
  parseAlpineLifts,
  parseAlpineTrails,
  parseAlpineTrailCounts,
} from '../alpine';
import { createHtmlParser } from '../../parserFactory';

test('fetches Alpine snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/squaw-weather.html.input`);

  const resortData = await createHtmlParser('snow', parseAlpineSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: null,
      temperature: null,
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
      temperature: null,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: null,
    }
  });
});

test('fetches Alpine lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/squaw-lifts.html.input`);
  const resortData = await createHtmlParser('liftCounts', parseAlpineLiftCounts)(htmlText);
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('liftCounts', parseAlpineLiftCounts)('<html></html>');
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Alpine trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/squaw-lifts.html.input`);
  const resortData = await createHtmlParser('trailCounts', parseAlpineTrailCounts)(htmlText);
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trailCounts', parseAlpineTrailCounts)('<html></html>');
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Alpine lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/squaw-lifts.html.input`);
  const resortData = await createHtmlParser('lifts', parseAlpineLifts)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('lifts', parseAlpineLifts)('<html></html>');
  expect(resortData).toMatchObject({ lifts: [] });
});

test('fetches Alpine trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/squaw-lifts.html.input`);
  const resortData = await createHtmlParser('trails', parseAlpineTrails)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trails', parseAlpineTrails)('<html></html>');
  expect(resortData).toMatchObject({ trails: [] });
});
