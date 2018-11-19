import { combineReducers } from 'redux';
import code from './code';
import login from './login';
import _console from './console';
import questionDispatch from './questionDispatch';

const reducer = combineReducers({
  code,
  login,
  console: _console,
  questionDispatch
});

export default reducer;
