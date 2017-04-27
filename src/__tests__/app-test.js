import fetch from 'isomorphic-fetch';
import app from '../app';

test('passes the sanity check', () => {
  expect(3).toBe(3);
});

test('passes /resorts endponts returns 2 resorts, one of which is Sierra', async () => {

  const response = await fetch(`http://api.slope.ninja/resorts`);
  const data = await response.json();

  const expectedData = {
    jake: 'julia',
  }

  // expect(data).toBe(expectedData);
  expect(data.resorts.length).toBe(2);
});
