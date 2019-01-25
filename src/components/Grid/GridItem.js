import React from 'react';
import styles from './Grid.module.scss';

const GridItem = ({ label, children }) => (
  <div className={styles.item}>
    {label &&
      <div className={styles.label}>{label}</div>
    }
    { children }
  </div>
);

export default GridItem;
