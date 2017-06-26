import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import authCheck from "./utils/authCheck";

import * as firebase from "firebase";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC7Z6ltGrL4xJ7cM4EiDRuG7yYU74OWti8",
  authDomain: "innova-ppol.firebaseapp.com",
  databaseURL: "https://innova-ppol.firebaseio.com",
  projectId: "innova-ppol",
  storageBucket: "innova-ppol.appspot.com",
  messagingSenderId: "38306620670"
};
const firebaseApp = firebase.initializeApp(config);
store.dispatch(
  require("./actions/firebase").initFirebase(firebaseApp)
);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
const AppWithAuth = authCheck(App);
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <AppWithAuth />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
