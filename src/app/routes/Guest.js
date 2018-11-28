import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from 'app/pages/LoginPage';
import ExamPage from 'app/pages/ExamPage';
import NotFoundPage from 'app/pages/NotFoundPage';

const Guest = ({ match }) => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route path="/" component={ExamPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Guest;
