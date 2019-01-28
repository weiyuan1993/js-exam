import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Slider } from 'antd';
import styles from './HistorySlider.module.scss';
const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: <strong>100°C</strong>,
  },
};
const HistorySlider = ({
  onForward,
  onBackward,
  historyIndex,
  historyList,
  onChange,
}) => (
  <div className={styles.historybar}>
    <Button.Group>
      <Button
        ghost
        type="primary"
        onClick={onBackward}
        disabled={historyIndex === 0}
      >
        <Icon type="vertical-right" />
      </Button>
      <Button
        ghost
        type="primary"
        onClick={onBackward}
        disabled={historyIndex === 0}
      >
        <Icon type="left" />
      </Button>
    </Button.Group>
    <Slider
      className={styles.sliderBar}
      disabled={historyList.length === 0}
      marks={{
        0: '0',
        [[historyList.length] - 1]: `${historyList.length - 1}`,
      }}
      max={historyList.length - 1}
      min={0}
      step={1}
      defaultValue={0}
      value={historyIndex}
      onChange={onChange}
    />
    <Button.Group>
      <Button
        ghost
        className={styles.forward}
        type="primary"
        onClick={onForward}
        disabled={
          historyList.length === 0 || historyIndex === historyList.length
        }
      >
        <Icon type="right" />
      </Button>
      <Button
        ghost
        className={styles.forward}
        type="primary"
        onClick={onForward}
        disabled={
          historyList.length === 0 || historyIndex === historyList.length
        }
      >
        <Icon type="vertical-left" />
      </Button>
    </Button.Group>
    {/* <span className={styles.historyCount}>
      {historyList.length === 0
        ? 'No history'
        : ` ${historyIndex + 1}/ ${historyList.length}`}
    </span> */}
  </div>
);
HistorySlider.propTypes = {
  onForward: PropTypes.func,
  onBackward: PropTypes.func,
  historyIndex: PropTypes.number,
  historyList: PropTypes.array,
};
export default HistorySlider;
