import Redis from 'ioredis';

const { REDIS_URL } = process.env;

const client = new Redis(REDIS_URL);

/* eslint-disable no-console */
client.on('connect', () => {
  console.log('Redis:connected');
});

client.on('ready', () => {
  console.log('Redis:ready');
});

client.on('error', (error) => {
  console.log('Redis:error');
  console.log(error);
  client.quit();
});
/* eslint-enable */

export default client;
