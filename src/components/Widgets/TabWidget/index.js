import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

const TabWidget = ({
  location: { pathname },
}) => {
  const currentKey = pathname.split('/')[2] || 'room';
  return (
    <Menu selectedKeys={[currentKey]} mode="horizontal" theme="dark">
      <Menu.Item key="title">
        <Link to="/">
          <h2
            style={{
              display: 'inline',
              margin: '0 13px 0 13px',
              color: 'white',
            }}
          >
            JS-EXAM
          </h2>
        </Link>
      </Menu.Item>
      <Menu.Item key="room">
        <Link to="/">
          <Icon type="home" theme="filled" />
          Room
        </Link>
      </Menu.Item>
      <SubMenu
        key="library"
        title={
          <div>
            <Icon type="database" theme="filled" /> Library
          </div>
        }
      >
        <Menu.Item key="add">
          <Link to="/admin/add">
            <Icon type="file-add" theme="filled" />
            Add
          </Link>
        </Menu.Item>
        <Menu.Item key="edit">
          <Link to="/admin/edit">
            <Icon type="edit" theme="filled" />
            Edit
          </Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="candidates">
        <Link to="/admin/candidates">
          <Icon type="user" />
          Candidates
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(TabWidget);
