import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import TestPage from './components/TestPage/';
import MainPage from './components/MainPage/';
import LoginPage from './components/LoginPage';

const App = () => (
  <Router>
    <div>
      <Route exact path="/js-exam/test" component={TestPage} />
      <Route exact path="/js-exam/" component={MainPage} />
      <Route path="/js-exam/login" component={LoginPage} />
      <Route exact path="/" component={() => <Redirect to="/js-exam"/>}/>
    </div>
  </Router>
);

export default App;
