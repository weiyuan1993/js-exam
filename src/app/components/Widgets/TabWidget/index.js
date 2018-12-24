import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { Menu, Icon } from 'antd';

const TabWidget = ({ location: { pathname }, roomId }) => {
  const currentKey = pathname.split('/')[2] || 'join';
  return (
    <Menu selectedKeys={[currentKey]} mode="horizontal">
      <Menu.Item key="join">
        <Link to="/">
          <Icon type="home" />
          Room
        </Link>
      </Menu.Item>
      <Menu.Item key="dispatch" disabled={!roomId}>
        <Link to={`/admin/dispatch/${roomId}`}>
          <Icon type="eye" />
          Dispatch
        </Link>
      </Menu.Item>
      <Menu.Item key="add">
        <Link to="/admin/add">
          <Icon type="file-add" />
          Add
        </Link>
      </Menu.Item>
      <Menu.Item key="edit">
        <Link to="/admin/edit">
          <Icon type="edit" />
          Edit
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(
  connect(state => {
    return {
      roomId: state.room.id
    };
  })(TabWidget)
);
