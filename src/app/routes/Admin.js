import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Amplify,{Auth} from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import AwsConfig from 'aws-exports';

import QuestionAddPage from 'app/pages/QuestionPage/AddPage';
import QuestionEditPage from 'app/pages/QuestionPage/EditPage';
import AdminQuestionDispatchPage from 'app/pages/QuestionPage/AdminQuestionDispatchPage';
import NotFoundPage from 'app/pages/NotFoundPage';

Amplify.configure(AwsConfig);
Auth.signIn("Admin", "Admin@123456")
 .then(user => {
     const session = Amplify.Auth.currentSession()
 .then(s => {
   console.log(s.getAccessToken().getJwtToken());
 }).catch(e=>console.log(e));
   })
 .catch(err => console.log(err));
const Question = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/add`} component={QuestionAddPage} />
      <Route path={`${match.path}/edit`} component={QuestionEditPage} />
      <Route
        path={`${match.path}/dispatch`}
        component={AdminQuestionDispatchPage}
      />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

const Admin = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/question`} render={Question} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withAuthenticator(Admin);
