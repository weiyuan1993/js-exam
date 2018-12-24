import React from 'react';
import { Route } from 'react-router-dom';
import ExamPage from 'app/pages/ExamPage';

const Guest = ({ match }) => <Route exact path="/" component={ExamPage} />;

export default Guest;
