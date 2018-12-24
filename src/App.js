import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import AwsConfig from 'aws-exports';

import ExamPage from 'app/pages/ExamPage';
import MainPage from 'app/pages/MainPage';
import DispatchPage from 'app/pages/QuestionPage/DispatchPage';
import AddAndEditPage from 'app/pages/QuestionPage/AddAndEditPage';
import NotFoundPage from 'app/pages/NotFoundPage';
import PrivateRoute from 'app/components/PrivateRoute';

const { PUBLIC_URL } = process.env;

// for graphql test
Amplify.configure(AwsConfig);
Auth.signIn('Admin', 'Admin@123456')
  .then(user => {
    console.log(user);
    Auth.currentSession()
      .then(data => console.log(data.getAccessToken().getJwtToken()))
      .catch(error => console.log(error));
  })
  .catch(error => console.log(error));

const App = () => (
  <Router basename={PUBLIC_URL}>
    <Switch>
      <PrivateRoute exact path="/" component={MainPage} />
      <PrivateRoute
        exact
        path="/admin/dispatch/:roomId"
        component={DispatchPage}
      />
      <PrivateRoute
        exact
        path="/admin/add"
        render={props => <AddAndEditPage {...props} type="add" />}
      />
      <PrivateRoute
        exact
        path="/admin/edit"
        render={props => <AddAndEditPage {...props} type="edit" />}
      />
      <Route exact path="/exam/:roomId" component={ExamPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default App;
