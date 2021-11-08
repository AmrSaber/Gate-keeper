import _ from 'lodash'
import { BadRequest } from './errors/bad-request.js';

export const assertString = (wrapper) => {
  const [key, value] = _.first(Object.entries(wrapper));
  if (!_.isString(value) || value == null || value == '')
    throw new BadRequest(`${key} is required and must be string`);
}
