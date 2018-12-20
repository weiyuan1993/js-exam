import React from 'react';
import { Link } from 'react-router-dom';

import { List, Avatar, Button, Skeleton } from 'antd';
import { listRooms } from 'app/utils/room';

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

  joinRoom = roomId => {};

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
              >
                Join
              </Link>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default JoinRoomPage;
