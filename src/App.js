import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import MainPage from './components/MainPage/';
import LoginPage from './components/LoginPage';
import ReactPage from './components/ReactPage';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={MainPage} />
      <Route path="/react" component={ReactPage} />
      <Route path="/login" component={LoginPage} />
    </div>
  </Router>
)

export default App;
