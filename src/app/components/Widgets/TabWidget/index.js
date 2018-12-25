import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { Menu, Icon } from 'antd';

const TabWidget = ({ location: { pathname }, room }) => {
  const currentKey = pathname.split('/')[2] || 'join';
  return (
    <Menu selectedKeys={[currentKey]} mode="horizontal">
      <Menu.Item key="join">
        <Link to="/">
          <Icon type="home" theme="filled" />
          Room
        </Link>
      </Menu.Item>
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
      {room.subjectId && (
        <Menu.Item style={{ float: 'right' }} key="subjectId">
          <Icon type="user" />
          {room.subjectId || 'UNSET'}
        </Menu.Item>
      )}
      {room.description && (
        <Menu.Item style={{ float: 'right' }} key="dispatch">
          <Link to={`/admin/dispatch/${room.id}`}>
            <Icon type="home" />
            {room.description || 'UNSET'}
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default withRouter(
  connect(state => {
    return {
      room: state.room
    };
  })(TabWidget)
);
