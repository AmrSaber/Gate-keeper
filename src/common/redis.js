import _ from 'lodash';
import Redis from 'ioredis';
import config from './config.js';

export const getRedisInstance = _.memoize(() => new Redis(config.REDIS_URI));