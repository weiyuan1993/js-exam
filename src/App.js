import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import MainPage from './components/MainPage/';
import LoginPage from './components/LoginPage';

const App = () => (
  <Router>
    <div>
      <Route exact path="/js-exam/" component={MainPage} />
      <Route path="/js-exam/login" component={LoginPage} />
    </div>
  </Router>
)

export default App;