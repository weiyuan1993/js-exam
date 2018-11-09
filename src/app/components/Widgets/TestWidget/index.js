import React from 'react';
import AceEditor from 'react-ace';
import styles from './TestWidget.module.scss';

const TestWidget = ({ data }) => (
  <div
    className={`${styles['test-widget']}`}
  >
    <AceEditor
      showPrintMargin={false}
      mode="javascript"
      theme="textmate"
      value={data}
      readOnly
      tabSize={2}
    />
  </div>
);

export default TestWidget;
