import Redis from 'ioredis';

// Prevents creating multiple connections during Next.js hot-reloads
const globalForRedis = global as unknown as { redis: Redis };

export const redis = globalForRedis.redis || new Redis(process.env.REDIS_URL || '');

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;