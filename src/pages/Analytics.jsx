import React from "react";
import styles from "./Analytics.module.css";

const Analytics = () => {
  return (
    <div className={styles.analyticsContainer}>
      <h1 className={styles.title}>Project Analytics</h1>
      <div className={styles.section}>
        <h2 className={styles.subTitle}>User Statistics</h2>
        <p>Total Registered Users: 150</p>
        <p>Active Users Today: 23</p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.subTitle}>Agent Statistics</h2>
        <p>Total Verified Agents: 50</p>
        <p>Tasks Completed Today: 12</p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.subTitle}>Task Statistics</h2>
        <p>Pending Tasks: 34</p>
        <p>Completed Tasks: 450</p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.subTitle}>Performance</h2>
        <p>Average Task Completion Time: 45 minutes</p>
        <p>Success Rate: 98%</p>
      </div>
    </div>
  );
};

export default Analytics;
