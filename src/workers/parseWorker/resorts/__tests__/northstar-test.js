import fs from 'fs';
import {
  parseNorthstarSnow,
  parseNorthstarLiftCounts,
  parseNorthstarLifts,
  parseNorthstarTrails,
  parseNorthstarTrailCounts,
} from '../northstar';
import { createHtmlParser } from '../../parserFactory';

test('fetches Northstar snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/northstar-weather.html.input`);

  const resortData = await createHtmlParser('snow', parseNorthstarSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: null,
      temperature: null,
      baseCondition: 'Packed Powder',
      newSnow: 0,
      snowDepthBase: null,
      snowDepthSummit: 35,
    },
  });
});

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createHtmlParser('snow', parseNorthstarSnow)('<html></html>');
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

test('fetches Northstar lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/northstar-lifts.html.input`);
  const resortData = await createHtmlParser('liftCounts', parseNorthstarLiftCounts)(htmlText);
  expect(resortData).toEqual({
    liftCounts: {
      total: 20,
      open: 0,
    },
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('liftCounts', parseNorthstarLiftCounts)('<html></html>');
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches Northstar trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/northstar-lifts.html.input`);
  const resortData = await createHtmlParser('trailCounts', parseNorthstarTrailCounts)(htmlText);
  expect(resortData).toEqual({
    trailCounts: {
      total: 100,
      open: 0,
    },
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trailCounts', parseNorthstarTrailCounts)('<html></html>');
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches Northstar lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/northstar-lifts.html.input`);
  const resortData = await createHtmlParser('lifts', parseNorthstarLifts)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('lifts', parseNorthstarLifts)('<html></html>');
  expect(resortData).toMatchObject({ lifts: [] });
});

test('fetches Northstar trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/northstar-lifts.html.input`);
  const resortData = await createHtmlParser('trails', parseNorthstarTrails)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trails', parseNorthstarTrails)('<html></html>');
  expect(resortData).toMatchObject({ trails: [] });
});
