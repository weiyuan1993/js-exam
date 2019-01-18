import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { List, Avatar } from 'antd';
import style from './RoomList.module.scss';

const RoomList = ({ rooms, isLoading }) => (
  <List
    itemLayout="horizontal"
    dataSource={rooms}
    loading={isLoading}
    renderItem={room => (
      <Link
        to={{
          pathname: `/admin/dispatch/${room.id}`,
        }}
      >
        <List.Item
          style={{ borderBottom: '1px solid #ddd' }}
          className={style.listItem}
        >
          <List.Item.Meta
            avatar={<Avatar icon="home" className={style.avatar} />}
            title={
              <div>
                <div className={style.roomNameHeader}>Room </div>
                <div className={style.roomName}>{room.description}</div>
              </div>
            }
            description={
              <div>
                <div className={style.subjectIdHeader}>Candidate </div>
                <div className={style.subjectId}>{room.subjectId}</div>
              </div>
            }
          />
        </List.Item>
      </Link>
    )}
  />
);

RoomList.propTypes = {
  rooms: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default RoomList;
