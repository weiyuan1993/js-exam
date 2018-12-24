import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { List, Avatar, Button, Skeleton } from 'antd';
import { listRooms } from 'app/utils/room';
import changeTab from 'app/actions/tab';
import { getRoomInfo } from 'app/actions/room';


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
    this.props.actions.changeTab('dispatch');
    this.props.actions.getRoomInfo(roomId);
  }

  render() {
    const { roomList, isLoading } = this.state;
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={roomList}
          loading={isLoading}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={
                  <>
                    <p>Room ID:</p>
                    <a href="https://ant.design">{item.description}</a>
                  </>
                }
                description={item.status}
              />
              <Link
                to={{
                  pathname: `/admin/dispatch/${item.id}`
                }}
                onClick={() => this.handleClickLink(item.id)}
              >
                <Button>Join</Button>
              </Link>
            </List.Item>
          )}
        />
      </div>
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
