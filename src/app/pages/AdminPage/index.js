import React from 'react';

import { Tabs, Icon } from 'antd';

import DispatchPage from 'app/pages/QuestionPage/DispatchPage';
import QuestionAddPage from 'app/pages/QuestionPage/AddPage';
import QuestionEditPage from 'app/pages/QuestionPage/EditPage';

import './AdminPage.scss';

const TabPane = Tabs.TabPane;

export class AdminPage extends React.Component {
  state = {
    activeKey: this.props.location.hash || '#dispatch'
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.location.hash !== this.props.location.hash) {
      this.setState({ activeKey: nextProps.location.hash });
    }
    return true;
  }

  onTabClick = (activeKey) => {
    this.setState({ activeKey });
    window.location.hash = activeKey;
  }

  render() {
    return (
      <div>
        <Tabs activeKey={this.state.activeKey} onTabClick={this.onTabClick}>
          <TabPane tab={<span><Icon type="eye" />Dispatch</span>} key="#dispatch">
            <DispatchPage />
          </TabPane>
          <TabPane tab={<span><Icon type="plus-circle" />Add</span>} key="#add">
            <QuestionAddPage />
          </TabPane>
          <TabPane tab={<span><Icon type="edit" />Edit</span>} key="#edit">
            <QuestionEditPage />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default AdminPage;
