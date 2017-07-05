import fs from 'fs';
import {
  parseNVRoadCondition,
} from '../nevada';
import { createHtmlParser } from '../../parserFactory';

const SOURCE_URL = 'http://remotehost/some/source';

test('parses road and chain condition correctly I80', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/NVIncidents.html.input`);

  const resortData = await createHtmlParser('highway80', parseNVRoadCondition('I', '80'))(htmlText, SOURCE_URL);
  expect(resortData).toEqual({
    highway80: {
      prefix: 'I',
      number: '80',
      sourceUrl: SOURCE_URL,
      status: 'incident',
      chainStatus: null,
    }
  });
});

test('parses road and chain condition correctly SR289', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/NVIncidents.html.input`);

  const resortData = await createHtmlParser('highway289', parseNVRoadCondition('NV', '289'))(htmlText, SOURCE_URL);
  expect(resortData).toEqual({
    highway289: {
      prefix: 'NV',
      number: '289',
      sourceUrl: SOURCE_URL,
      status: 'closed',
      chainStatus: null,
    }
  });
});

test('parses road and chain condition correctly for highways that have no reported incidents', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/NVIncidents.html.input`);

  const resortData = await createHtmlParser('highway380', parseNVRoadCondition('NV', '380'))(htmlText, SOURCE_URL);
  expect(resortData).toEqual({
    highway380: {
      prefix: 'NV',
      number: '380',
      sourceUrl: SOURCE_URL,
      status: 'open',
      chainStatus: null,
    }
  });
});
