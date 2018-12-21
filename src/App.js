import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Admin from 'app/routes/Admin';
import Guest from 'app/routes/Guest';
import NotFoundPage from 'app/pages/NotFoundPage';
import MainPage from 'app/pages/MainPage';

const { PUBLIC_URL } = process.env;

const App = () => (
  <Router basename={PUBLIC_URL}>
    <div>
      <Switch>
        <Route path="/main" component={MainPage} />
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Guest} />
      </Switch>
    </div>
  </Router>
);

export default App;
