/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import formReducer from 'redux-form/es/reducer';

import login from 'models/login/reducer';
import room from 'models/room/reducer';
import record from 'models/record/reducer';
import question from 'models/question/reducer';
import code from 'models/code/reducer';
import _console from 'models/console/reducer';
import tape from 'models/tape/reducer';

/**
 * Merges the dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    login,
    room,
    record,
    question,
    code,
    _console,
    tape,
    form: formReducer,
    ...injectedReducers,
  });
}
