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
      <p>{roomDescription || 'UNSET'}</p>
      <Icon type="user" />
      <p>{intervieweeName || 'UNSET'}</p>
    </div>
    <Button
      className={isProgressing ? styles.button : styles.hidden}
      type={isRecording ? 'danger' : 'primary'}
      onClick={isRecording ? onStopRecording : onStartRecording}
    >
      {isRecording ? 'Stop Recording' : 'Start Recording'}
    </Button>
    <Button className={styles.button} type="default" onClick={onRunCode} ghost>
      <Icon type="play-circle" />
      Run code
    </Button>

    <Button className={styles.button} type="danger" onClick={onReset} ghost>
      Reset
    </Button>
  </div>
);

export default ControlWidget;
