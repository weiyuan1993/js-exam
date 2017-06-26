import { combineReducers } from 'redux';
import code from './code';
import firebase from './firebase';

const reducer = combineReducers({
  code,
  firebase,
});

export default reducer;
