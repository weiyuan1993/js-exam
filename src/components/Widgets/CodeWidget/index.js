import React from 'react';
import AceEditor from 'react-ace';

import styles from './CodeWidget.module.scss';

const CodeWidget = ({
  handleCodeChange,
  data,
  mode,
  theme,
  readOnly = false
}) => (
  <AceEditor
    className={styles.code}
    showPrintMargin={false}
    mode={mode}
    theme={theme}
    readOnly={readOnly}
    onChange={handleCodeChange}
    value={data}
    tabSize={2}
    debounceChangePeriod={800}
  />
);

export default CodeWidget;
