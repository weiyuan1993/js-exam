import React from 'react';
import { withRouter } from 'react-router-dom';

import JoinRoomPage from 'app/pages/JoinRoomPage/';
// import SearchBox from 'app/Selectors/SearchBox';

import style from './MainPage.module.scss';

const MainPage = () => (
  <div>
    <div className={`${style.column} ${style.list}`}>
      <JoinRoomPage />
    </div>
    <div className={`${style.column} ${style.createRoom}`}>
      <p> put create room here</p>
    </div>
  </div>
);

export default withRouter(MainPage);
