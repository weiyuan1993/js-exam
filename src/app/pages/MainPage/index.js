import React from 'react';
import { withRouter } from 'react-router-dom';

import JoinRoomPage from 'app/pages/JoinRoomPage/';
import CreatePage from 'app/pages/CreatePage';

import style from './MainPage.module.scss';

const MainPage = props => (
  <div className={style.Mainpage}>
    <div className={`${style.column} ${style.list}`}>
      <JoinRoomPage />
    </div>
    <div className={`${style.column} ${style.createRoom}`}>
      <CreatePage {...props} />
    </div>
  </div>
);

export default withRouter(MainPage);
