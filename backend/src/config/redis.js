const { createClient } = require('redis');

const redisClient = createClient({
  legacyMode: true,
  url: `redis://${process.env.REDIS_USER_NAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_PUBLIC_ENDPOINT}`,
});
redisClient
  .connect()
  .then(() => console.log(`Redis Connected: redis[s]://[[username][:password]@][host][:port][/db-number]`))
  .catch((error) => console.log('🚀 ~ file: redis.js ~ line 10 ~ error', error));

module.exports = redisClient;
