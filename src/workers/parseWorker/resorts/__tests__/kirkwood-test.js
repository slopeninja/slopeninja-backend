import fs from 'fs';
import {
  parseKirkwoodSnow,
  parseKirkwoodLiftCounts,
  parseKirkwoodLifts,
  parseKirkwoodTrails,
  parseKirkwoodTrailCounts,
} from '../kirkwood';
import { createHtmlParser } from '../../parserFactory';

test('fetches Kirkwood snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/kirkwood-weather.html.input`);

  const resortData = await createHtmlParser('snow', parseKirkwoodSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: null,
      temperature: null,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: null,
      snowDepthSummit: 0,
    },
  });
});

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createHtmlParser('snow', parseKirkwoodSnow)('<html></html>');
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

test('fetches Kirkwood lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/kirkwood-lifts.html.input`);
  const resortData = await createHtmlParser('liftCounts', parseKirkwoodLiftCounts)(htmlText);
  expect(resortData).toEqual({
    liftCounts: {
      total: 15,
      open: 0,
    },
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('liftCounts', parseKirkwoodLiftCounts)('<html></html>');
  expect(resortData).toEqual({
    liftCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches Kirkwood trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/kirkwood-lifts.html.input`);
  const resortData = await createHtmlParser('trailCounts', parseKirkwoodTrailCounts)(htmlText);
  expect(resortData).toEqual({
    trailCounts: {
      total: 86,
      open: 0,
    },
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trailCounts', parseKirkwoodTrailCounts)('<html></html>');
  expect(resortData).toEqual({
    trailCounts: {
      total: null,
      open: null,
    },
  });
});

test('fetches Kirkwood lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/kirkwood-lifts.html.input`);
  const resortData = await createHtmlParser('lifts', parseKirkwoodLifts)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('lifts', parseKirkwoodLifts)('<html></html>');
  expect(resortData).toMatchObject({ lifts: [] });
});

test('fetches Kirkwood trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/kirkwood-lifts.html.input`);
  const resortData = await createHtmlParser('trails', parseKirkwoodTrails)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trails', parseKirkwoodTrails)('<html></html>');
  expect(resortData).toMatchObject({ trails: [] });
});
