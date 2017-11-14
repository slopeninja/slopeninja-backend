import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL;

const client = new Redis(REDIS_URL);

export default client;
