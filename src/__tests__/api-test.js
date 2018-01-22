import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import uuid from 'uuid';
import statuses from 'statuses';

import api from '../api';

let server;
let port;

// setup our tests
beforeAll(async () => {
  // For promisify to work, the callback function should conform to node.js
  // convention of accepting a callback as last argument and calling that
  // callback with error as the first argument and success value on the
  // second argument.
  // const listen = Promise.promisify(api.listen, { context: api });
  server = await api.listen();
  /* eslint-disable prefer-destructuring */
  port = server.address().port;
  /* eslint-enable */
});

// tear down our tests
afterAll(async () => {
  const close = Promise.promisify(server.close, { context: server });
  await close();
  // await client.destroy();
});

test('passes the sanity check', () => {
  expect(3).toBe(3);
});

test.skip('returns 12 resorts, one of which is Squaw', async () => {
  const response = await fetch(`http://localhost:${port}/resorts`);
  const data = await response.json();

  expect(data.resorts).toHaveLength(12);

  const resort = data.resorts.find(r => r.shortName === 'squaw-valley');

  expect(resort).toBeDefined();
});

test.skip('returns a resort for a given resort shortName', async () => {
  const expectedResort = {
    location: 'Olympic Valley, CA 96146',
    name: 'Squaw Valley',
    shortName: 'squaw-valley',
  };

  const response = await fetch(`http://localhost:${port}/resorts/${expectedResort.shortName}`);
  const data = await response.json();

  expect(data.resort.location).toEqual(expectedResort.location);
  expect(data.resort.name).toEqual(expectedResort.name);
  expect(data.resort.shortName).toEqual(expectedResort.shortName);
});

test.skip('fails to return a resort for unknown resort id', async () => {
  const NON_EXISTING_RESORT_ID = '6f535c7a-aedd-409c-875b-09ee2181b3d7';
  const response = await fetch(`http://localhost:${port}/resorts/${NON_EXISTING_RESORT_ID}`);

  expect(response.status).toEqual(statuses('Not Found'));
});

test.skip('subscribes to newsletter with valid email', async () => {
  const dummyEmail = `${uuid.v4()}@slope.ninja`;
  const response = await fetch(`http://localhost:${port}/subscribers`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
    body: JSON.stringify({
      email: dummyEmail,
    }),
  });
  const data = await response.json();

  expect(data.email).toMatch(dummyEmail);
});

test('fails to subscribe to newsletter with invalid email', async () => {
  const response = await fetch(`http://localhost:${port}/subscribers`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
    body: JSON.stringify({
      email: 'xx@xx',
    }),
  });
  const data = await response.json();

  expect(response.status).toEqual(statuses('Bad Request'));
  expect(data.error).toEqual('child "email" fails because ["email" must be a valid email]');
});

test('fails to subscribe to newsletter with no email', async () => {
  const response = await fetch(`http://localhost:${port}/subscribers`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
    body: JSON.stringify({
      email: '',
    }),
  });
  const data = await response.json();

  expect(response.status).toEqual(statuses('Bad Request'));
  expect(data.error).toEqual('child "email" fails because ["email" is not allowed to be empty]');
});
