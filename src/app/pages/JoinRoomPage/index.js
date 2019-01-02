import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import { List, Avatar } from 'antd';

import { listRooms } from 'graphql/queries.js';
import { onCreateRoom } from 'graphql/subscriptions.js';
import { getRoomInfo } from 'app/actions/room';

import style from './JoinRoomPage.module.scss';

class JoinRoomPage extends React.Component {
  handleClickLink = roomId => {
    this.props.actions.getRoomInfo(roomId);
  }

  render() {
    const RoomList = ({ rooms, isLoading }) => (
      <div className={style.listColumn}>
        <List
          itemLayout="horizontal"
          dataSource={rooms}
          loading={isLoading}
          renderItem={item => (
            <Link
              to={{
                pathname: `/admin/dispatch/${item.id}`
              }}
              onClick={() => this.handleClickLink(item.id)}
            >
              <List.Item style={{ borderBottom: '1px solid #ddd' }} className={style.listItem}>
                <List.Item.Meta
                  avatar={
                    <Avatar icon="home" className={style.avatar} />
                  }
                  title={
                    <>
                      <div className={style.roomName}>{item.description}</div>
                    </>
                  }
                  description={
                    <>
                      <div className={style.subjectId}>{item.subjectId}</div>
                    </>
                  }
                />
                <div className={style.roomStatus}>{item.status}</div>
              </List.Item>
            </Link>
          )}
        />
      </div>
    );
    return (
      <Connect
        query={graphqlOperation(listRooms, { limit: 1000 })}
        subscription={graphqlOperation(onCreateRoom)}
        onSubscriptionMsg={(prev, { onCreateRoom }) => {
          console.log('prev:', prev);
          console.log('Subscription data:', onCreateRoom);
          prev.listRooms.items.unshift(onCreateRoom);
          return prev;
        }}
      >
        {({ data: { listRooms }, loading, error }) => {
          console.log(listRooms);
          if (error) return (<h3>Error</h3>);
          if (loading || !listRooms) return (<RoomList isLoading={loading} />);
          return (<RoomList rooms={listRooms.items} isLoading={loading} />);
        }}
      </Connect>
    );
  }
}

export default withRouter(
  connect(
    null,
    dispatch => {
      return {
        actions: {
          getRoomInfo: id => dispatch(getRoomInfo(id))
        }
      };
    }
  )(JoinRoomPage)
);
