import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import AwsConfig from 'aws-exports';

import AdminPage from 'app/pages/AdminPage';
import NotFoundPage from 'app/pages/NotFoundPage';

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


const Admin = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={AdminPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withAuthenticator(Admin);
