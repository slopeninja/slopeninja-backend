import fs from 'fs';
import {
  parseKirkwoodSnow,
  parseKirkwoodLifts,
  parseKirkwoodLiftList,
  parseKirkwoodTrailList,
  parseKirkwoodTrails
} from '../kirkwood';
import { createHtmlParser } from '../../parserFactory';

test('fetches Kirkwood snow data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/kirkwood-weather.html.input`);

  const resortData = await createHtmlParser('snow', parseKirkwoodSnow)(htmlText);
  expect(resortData).toEqual({
    snow: {
      status: 'closed',
      weatherIcon: null,
      temprature: null,
      baseCondition: null,
      newSnow: 10,
      snowDepthBase: null,
      snowDepthSummit: 1,
    },
  });
})

test('fetches all null for nonexisting snow values', async () => {
  const resortData = await createHtmlParser('snow', parseKirkwoodSnow)('<html></html>');
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

test('fetches Kirkwood lifts data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/kirkwood-lifts.html.input`);
  const resortData = await createHtmlParser('lifts', parseKirkwoodLifts)(htmlText);
  expect(resortData).toEqual({
    lifts: {
      total: 15,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting lift values', async () => {
  const resortData = await createHtmlParser('lifts', parseKirkwoodLifts)('<html></html>');
  expect(resortData).toEqual({
    lifts: {
      total: null,
      open: null,
    }
  });
});

test('fetches Kirkwood trails data correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/kirkwood-lifts.html.input`);
  const resortData = await createHtmlParser('trails', parseKirkwoodTrails)(htmlText);
  expect(resortData).toEqual({
    trails: {
      total: 86,
      open: 0,
    }
  });
});

test('fetches all null for nonexisting trails values', async () => {
  const resortData = await createHtmlParser('trails', parseKirkwoodTrails)('<html></html>');
  expect(resortData).toEqual({
    trails: {
      total: null,
      open: null,
    }
  });
});

test('fetches Kirkwood lift list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/kirkwood-lifts.html.input`);
  const resortData = await createHtmlParser('liftList', parseKirkwoodLiftList)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('liftList', parseKirkwoodLiftList)('<html></html>');
  expect(resortData).toMatchObject({ liftList: [] });
});

test('fetches Kirkwood trail list correctly', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/fixtures/kirkwood-lifts.html.input`);
  const resortData = await createHtmlParser('trailList', parseKirkwoodTrailList)(htmlText);
  expect(resortData).toMatchSnapshot();
});

test('fetches all null for nonexisting lift list values', async () => {
  const resortData = await createHtmlParser('trailList', parseKirkwoodTrailList)('<html></html>');
  expect(resortData).toMatchObject({ trailList: [] });
});
