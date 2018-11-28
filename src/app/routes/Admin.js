import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import AwsConfig from 'aws-exports';

import QuestionAddPage from 'app/pages/QuestionPage/AddPage';
import QuestionEditPage from 'app/pages/QuestionPage/EditPage';
import AdminQuestionDispatchPage from 'app/pages/QuestionPage/AdminQuestionDispatchPage/index_new';
import NotFoundPage from 'app/pages/NotFoundPage';

Amplify.configure(AwsConfig);

// Auth.signUp({
//   username: 'Admin',
//   password: 'Admin@123456',
//   attributes: {
//     email: 'test@innova.com'
//   }
// })
//   .then(data => console.log(data))
//   .catch(err => console.log(err));


// class Admin extends Component {
//   state = {
//     isLoading: true
//   }

//   render() {
//     const { isLoading, isLogin } = this.state;
//     const { match } = this.props;
//     return (
//       <Switch>
//         <Route path={`${match.path}/question`} component={QuestionPage} />
//         <Route component={NotFoundPage} />
//       </Switch>
//     );
//   }
// }

// const session = Amplify.Auth.currentSession()
//   .then(s => {
//     console.log(s.getAccessToken().getJwtToken());
//   });

const Question = ({ match }) => {
  console.log('#Question Admin/Question', match);
  // return (<div>test</div>);
  return (
    <Switch>
      <Route path={`${match.path}/add`} component={QuestionAddPage} />
      <Route path={`${match.path}/edit`} component={QuestionEditPage} />
      <Route path={`${match.path}/dispatch`} component={AdminQuestionDispatchPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

const Admin = ({ match }) => {
  console.log('#match Admin', match);
  return (
    <Switch>
      <Route path={`${match.path}/question`} render={Question} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default (Admin);
// export default withAuthenticator(Admin);
// export default (() => (<div> this is admin </div>));
