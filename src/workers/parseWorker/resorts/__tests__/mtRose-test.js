import fs from 'fs';
import {
  parseMtRoseSnow,
  parseMtRoseLifts,
  parseMtRoseTrails,
  parseMtRoseLiftList,
  parseMtRoseTrailList,
} from '../mtRose';
import { createHtmlParser, createJSONParser } from '../../parserFactory';

test('fetches MtRose snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/mtRose-weather.html.input`);

  const resortData = await createHtmlParser('snow', parseMtRoseSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: 'closed',
      weatherIcon: 'sunny',
      temperature: 53,
      baseCondition: null,
      newSnow: 0,
      snowDepthBase: null,
      snowDepthSummit: null,
    },
  });
})

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
    }
  });
});

test('fetches MtRose lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/mtRose-weather.html.input`);
  const resortData = await createHtmlParser('lifts', parseMtRoseLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseMtRoseLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches MtRose trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/mtRose-weather.html.input`);
  const resortData = await createHtmlParser('trails', parseMtRoseTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseMtRoseTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});

test('fetches MtRose lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/mtRose-weather.html.input`);
  const resortData = await createHtmlParser('liftList', parseMtRoseLiftList)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('liftList', parseMtRoseLiftList)('<html></html>');
  expect(resortData).toMatchObject({ liftList: [] });
});

test('fetches MtRose trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/mtRose-weather.html.input`);
  const resortData = await createHtmlParser('trailList', parseMtRoseTrailList)(htmlText);
  expect(resortData).toMatchObject({ trailList: [] });
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trailList', parseMtRoseTrailList)('<html></html>');
  expect(resortData).toMatchObject({ trailList: [] });
});
