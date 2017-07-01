import fs from 'fs';
import {
  parseCARoadCondition,
} from '../california';
import { createTextParser } from '../../parserFactory';

test('parses road and chain condition correctly US50', async () => {
  const text = fs.readFileSync(`${__dirname}/__fixtures__/US50CA.txt.input`);

  const resortData = await createTextParser('highway50', parseCARoadCondition('US', '50'))(text);
  expect(resortData).toEqual({
    highway50: {
      prefix: 'US',
      number: '50',
      status: 'incident',
      chainStatus: 'R1',
    }
  });
});

test('parses road and chain condition closed correctly SR2', async () => {
  const text = fs.readFileSync(`${__dirname}/__fixtures__/SR2CA.txt.input`);

  const resortData = await createTextParser('highway2', parseCARoadCondition('CA', '2'))(text);
  expect(resortData).toEqual({
    highway2: {
      prefix: 'CA',
      number: '2',
      status: 'closed',
      chainStatus: null,
    }
  });
});

test('parses road and chain condition incident correctly SR88', async () => {
  const text = fs.readFileSync(`${__dirname}/__fixtures__/SR88CA.txt.input`);

  const resortData = await createTextParser('highway88', parseCARoadCondition('CA', '88'))(text);
  expect(resortData).toEqual({
    highway88: {
      prefix: 'CA',
      number: '88',
      status: 'incident',
      chainStatus: null,
    }
  });
});

test('parses road and chain condition open correctly SR87', async () => {
  const text = fs.readFileSync(`${__dirname}/__fixtures__/SR87CA.txt.input`);

  const resortData = await createTextParser('highway87', parseCARoadCondition('CA', '87'))(text);
  expect(resortData).toEqual({
    highway87: {
      prefix: 'CA',
      number: '87',
      status: 'open',
      chainStatus: null,
    }
  });
});
