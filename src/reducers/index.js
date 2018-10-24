import { combineReducers } from 'redux';
import code from './code';
import login from './login';
import _console from './console';

const reducer = combineReducers({
  code,
  login,
  console: _console
});

export default reducer;
