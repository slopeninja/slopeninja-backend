import fs from 'fs';
import {
  parseSugarSnow,
  parseSugarLifts,
  parseSugarTrails,
  parseSugarLiftList,
  parseSugarTrailList,
 } from '../sugar';
import { createHtmlParser } from '../../parserFactory';

test('fetches Sugar snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sugar-weather.html.input`);

  const resortData = await createHtmlParser('snow', parseSugarSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: 'closed',
      weatherIcon: 'snow',
      temperature: 32,
      baseCondition: null,
      newSnow: 7,
      snowDepthBase: 87,
      snowDepthSummit: 195,
    }
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
    }
  });
});

test('fetches Sugar lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sugar-weather.html.input`);
  const resortData = await createHtmlParser('lifts', parseSugarLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseSugarLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Sugar trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sierra-lifts.html.input`);
  const resortData = await createHtmlParser('trails', parseSugarTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseSugarTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});
test('fetches Sugar lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sugar-weather.html.input`);
  const resortData = await createHtmlParser('liftList', parseSugarLiftList)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('liftList', parseSugarLiftList)('<html></html>');
  expect(resortData).toMatchObject({ liftList: [] });
});

test('fetches Sugar trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/sugar-weather.html.input`);
  const resortData = await createHtmlParser('trailList', parseSugarTrailList)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trailList', parseSugarTrailList)('<html></html>');
  expect(resortData).toMatchObject({ trailList: [] });
});
