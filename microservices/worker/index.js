const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

const sub = redisClient.duplicate();

function fib(index) {
  if (!Number.isInteger(index) || index < 0 || index > 40) {
    throw new Error(`Invalid Fibonacci index: ${index}`);
  }

  if (index < 2) return 1;

  return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
  const index = Number(message);

  if (message === '' || !Number.isInteger(index) || index < 0 || index > 40) {
    console.error('Ignoring invalid index:', JSON.stringify(message));
    return;
  }

  redisClient.hset('values', index, fib(index));
});

sub.subscribe('insert');
