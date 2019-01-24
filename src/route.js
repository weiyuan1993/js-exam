import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ExamPage from 'containers/ExamPage';
import MainPage from 'containers/MainPage';
import DispatchPage from 'containers/DispatchPage';
import PlaybackPage from 'containers/PlayBackPage';
import EditQuestionPage from 'containers/EditQuestionPage';
import NotFoundPage from 'containers/NotFoundPage';
import PrivateRoute from 'components/PrivateRoute';
import CandidateListPage from 'containers/CandidateListPage';

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
        render={props => <EditQuestionPage {...props} type="add" />}
      />
      <PrivateRoute
        exact
        path="/admin/edit"
        render={props => <EditQuestionPage {...props} type="edit" />}
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
