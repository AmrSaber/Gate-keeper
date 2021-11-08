import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import config from './config.js';
import { assertString } from './helpers.js';
import { getRedisInstance } from './redis.js';
import 'express-async-errors';
import { BaseError } from './errors/base-error.js';
import { Forbidden } from './errors/forbidden.js';
import { NotFound } from './errors/not-found.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.put('/api/keys', async (req, res) => {
  const { key, password, url } = req.body;
  assertString({ key });
  assertString({ password });
  assertString({ url });

  const redis = getRedisInstance();
  await redis.mset(`${key}:password`, password, `${key}:url`, url);

  res.status(httpStatus.OK).end();
});

app.delete('/api/keys/:key', async (req, res) => {
  const { key } = req.params;
  assertString({ key });

  const redis = getRedisInstance();
  await redis.del(`${key}:password`, `${key}:url`);

  res.status(httpStatus.OK).end();
});

app.get('/api/keys/:key', async (req, res) => {
  const { key } = req.params;
  const password = req.headers['x-password'];

  assertString({ key });
  assertString({ password });

  const redis = getRedisInstance();
  const [keyPassword, url] = await redis.mget(`${key}:password`, `${key}:url`);

  if (keyPassword == null || url == null) throw new NotFound('Key not found');
  if (password != keyPassword) throw new Forbidden();
  
  res.status(httpStatus.OK).json({ url });
});

app.use(express.static('public'));

app.use('*', (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({ message: `Cannot ${req.method} ${req.url}` });
});

app.use((error, req, res, next) => {
  if (error instanceof BaseError) {
    return res.status(error.status).json({ message: error.message });
  }

  console.log(error.message);
  console.log(error.stack);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: 'Something went wrong'});
});

app.listen(config.PORT, (err) => {
  if (err != null) console.error(err);
  else console.log('Working on port ' + config.PORT);
});