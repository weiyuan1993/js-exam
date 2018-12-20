import React from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import { listRooms } from 'app/utils/room';

const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
];
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

  joinRoom = () => {};

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
                title={<><p>Room ID:</p><a href="https://ant.design">{item.description}</a></>}
                description={item.status}
              />
              <Button onClick={() => this.props.history.push(`/${item.id}`)}>
                Join
              </Button>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default JoinRoomPage;
