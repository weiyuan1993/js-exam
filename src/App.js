import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Admin from 'app/routes/Admin';

import NotFoundPage from 'app/pages/NotFoundPage';
import ExamPage from 'app/pages/ExamPage';

import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import AwsConfig from 'aws-exports';

const { PUBLIC_URL } = process.env;


// for graphql test
Amplify.configure(AwsConfig);
Auth.signIn("Admin", "Admin@123456")
 .then(user => {
     const session = Amplify.Auth.currentSession()
 .then(s => {
   console.log(s.getAccessToken().getJwtToken());
 }).catch(e=>console.log(e));
   })
 .catch(err => console.log(err));

const App = () => (
  <Router basename={PUBLIC_URL}>
    <div>
      <Switch>
        <Route exact path="/exam/:roomId" component={ExamPage} />
        <Route path="/" render={Admin} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default withAuthenticator(App);
