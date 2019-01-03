import React from 'react';
import AceEditor from 'react-ace';

import styles from './CodeWidget.module.scss';

const CodeWidget = ({
  handleCodeChange,
  data,
  mode,
  theme
}) => (
  <AceEditor
    className={styles.code}
    showPrintMargin={false}
    mode={mode}
    theme={theme}
    onChange={handleCodeChange}
    value={data}
    tabSize={2}
    debounceChangePeriod={500}
  />
);

export default CodeWidget;
