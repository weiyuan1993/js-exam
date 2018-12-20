import React from 'react';
import { Route, Switch } from 'react-router-dom';
import queryString from 'query-string';
import { Tabs, Icon } from 'antd';

import DispatchPage from 'app/pages/QuestionPage/DispatchPage';
import AddAndEditPage from 'app/pages/QuestionPage/AddAndEditPage';
import JoinRoomPage from 'app/pages/JoinRoomPage/';

import './AdminPage.scss';

const TabPane = Tabs.TabPane;

export class AdminPage extends React.Component {
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.location.hash !== this.props.location.hash) {
  //     this.setState({ activeKey: nextProps.location.hash });
  //   }
  //   return true;
  // }

  onTabClick = (activeKey) => {
    // this.setState({ activeKey });
    //window.location.hash = activeKey;
    this.props.history.push(`${this.props.match.path}/${activeKey}`);
  }

  render() {
    const { match } = this.props;
    return (
      <div id="AdminPage">
        <Switch>
          <Tabs defaultActiveKey="join-room" onTabClick={this.onTabClick}>
            <TabPane tab={<span><Icon type="arrow-right" />Join Room</span>} key="join-room">
              <Route path={`${match.path}/join-room`} render={props => <JoinRoomPage {...props} />} />
            </TabPane>
            <TabPane tab={<span><Icon type="eye" />Dispatch</span>} key="dispatch">
              <Route path={`${match.path}/dispatch/:roomId`} render={props => <DispatchPage {...props} />} />
            </TabPane>
            <TabPane tab={<span><Icon type="plus-circle" />Add</span>} key="add">
              <Route path={`${match.path}/add`} render={props => <AddAndEditPage type="add" {...props} />} />
            </TabPane>
            <TabPane tab={<span><Icon type="edit" />Edit</span>} key="edit">
              <Route path={`${match.path}/edit`} render={props => <AddAndEditPage type="edit" {...props} />} />
            </TabPane>
          </Tabs>
        </Switch>

      </div>
    );
  }
}
export default AdminPage;
