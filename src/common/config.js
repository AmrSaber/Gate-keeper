import { config } from 'dotenv';

config();

export default {
  PORT: Number(process.env.PORT),
  REDIS_URI: process.env.REDIS_URI,
};
