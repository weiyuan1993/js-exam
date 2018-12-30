import React from 'react';

import JoinRoomPage from 'pages/JoinRoomPage/';
import CreatePage from 'pages/CreatePage';

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

export default MainPage;
