import React from 'react';
import styles from './FindAgent.module.css';

const FindAgent = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Find an Agent</h2>
      <div className={styles.mapPlaceholder}>
        {/* Replace this with an actual map integration */}
        Map of nearby agents will go here
      </div>
    </div>
  );
};

export default FindAgent;
