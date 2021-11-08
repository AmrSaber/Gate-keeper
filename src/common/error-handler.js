import httpStatus from 'http-status';
import { BaseError } from './errors/base-error.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {
  if (error instanceof BaseError) {
    return res.status(error.status).json({ message: error.message });
  }

  console.log(error.message); // eslint-disable-line no-console
  console.log(error.stack); // eslint-disable-line no-console
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
};
