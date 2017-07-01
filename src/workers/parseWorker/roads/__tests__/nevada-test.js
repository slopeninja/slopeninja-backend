import fs from 'fs';
import {
  parseNVRoadCondition,
  filterNevadaHighway,
} from '../nevada';
import { createTextParser } from '../../parserFactory';

test('parses road and chain condition correctly I80', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/NVIncidents.html.input`);

  const resortData = await createTextParser('highway80', parseNVRoadCondition, filterNevadaHighway('I80'))(htmlText);
  expect(resortData).toEqual({
    highway80: {
      status: 'incident',
      chainStatus: null,
    }
  });
});

test('parses road and chain condition correctly SR289', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/NVIncidents.html.input`);

  const resortData = await createTextParser('highway289', parseNVRoadCondition, filterNevadaHighway('SR289'))(htmlText);
  expect(resortData).toEqual({
    highway289: {
      status: 'closed',
      chainStatus: null,
    }
  });
});

test('parses road and chain condition correctly SR289', async () => {
  const htmlText = fs.readFileSync(`${__dirname}/__fixtures__/NVIncidents.html.input`);

  const resortData = await createTextParser('highway380', parseNVRoadCondition, filterNevadaHighway('SR380'))(htmlText);
  expect(resortData).toEqual({
    highway380: {
      status: 'open',
      chainStatus: null,
    }
  });
});
