/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import formReducer from 'redux-form/es/reducer';

import javascript from '_reducers/javascript';
import react from '_reducers/react';
import login from '_reducers/login';
import category from '_reducers/category';
import tape from '_reducers/tape';
import _console from '_reducers/console';
import tab from '_reducers/tab';
import room from '_reducers/room';
import record from '_reducers/record';
import code from '_reducers/code';
import question from '_reducers/question';

/**
 * Merges the dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    javascript,
    react,
    login,
    category,
    tape,
    console: _console,
    tab,
    room,
    record,
    code,
    question,
    form: formReducer,
    ...injectedReducers,
  });
}
