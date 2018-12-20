import React from 'react';
import { Menu, Tabs, Icon } from 'antd';

import DispatchPage from 'app/pages/QuestionPage/DispatchPage';
import AddAndEditPage from 'app/pages/QuestionPage/AddAndEditPage';
import MainPage from 'app/pages/MainPage';

const TabPane = Tabs.TabPane;

export default class TabWidget extends React.Component {
  state={
    activeKey:''
  }

  onTabClick = (activeKey) => {
    console.log(`${this.props.match.path}/${activeKey}`);
    this.setState({activeKey})
    this.props.history.push(`/admin/${activeKey}`);
  }

  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="mail">
            <Icon type="mail" />Navigation One
          </Menu.Item>
        </Menu>
      </div>



      // <Tabs defaultActiveKey="" activeKey={this.state.activeKey} onTabClick={this.onTabClick}>
      //   <TabPane tab={<span><Icon type="arrow-right" />Home</span>} key="">
      //     <MainPage />
      //   </TabPane>
      //   <TabPane tab={<span><Icon type="eye" />Dispatch</span>} key="dispatch">
      //     <DispatchPage {...this.props} />
      //   </TabPane>
      //   <TabPane tab={<span><Icon type="plus-circle" />Add</span>} key="add">
      //     <AddAndEditPage type="add" />
      //   </TabPane>
      //   <TabPane tab={<span><Icon type="edit" />Edit</span>} key="edit">
      //     <AddAndEditPage type="edit" />
      //   </TabPane>
      // </Tabs>
    );
  }
}
