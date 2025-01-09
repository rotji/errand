import React from "react";
import styles from "../../pages/AgentDashboard.module.css";


const PerformanceMetrics = ({ taskRating, monthlyStats }) => {
  return (
    <div className={styles.performanceMetrics}>
      <h2 className={styles.sectionTitle}>Performance Metrics</h2>

      <div className={styles.averageRating}>
        <h3>Average Task Rating</h3>
        <p>{taskRating ? `${taskRating} / 5` : "No ratings yet."}</p>
      </div>

      <div className={styles.monthlyStats}>
        <h3>Monthly Task Statistics</h3>
        {monthlyStats && monthlyStats.length > 0 ? (
          <ul>
            {monthlyStats.map((stat, index) => (
              <li key={index} className={styles.statItem}>
                <p>
                  <strong>Month:</strong> {stat.month}
                </p>
                <p>
                  <strong>Tasks Completed:</strong> {stat.tasksCompleted}
                </p>
                <p>
                  <strong>Earnings:</strong> ${stat.earnings}
                </p>
                <p>
                  <strong>Pending Tasks:</strong> {stat.pendingTasks}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No statistics available.</p>
        )}
      </div>
    </div>
  );
};

export default PerformanceMetrics;
