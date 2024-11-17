import React from 'react';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Welcome to Errand </h1>
      <p className={styles.description}>
        Send a trusted agent to help you with errands.
      </p>
    </div>
  );
}

export default Home;
