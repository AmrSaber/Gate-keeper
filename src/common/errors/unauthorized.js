import httpStatus from 'http-status';
import { BaseError } from './base-error.js';

export class Unauthorized extends BaseError {
  constructor() {
    super('Unauthenticated', httpStatus.UNAUTHORIZED);
  }
}
