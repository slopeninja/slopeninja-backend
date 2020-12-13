import fs from 'fs';
import { parseCARoadCondition } from '../california';
import { createHtmlParser } from '../../parserFactory';

const SOURCE_URL = 'http://remotehost/some/source';

test('parses road and chain condition correctly US50', async () => {
  const text = fs.readFileSync(`${__dirname}/__fixtures__/US50CA.html.input`);

  const resortData = await createHtmlParser('highway50', parseCARoadCondition('US', '50'))(text, SOURCE_URL);
  expect(resortData).toEqual({
    highway50: {
      prefix: 'US',
      number: '50',
      sourceUrl: SOURCE_URL,
      status: null,
      chainStatus: 'R2',
    },
  });
});

test('parses road and chain condition closed correctly SR2', async () => {
  const text = fs.readFileSync(`${__dirname}/__fixtures__/SR2CA.html.input`);

  const resortData = await createHtmlParser('highway2', parseCARoadCondition('CA', '2'))(text, SOURCE_URL);
  expect(resortData).toEqual({
    highway2: {
      prefix: 'CA',
      number: '2',
      sourceUrl: SOURCE_URL,
      status: 'ambiguous',
      chainStatus: null,
    },
  });
});

test('parses road and chain condition correctly I80', async () => {
  const text = fs.readFileSync(`${__dirname}/__fixtures__/I80CA.html.input`);

  const resortData = await createHtmlParser('highway80', parseCARoadCondition('I', '80'))(text, SOURCE_URL);
  expect(resortData).toEqual({
    highway80: {
      prefix: 'I',
      number: '80',
      sourceUrl: SOURCE_URL,
      status: 'open',
      chainStatus: 'R2',
    },
  });
});

test('parses road and chain condition correctly SR89', async () => {
  const text = fs.readFileSync(`${__dirname}/__fixtures__/SR89CA.html.input`);

  const resortData = await createHtmlParser('highway89', parseCARoadCondition('CA', '89'))(text, SOURCE_URL);
  expect(resortData).toEqual({
    highway89: {
      prefix: 'CA',
      number: '89',
      sourceUrl: SOURCE_URL,
      status: 'closed',
      chainStatus: 'R2',
    },
  });
});

test('parses road and chain condition incident correctly SR88', async () => {
  const text = fs.readFileSync(`${__dirname}/__fixtures__/SR88CA.html.input`);

  const resortData = await createHtmlParser('highway88', parseCARoadCondition('CA', '88'))(text, SOURCE_URL);
  expect(resortData).toEqual({
    highway88: {
      prefix: 'CA',
      number: '88',
      sourceUrl: SOURCE_URL,
      status: null,
      chainStatus: 'R2',
    },
  });
});

test('parses road and chain condition open correctly SR87', async () => {
  const text = fs.readFileSync(`${__dirname}/__fixtures__/SR87CA.html.input`);

  const resortData = await createHtmlParser('highway87', parseCARoadCondition('CA', '87'))(text, SOURCE_URL);
  expect(resortData).toEqual({
    highway87: {
      prefix: 'CA',
      number: '87',
      sourceUrl: SOURCE_URL,
      status: 'open',
      chainStatus: null,
    },
  });
});
