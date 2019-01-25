import React from 'react';
import PropTypes from 'prop-types';
import PageControlBar from 'components/PageControlBar';
import RecordSelector from 'components/Selectors/RecordSelector';

import { Button, Icon, Input } from 'antd';
import styles from './PlaybackControlWidget.module.scss';

const InputGroup = Input.Group;

function getDateOutput(dateTime) {
  const date = new Date(dateTime);

  function addZeroOutput(time) {
    if (time < 10) {
      return `0${time}`;
    }
    return time;
  }

  return `${date.getFullYear()}/${addZeroOutput(
    date.getMonth() + 1,
  )}/${addZeroOutput(date.getDate())} ${addZeroOutput(
    date.getHours(),
  )}:${addZeroOutput(date.getMinutes())}:${addZeroOutput(date.getSeconds())}`;
}

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
  <PageControlBar>
    <div className={styles.info}>
      <span className={styles.icon} id={styles.date}>
        <Icon className={styles.icon} type="calendar" />
        {getDateOutput(testDate)}
      </span>
      <span className={styles.icon} id={styles.name}>
        <Icon className={styles.icon} type="user" />
        {interviewee}
      </span>
    </div>
    <div>
      <InputGroup compact style={{ width: 'auto', display: 'inline-block' }}>
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
            disabled={
              historyAmount === 0 ||
              (historyIndex === historyAmount - 1 && !hasNextHistory)
            }
          >
            Forward
            <Icon type="right" />
          </Button>
        </Button.Group>
      </InputGroup>
      <span style={{ margin: '0', 'marginLeft': '15px', position: 'relative', top: 5 }}>
        {historyAmount === 0
          ? 'No history'
          : ` ${historyIndex + 1}/ ${historyAmount}`}
      </span>
    </div>
  </PageControlBar>
);
PlaybackControlWidget.propTypes = {
  testDate: PropTypes.string,
  interviewee: PropTypes.string,
  recordIndex: PropTypes.number,
  onChangeRecord: PropTypes.func,
  recordList: PropTypes.array,
  onForward: PropTypes.array,
  onBackward: PropTypes.array,
  historyIndex: PropTypes.number,
  hasNextHistory: PropTypes.bool,
  historyAmount: PropTypes.number,
};
export default PlaybackControlWidget;
