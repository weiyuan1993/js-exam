import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from 'aws-exports';
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';

import 'antd/dist/antd.css';
import initErrorLogging from 'utils/sentry';

import route from './route';

import configureStore from './configureStore';
// import reducer from './reducers';
import './index.css';

// set amplify default config
Amplify.configure(awsConfig);

initErrorLogging();

// Create redux store
const initialState = {};
const store = configureStore(initialState);
const MOUNT_NODE = document.getElementById('root');

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   reducer,
//   /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
// );

// for graphql test
Auth.signIn('Admin', 'Admin@123456')
  .then(user => {
    console.log(user);
    Auth.currentSession()
      .then(data => console.log(data.getAccessToken().getJwtToken()))
      .catch(error => console.log(error));
  })
  .catch(error => console.log(error));

ReactDOM.render(<Provider store={store}>{route()}</Provider>, MOUNT_NODE);
