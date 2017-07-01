import fs from 'fs';
import {
  parseDiamondSnow,
  parseDiamondLiftCounts,
  parseDiamondLifts,
  parseDiamondTrails,
  parseDiamondTrailCounts
} from '../diamond';
import { createHtmlParser } from '../../parserFactory';

test('fetches Diamond snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/diamond-weather.html.input`);

  const resortData = await createHtmlParser('snow', parseDiamondSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: 'closed',
      weatherIcon: 'clear',
      temperature: 66,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: 84,
      snowDepthSummit: 132,
    },
  });
})

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createHtmlParser('snow', parseDiamondSnow)('<html></html>');
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

test('fetches Diamond lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/diamond-weather.html.input`);
  const resortData = await createHtmlParser('liftCounts', parseDiamondLiftCounts)(htmlText);
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('liftCounts', parseDiamondLiftCounts)('<html></html>');
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Diamond trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/diamond-weather.html.input`);
  const resortData = await createHtmlParser('trailCounts', parseDiamondTrailCounts)(htmlText);
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trailCounts', parseDiamondTrailCounts)('<html></html>');
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Diamond lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/diamond-weather.html.input`);
  const resortData = await createHtmlParser('lifts', parseDiamondLifts)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('lifts', parseDiamondLifts)('<html></html>');
  expect(resortData).toMatchObject({ lifts: [] });
});

test('fetches Diamond trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/diamond-weather.html.input`);
  const resortData = await createHtmlParser('trails', parseDiamondTrails)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trails', parseDiamondTrails)('<html></html>');
  expect(resortData).toMatchObject({ trails: [] });
});
