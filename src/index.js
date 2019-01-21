import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import awsConfig from 'aws-exports';
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';

import 'antd/dist/antd.css';
import initErrorLogging from 'utils/sentry';

import App from 'components/App';

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

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT_NODE,
);
