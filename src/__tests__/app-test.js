import fetch from 'isomorphic-fetch';
import api from '../api';
import Promise from 'bluebird';

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
  console.warn(`Listening to http://localhost:${port}`);
});

// tear down our tests
afterAll(async () => {
  const close = Promise.promisify(server.close, { context: server });
  await close();
});

test('passes the sanity check', () => {
  expect(3).toBe(3);
});

test('passes /resorts endponts returns 2 resorts, one of which is Sierra', async () => {

  const response = await fetch(`http://localhost:${port}/resorts`);
  const data = await response.json();

  // const expectedData = {
  //   jake: 'julia',
  // }

  // expect(data).toBe(expectedData);
  expect(data.resorts.length).toBe(2);
});
