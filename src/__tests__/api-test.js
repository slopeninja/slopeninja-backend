import fetch from 'isomorphic-fetch';
import api from '../api';
import Promise from 'bluebird';
import { DB } from '../db/dummyDb';

let server;
let port;

// setup our tests
beforeAll(async () => {
  // For promisify to work, the callback function should conform to node.js
  // convention of accepting a callback as last argument and calling that
  // callback with error as the first argument and success value on the
  // second argument.
  const listen = Promise.promisify(api.listen, { context: api });
  server = await api.listen();
  port = server.address().port;
});

// tear down our tests
afterAll(async () => {
  const close = Promise.promisify(server.close, { context: server });
  await close();
});

test('passes the sanity check', () => {
  expect(3).toBe(3);
});

test('returns 2 resorts, one of which is Sierra', async () => {
  const response = await fetch(`http://localhost:${port}/resorts`);
  const data = await response.json();

  expect(data.resorts).toHaveLength(2);

  const resort = data.resorts.find(
    resort => resort.name === 'Sierra-at-Tahoe',
  );

  expect(resort).toBeDefined();
});

test('returns a resort for a given resort id', async () => {
  const expectedResort = DB.resorts[0];

  const response = await fetch(`http://localhost:${port}/resorts/${expectedResort.id}`);
  const data = await response.json();

  expect(data.resort).toEqual(expectedResort);
});
