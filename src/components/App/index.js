import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import AwsConfig from 'aws-exports';

import ExamPage from 'containers/ExamPage';
import MainPage from 'pages/MainPage';
import DispatchPage from 'pages/QuestionPage/DispatchPage';
import PlaybackPage from 'pages/PlayBackPage';
import AddAndEditPage from 'pages/QuestionPage/AddAndEditPage';
import NotFoundPage from 'pages/NotFoundPage';
import PrivateRoute from 'components/PrivateRoute';
import ArchivePage from 'pages/ArchivePage';

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
        path="/admin/playback"
        component={PlaybackPage}
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
      <PrivateRoute
        exact
        path="/admin/archive"
        component={ArchivePage}
      />
      <Route exact path="/exam/:roomId" component={ExamPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default App;
