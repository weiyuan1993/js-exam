import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { Menu, Icon } from 'antd';

import changeTab from 'app/actions/tab';

class TabWidget extends React.Component {
  handleClick = e => {
    this.props.actions.changeTab(e.key);
  };

  render() {
    return (
      <>
        <Menu
          selectedKeys={[this.props.currentKey]}
          onClick={this.handleClick}
          mode="horizontal"
        >
          <Menu.Item key="join">
            <Link to="/">
              <Icon type="home" />
              Room
            </Link>
          </Menu.Item>
          <Menu.Item key="dispatch" disabled={!this.props.roomId}>
            <Link to={`/admin/dispatch/${this.props.roomId}`}>
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
      </>
    );
  }
}

export default withRouter(
  connect(
    state => {
      return {
        currentKey: state.tab.key,
        roomId: state.room.id
      };
    },
    dispatch => {
      return {
        actions: {
          changeTab: key => dispatch(changeTab(key))
        }
      };
    }
  )(TabWidget)
);
