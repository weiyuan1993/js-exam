import React from 'react';
import { Button, Icon } from 'antd';
import styles from './ControlWidget.module.scss';

const ControlWidget = ({ onReset, roomDescription, intervieweeName }) => (
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
    <Button type="danger" onClick={onReset}>
      Reset
    </Button>
  </div>
);

export default ControlWidget;
