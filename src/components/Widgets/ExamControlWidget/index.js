import React from 'react';
import { Button, Icon } from 'antd';
import styles from './ControlWidget.module.scss';

const ControlWidget = ({
  onRunCode,
  onReset,
  roomDescription,
  intervieweeName,
  onStartRecording,
  onStopRecording,
  isRecording,
  isProgressing,
}) => (
  <div className={styles.control}>
    <div className={styles.interviewee}>
      <Icon type="home" />
      <p>
        <span>{roomDescription || 'UNSET'}</span>
      </p>
      <Icon type="user" />
      <p>
        <span>{intervieweeName || 'UNSET'}</span>
      </p>
    </div>
    <Button
      className={isProgressing ? styles.button : styles.hidden}
      type={isRecording ? 'danger' : 'primary'}
      onClick={isRecording ? onStopRecording : onStartRecording}
    >
      {isRecording ? 'Stop Recording' : 'Start Recording'}
    </Button>
    <Button className={styles.button} type="primary" onClick={onRunCode}>
      <Icon type="play-circle" />
      Run code
    </Button>

    <Button className={styles.button} type="danger" onClick={onReset}>
      Reset
    </Button>
  </div>
);

export default ControlWidget;
