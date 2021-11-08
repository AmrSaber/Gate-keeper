import httpStatus from 'http-status'
import { BaseError } from './base-error.js'

export class Forbidden extends BaseError {
  constructor() {
    super('Unauthorized', httpStatus.FORBIDDEN)
  }
}