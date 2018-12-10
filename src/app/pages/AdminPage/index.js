import React from 'react';

import { Tabs, Icon } from 'antd';

import DispatchPage from 'app/pages/QuestionPage/DispatchPage';
import QuestionAddPage from 'app/pages/QuestionPage/AddPage';
import QuestionEditPage from 'app/pages/QuestionPage/EditPage';

import './AdminPage.scss';

const TabPane = Tabs.TabPane;

const AdminPage = () => (
  <div>
    <Tabs defaultActiveKey="1">
      <TabPane tab={<span><Icon type="eye" />Dispatch</span>} key="1">
        <DispatchPage />
      </TabPane>
      <TabPane tab={<span><Icon type="plus-circle" />Add</span>} key="2">
        <QuestionAddPage />
      </TabPane>
      <TabPane tab={<span><Icon type="edit" />Edit</span>} key="3">
        <QuestionEditPage />
      </TabPane>
    </Tabs>
  </div>
);
export default AdminPage;
