import { combineReducers } from 'redux';
import javascript from './javascript';
import react from './react';
import login from './login';
import category from './category';
import tape from './tape';
import _console from './console';
import room from './room';
import record from './record';
import code from './code';
import question from './question';


const reducer = combineReducers({
  javascript,
  react,
  login,
  category,
  tape,
  console: _console,
  room,
  record,
  code,
  question
});

export default reducer;
