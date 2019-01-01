import { REQUEST, SUCCESS, FAILURE, RESET, CANCEL } from './constantsHelper';

const request = 'request';
const success = 'success';
const failure = 'failure';
const reset = 'reset';
const cancel = 'cancel';

/**
 * Creates action
 *
 * @param {string} type e.g. 'FETCH_USER_REQUEST'
 * @param {string} argNames e.g. 'id'
 * @return {function} e.g. (id) => { type: 'FETCH_USER_REQUEST', id }
 */
export function makeActionCreator(type, ...argNames) {
  return function createAction(...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

/**
 * Creates action
 *
 * @param {object} actionType { REQUEST: 'FETCH_USER_REQUEST',
 *  SUCCESS: 'FETCH_USER_SUCCESS', FAILURE: 'FETCH_USER_FAILURE', RESET: 'FETCH_USER_RESET' }
 * @param {object} extraTypeAndAction { request: makeActionCreator('FETCH_USER_BY_GROUP', 'groupId') }
 * @return {object}
 *  {
 *    request: (id) => { type: FETCH_USER_REQUEST, id },
 *    success: (data) => { type: FETCH_USER_SUCCESS, data },
 *    failure: (error) => { type: FETCH_USER_FAILURE, error },
 *    reset: (data) => { type: FETCH_USER_RESET, data },
 *    cancel: () => { type: FETCH_USER_CANCEL },
 *  }
 */
export const makeBoilerplateAction = (
  actionType = {},
  extraTypeAndAction = {},
) => {
  const action = {};
  Object.keys(actionType).forEach(key => {
    if (key === REQUEST) {
      action[request] = makeActionCreator(actionType[key], 'id');
    } else if (key === SUCCESS) {
      action[success] = makeActionCreator(actionType[key], 'data');
    } else if (key === FAILURE) {
      action[failure] = makeActionCreator(actionType[key], 'error');
    } else if (key === RESET) {
      action[reset] = makeActionCreator(actionType[key], 'data');
    } else if (key === CANCEL) {
      action[cancel] = makeActionCreator(actionType[key]);
    }
  });
  // Setup extra type and action
  Object.keys(extraTypeAndAction).forEach(key => {
    action[key] = extraTypeAndAction[key];
  });
  return action;
};

/**
 * General action creator
 *
 * @param {string} type Action type
 * @param {object} payload Payload
 * @return {object}
 *
 */
export const action = (type, payload = {}) => ({ type, ...payload });

/**
 * Creates action types.
 *
 * @param {object} actionTypes { REQUEST: 'FETCH_USER_REQUEST',
 *  SUCCESS: 'FETCH_USER_SUCCESS', FAILURE: 'FETCH_USER_FAILURE', RESET: 'FETCH_USER_RESET' }
 * @return {object}
 *  {
 *    request: (id) => action(FETCH_USER_REQUEST, { id }),
 *    success: (data) => action(FETCH_USER_SUCCESS, { data }),
 *    failure: (error) => action(FETCH_USER_FAILURE, { error }),
 *    reset: () => action(FETCH_USER_RESET),
 *  }
 */
export const createActions = actionTypes =>
  [request, success, failure, reset, cancel].reduce((acc, type) => {
    const accTemp = acc;
    if (type === request) {
      accTemp[type] = params => action(actionTypes.REQUEST, params);
    } else if (type === success) {
      accTemp[type] = data => action(actionTypes.SUCCESS, { data });
    } else if (type === failure) {
      accTemp[type] = error => action(actionTypes.FAILURE, { error });
    } else if (type === reset) {
      accTemp[type] = () => action(actionTypes.RESET);
    } else if (type === cancel) {
      accTemp[type] = () => action(actionTypes.CANCEL);
    }
    return accTemp;
  }, {});
