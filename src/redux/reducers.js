/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import formReducer from 'redux-form/es/reducer';

import login from 'redux/login/reducer';
import room from 'redux/room/reducer';
import record from 'redux/record/reducer';
import question from 'redux/question/reducer';
import code from 'redux/code/reducer';
import consoleMsg from 'redux/consoleMsg/reducer';
import tape from 'redux/tape/reducer';
import history from 'redux/history/reducer';

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
    consoleMsg,
    tape,
    history,
    form: formReducer,
    ...injectedReducers,
  });
}
