import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from 'containers/App';
import ExamPage from 'containers/ExamPage';
import MainPage from 'containers/MainPage';
import DispatchPage from 'containers/QuestionPage/DispatchPage';
import PlaybackPage from 'containers/PlayBackPage';
import AddAndEditPage from 'containers/QuestionPage/AddAndEditPage';
import NotFoundPage from 'containers/NotFoundPage';
import CandidateListPage from 'containers/CandidateListPage';

const { PUBLIC_URL } = process.env;

export default () => (
  <Router basename={PUBLIC_URL}>
    <App>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route
          exact
          path="/admin/dispatch/:roomId"
          component={DispatchPage}
        />
        <Route
          exact
          path="/admin/playback/:testId"
          component={PlaybackPage}
        />
        <Route
          exact
          path="/admin/add"
          render={props => <AddAndEditPage {...props} type="add" />}
        />
        <Route
          exact
          path="/admin/edit"
          render={props => <AddAndEditPage {...props} type="edit" />}
        />
        <Route
          exact
          path="/admin/candidates"
          component={CandidateListPage}
        />
        <Route exact path="/exam/:roomId" component={ExamPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </App>
  </Router>
);
