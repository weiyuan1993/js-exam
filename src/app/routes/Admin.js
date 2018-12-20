import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import MainPage from 'app/pages/MainPage';
import DispatchPage from 'app/pages/QuestionPage/DispatchPage';
import AddAndEditPage from 'app/pages/QuestionPage/AddAndEditPage';
import JoinRoomPage from 'app/pages/JoinRoomPage/';
import TabWidget from 'app/components/Widgets/TabWidget';

const Admin = ({ match }) => (
  <div>
    <TabWidget/>
  <Switch>
    <Route exact path={`${match.path}`} render={(props) => <MainPage {...props} />} />
    <Route exact path={`${match.path}admin/dispatch/:roomId`} render={(props) => <DispatchPage {...props} />} />
    <Route exact path={`${match.path}admin/add`} render={() => <AddAndEditPage type="add" />} />
    <Route exact path={`${match.path}admin/edit`} render={() => <AddAndEditPage type="edit" />} />
  </Switch>
  </div>
);

export default withRouter(Admin);
