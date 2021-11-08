import config from '../config.js';
import { Unauthorized } from '../errors/unauthorized.js';

export const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const adminToken = config.ADMIN_TOKEN;
  if (authHeader !== `Bearer ${adminToken}`) throw new Unauthorized();
  next();
};
