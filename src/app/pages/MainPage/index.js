import React from 'react';
import { withRouter } from 'react-router-dom';

import JoinRoomPage from 'app/pages/JoinRoomPage/';

const MainPage = () => (
  <div>
    <h1>Main Page</h1>
    <JoinRoomPage/>
  </div>
);

export default withRouter(MainPage);
