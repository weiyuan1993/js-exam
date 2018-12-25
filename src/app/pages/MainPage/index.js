import React from 'react';
import { withRouter } from 'react-router-dom';

import JoinRoomPage from 'app/pages/JoinRoomPage/';
import CreatePage from 'app/pages/CreatePage';
// import SearchBox from 'app/Selectors/SearchBox';

import style from './MainPage.module.scss';

const MainPage = () => (
  <div className={style.Mainpage}>
    <div className={`${style.column} ${style.list}`}>
      <JoinRoomPage />
    </div>
    <div className={`${style.column} ${style.createRoom}`}>
      <CreatePage />
    </div>
  </div>
);

export default withRouter(MainPage);
