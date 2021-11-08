import httpStatus from 'http-status';
import { BaseError } from './base-error.js';

export class NotFound extends BaseError {
  constructor(message) {
    super(message, httpStatus.NOT_FOUND);
  }
}