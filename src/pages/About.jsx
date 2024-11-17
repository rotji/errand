import React from 'react';
import styles from './About.module.css';

function About() {
  return (
    <div className={styles.about}>
      <h1 className={styles.title}>About Errand </h1>
      <p className={styles.description}>
        This platform connects you with verified agents for errands.
      </p>
    </div>
  );
}

export default About;
