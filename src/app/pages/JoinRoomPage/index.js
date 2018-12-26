import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { List, Avatar } from 'antd';
import { listRooms } from 'app/utils/room';
import changeTab from 'app/actions/tab';
import { getRoomInfo } from 'app/actions/room';

import style from './JoinRoomPage.module.scss';

class JoinRoomPage extends React.Component {
  state = {
    roomList: [],
    isLoading: true
  };

  componentDidMount() {
    this.getRoomList();
  }

  getRoomList = async () => {
    const roomList = await listRooms();
    this.setState({ roomList, isLoading: false });
    console.log(roomList);
  };

  handleClickLink = roomId => {
    // this.props.actions.changeTab('dispatch');
    // this.props.actions.getRoomInfo(roomId);
  };

  render() {
    const { roomList, isLoading } = this.state;
    return (
      <List
        itemLayout="horizontal"
        dataSource={roomList}
        loading={isLoading}
        renderItem={item => (
          <Link
            to={`/admin/dispatch/${item.id}`}
            onClick={() => this.handleClickLink(item.id)}
          >
            <List.Item
              style={{ borderBottom: '1px solid #ddd' }}
              className={style.listItem}
            >
              <List.Item.Meta
                avatar={<Avatar icon="home" className={style.avatar} />}
                title={<p>Room: {item.description}</p>}
                description={item.status}
              />
            </List.Item>
          </Link>
        )}
      />
    );
  }
}

export default withRouter(
  connect(
    state => {
      return {
        currentKey: state.tab.key
      };
    },
    dispatch => {
      return {
        actions: {
          changeTab: key => dispatch(changeTab(key)),
          getRoomInfo: id => dispatch(getRoomInfo(id))
        }
      };
    }
  )(JoinRoomPage)
);
