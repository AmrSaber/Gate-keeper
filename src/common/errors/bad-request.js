import httpStatus from 'http-status';
import { BaseError } from './base-error.js';

export class BadRequest extends BaseError {
  constructor(message) {
    super(message, httpStatus.BAD_REQUEST);
  }
}