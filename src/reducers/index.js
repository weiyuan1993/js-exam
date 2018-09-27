import { combineReducers } from 'redux';
import code from './code';
import login from './login';

const reducer = combineReducers({
  code,
  login
});

export default reducer;
