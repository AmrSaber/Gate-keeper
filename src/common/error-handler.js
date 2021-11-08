import { BaseError } from './errors/base-error.js';

export const errorHandler = (error, req, res, next) => {
  if (error instanceof BaseError) {
    return res.status(error.status).json({ message: error.message });
  }

  console.log(error.message);
  console.log(error.stack);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: 'Something went wrong'});
}
