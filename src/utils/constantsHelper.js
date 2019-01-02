export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const RESET = 'RESET';
export const CANCEL = 'CANCEL';
export const PROGRESS = 'PROGRESS';
export const POLLING = 'POLLING';

/**
 * Creates action types.
 *
 * @param {string} base Entity name, e.g. 'FETCH_USER'
 * @return {object} { REQUEST: 'FETCH_USER_REQUEST', SUCCESS: 'FETCH_USER_SUCCESS',
 *                    FAILURE: 'FETCH_USER_FAILURE', RESET: 'FETCH_USER_RESET' }
 */
export const createRequestTypes = (base, ...extraTypes) => {
  const types = [REQUEST, SUCCESS, FAILURE, RESET, CANCEL].concat(extraTypes);
  return types.reduce((acc, type) => {
    const accTemp = acc;
    accTemp[type] = `${base}_${type}`;
    return accTemp;
  }, {});
};

/**
 * Creates action types.
 *
 * @param {string} baseName Entity name, e.g. 'FETCH_USER'
 * @param {array} types types, e.g. ['OPEN', 'CLOSE']
 * @return {object} { REQUEST: 'FETCH_USER_REQUEST', SUCCESS: 'FETCH_USER_SUCCESS',
 *                    FAILURE: 'FETCH_USER_FAILURE', RESET: 'FETCH_USER_RESET' }
 */
export const makeActionType = (
  baseName,
  types = [REQUEST, SUCCESS, FAILURE],
) => {
  if (Object.prototype.toString.call(types) !== '[object Array]') {
    throw new TypeError('Second parameter "types" is not array.');
  }
  return types.reduce((acc, type) => {
    const accTemp = acc;
    accTemp[type] = `${baseName}_${type}`;
    return accTemp;
  }, {});
};
