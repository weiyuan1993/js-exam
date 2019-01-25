import React from 'react';

import styles from './PageControlBar.module.scss';

const PageControlBar = ({ 
  children 
}) => (
  <div className={styles.control}>
    {children}
  </div>
);

export default PageControlBar;
