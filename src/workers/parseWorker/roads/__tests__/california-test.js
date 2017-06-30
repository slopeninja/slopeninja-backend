import fs from 'fs';
import {
  parseCARoadCondition,
} from '../california';
import { createTextParser } from '../../parserFactory';

test('parses road and chain condition correctly US50', async () => {
  const text = fs.readFileSync(`${__dirname}/__fixtures__/US50CA.txt.input`);

  const resortData = await createTextParser('highway50', parseCARoadCondition)(text);
  expect(resortData).toEqual({
    highway50: {
      status: 'incident',
      chainStatus: 'R1',
    }
  });
});

test('parses road and chain condition closed correctly SR2', async () => {
  const text = fs.readFileSync(`${__dirname}/__fixtures__/SR2CA.txt.input`);

  const resortData = await createTextParser('highway2', parseCARoadCondition)(text);
  expect(resortData).toEqual({
    highway2: {
      status: 'closed',
      chainStatus: null,
    }
  });
});

test('parses road and chain condition incident correctly SR88', async () => {
  const text = fs.readFileSync(`${__dirname}/__fixtures__/SR88CA.txt.input`);

  const resortData = await createTextParser('highway88', parseCARoadCondition)(text);
  expect(resortData).toEqual({
    highway88: {
      status: 'incident',
      chainStatus: null,
    }
  });
});

test('parses road and chain condition open correctly SR87', async () => {
  const text = fs.readFileSync(`${__dirname}/__fixtures__/SR87CA.txt.input`);

  const resortData = await createTextParser('highway87', parseCARoadCondition)(text);
  expect(resortData).toEqual({
    highway87: {
      status: 'open',
      chainStatus: null,
    }
  });
});
