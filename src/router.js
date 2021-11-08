import { Router } from 'express';
import 'express-async-errors';
import httpStatus from 'http-status';
import { assertString } from './common/helpers.js';
import { getRedisInstance } from './common/redis.js';
import { Forbidden } from './common/errors/forbidden.js';
import { NotFound } from './common/errors/not-found.js';
import { adminAuth } from './common/middlewares/admin-auth.js';

export const router = new Router();

router.put('/keys', adminAuth, async (req, res) => {
  const { key, password, url } = req.body;
  assertString({ key });
  assertString({ password });
  assertString({ url });

  const redis = getRedisInstance();
  await redis.mset(`${key}:password`, password, `${key}:url`, url);

  res.status(httpStatus.OK).end();
});

router.delete('/keys/:key', adminAuth, async (req, res) => {
  const { key } = req.params;
  assertString({ key });

  const redis = getRedisInstance();
  await redis.del(`${key}:password`, `${key}:url`);

  res.status(httpStatus.OK).end();
});

router.get('/keys/:key', async (req, res) => {
  const { key } = req.params;
  const password = req.headers['x-password'];

  assertString({ key });
  assertString({ password });

  const redis = getRedisInstance();
  const [keyPassword, url] = await redis.mget(`${key}:password`, `${key}:url`);

  if (keyPassword == null || url == null) throw new NotFound('Key not found');
  if (password !== keyPassword) throw new Forbidden();

  res.status(httpStatus.OK).json({ url });
});
