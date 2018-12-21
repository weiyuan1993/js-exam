import React, { Component } from 'react';
import { Icon } from 'antd';

import RoomList from 'app/components/RoomList';
// import SearchBox from 'app/Selectors/SearchBox';

import style from './MainPage.module.scss';

class MainPage extends Component {
  render () {
    return (
      <div>
        <div className={style.topnav}>

        </div>
        <div>
          <div className={[style.column, style.room].join(' ')}>
            <RoomList />
            <Icon type="plus-circle" className={style.plusCircle} theme="filled" />
          </div>
          <div className={style.column}>

          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
