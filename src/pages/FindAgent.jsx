import React from 'react';
import styles from './FindAgent.module.css';
import Map from '../../components/Map';


const FindAgent = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Find an Agent</h2>
      <div className={styles.mapContainer}>
        <Map />
      </div>
    </div>
  );
};

export default FindAgent;
