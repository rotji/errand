import React from 'react';
import styles from './About.module.css';

function About() {
  return (
    <div className={styles.about}>
      <h1 className={styles.title}>About Errand </h1>
      <p className={styles.description}>
        This platform connects you with verified agents for errands.are you looking for somebody to send for an errand, are you looking for somebody to pick or delivered your goods from one location to another, are you looking for somebody to pick or drop your child at school, are you looking for somebody to wash your cars, are you looking for somebody to clean your house, are you looking for somebody to go and stand in a line for you in banks or elsewhere, do you have menial/big tasks that you want somebody to joint you, if your answer is yes to those questions then this platform is for you.
      </p>
    </div>
  );
}

export default About;
