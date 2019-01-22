import React from 'react';
import { List, Avatar } from 'antd';

import style from './comment.module.scss';

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

const CommentArea = ({ comments }) => {
  return (
    <div className={style.commentarea}>
      <h4>Comments</h4>
      <div className={style.comments}>
        {comments ? (
          <List
            itemLayout="horizontal"
            dataSource={comments.items}
            renderItem={item => (
              <ListItem className={style.listItem}>
                <ListItemMeta
                  className={style.listMeta}
                  avatar={<Avatar className={style.avatar} icon="user" />}
                  title={item.author}
                  description={item.content}
                />
              </ListItem>
            )}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CommentArea;
