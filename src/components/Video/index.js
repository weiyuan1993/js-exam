import React from 'react';
import styles from './Video.module.scss';

const Video = ({ src, ...props }) => (
  <video className={styles.video} controls src={src}>
    <track kind="captions" {...props} />
  </video>
);

export default Video;
