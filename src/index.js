import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from 'aws-exports';

import 'antd/dist/antd.css';
import initErrorLogging from 'utils/sentry';

import route from './route';

import configureStore from './redux/configureStore';
import './asset/css/index.css';

// set amplify default config
Amplify.configure(awsConfig);

initErrorLogging();

// Create redux store
const initialState = {};
const store = configureStore(initialState);
const MOUNT_NODE = document.getElementById('root');

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
