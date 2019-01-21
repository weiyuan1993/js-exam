import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ExamPage from 'containers/ExamPage';
import MainPage from 'pages/MainPage';
import DispatchPage from 'pages/QuestionPage/DispatchPage';
import PlaybackPage from 'pages/PlayBackPage';
import AddAndEditPage from 'pages/QuestionPage/AddAndEditPage';
import NotFoundPage from 'pages/NotFoundPage';
import PrivateRoute from 'components/PrivateRoute';
import CandidateListPage from 'pages/CandidateListPage';

const { PUBLIC_URL } = process.env;

export default () => (
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
        path="/admin/playback/:testId"
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
        path="/admin/candidates"
        component={CandidateListPage}
      />
      <Route exact path="/exam/:roomId" component={ExamPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);
