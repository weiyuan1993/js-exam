import React from 'react';
import RecordSelector from 'components/Selectors/RecordSelector';

import { Button, Icon, Input } from 'antd';
import styles from './PlaybackControlWidget.module.scss';

const InputGroup = Input.Group;

const PlaybackControlWidget = ({
  testDate,
  interviewee,
  recordIndex,
  onChangeRecord,
  recordList,
  onForward,
  onBackward,
  historyIndex,
  hasNextHistory,
  historyAmount,
}) => (
  <div className={styles.control}>
    <div className={styles.info}>
      <span className={styles.icon} id={styles.date}>
        <Icon className={styles.icon} type="calendar" />
        {testDate}
      </span>
      <span className={styles.icon} id={styles.name}>
        <Icon className={styles.icon} type="user" />
        {interviewee}
      </span>
    </div>
    <div />
    <InputGroup compact style={{ width: 'auto' }}>
      <RecordSelector
        onChange={onChangeRecord}
        recordIndex={recordIndex}
        list={recordList}
      />
      <Button.Group>
        <Button
          type="primary"
          onClick={onBackward}
          disabled={historyIndex === 0}
        >
          <Icon type="left" />
          Backward
        </Button>
        <Button
          type="primary"
          onClick={onForward}
          disabled={historyIndex === historyAmount - 1 && !hasNextHistory}
        >
          Forward
          <Icon type="right" />
        </Button>
      </Button.Group>
    </InputGroup>
    <p style={{ margin: '0' }}>
      {historyIndex + 1}/{historyAmount}
    </p>
  </div>
);

export default PlaybackControlWidget;
