import fs from 'fs';
import {
  parseDonnerSnow,
  parseDonnerLifts,
  parseDonnerTrails,
  parseDonnerLiftList,
  parseDonnerTrailList,
} from '../donner';
import { createHtmlParser } from '../../parserFactory';

test('fetches Donner snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/donner-weather.html.input`);

  const resortData = await createHtmlParser('snow', parseDonnerSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: null,
    },
  });
})

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createHtmlParser('snow', parseDonnerSnow)('<html></html>');
  expect(resortData).toEqual({
    snow: {
      status: null,
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: null,
      snowDepthBase: null,
      snowDepthSummit: null,
    }
  });
});

test('fetches Donner lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/donner-weather.html.input`);
  const resortData = await createHtmlParser('lifts', parseDonnerLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseDonnerLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Donner trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/donner-weather.html.input`);
  const resortData = await createHtmlParser('trails', parseDonnerTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseDonnerTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});

test('fetches Donner lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/donner-weather.html.input`);
  const resortData = await createHtmlParser('liftList', parseDonnerLiftList)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('liftList', parseDonnerLiftList)('<html></html>');
  expect(resortData).toMatchObject({ liftList: [] });
});

test('fetches Donner trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/donner-weather.html.input`);
  const resortData = await createHtmlParser('trailList', parseDonnerTrailList)(htmlText);
  expect(resortData).toMatchObject({ trailList: [] });
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trailList', parseDonnerTrailList)('<html></html>');
  expect(resortData).toMatchObject({ trailList: [] });
});
