import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ExamPage from 'app/pages/ExamPage';
import NotFoundPage from 'app/pages/NotFoundPage';

const Guest = ({ match }) => (
  <Switch>
    <Route exact path="/" component={ExamPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Guest;
