import fs from 'fs';
import {
  parseDiamondSnow,
  parseDiamondLifts,
  parseDiamondLiftList,
  parseDiamondTrailList,
  parseDiamondTrails
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
  const resortData = await createHtmlParser('lifts', parseDiamondLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseDiamondLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Diamond trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/diamond-weather.html.input`);
  const resortData = await createHtmlParser('trails', parseDiamondTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseDiamondTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});

test('fetches Diamond lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/diamond-weather.html.input`);
  const resortData = await createHtmlParser('liftList', parseDiamondLiftList)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('liftList', parseDiamondLiftList)('<html></html>');
  expect(resortData).toMatchObject({ liftList: [] });
});

test('fetches Diamond trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/diamond-weather.html.input`);
  const resortData = await createHtmlParser('trailList', parseDiamondTrailList)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trailList', parseDiamondTrailList)('<html></html>');
  expect(resortData).toMatchObject({ trailList: [] });
});
