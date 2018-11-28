import React from 'react';
import AceEditor from 'react-ace';
import styles from './TestWidget.module.scss';

const TestWidget = ({ data, readOnly = true, handleCodeChange = () => {} }) => (
  <div
    className={`${styles['test-widget']}`}
  >
    <AceEditor
      showPrintMargin={false}
      mode="javascript"
      theme="textmate"
      value={data}
      readOnly={readOnly}
      tabSize={2}
      onChange={handleCodeChange}
    />
  </div>
);

export default TestWidget;
