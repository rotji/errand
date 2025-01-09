import React from "react";
import styles from "../../pages/AgentDashboard.module.css";

const TaskManagement = (props) => {
  const tasks = props.tasks || []; // Default to an empty array
  const completedTasks = props.completedTasks || []; // Default to an empty array
  const pendingTasks = props.pendingTasks || []; // Default to an empty array

  // Debug logs
  console.log('TaskManagement props:', props); // Logs the props
  console.log('Total Tasks:', tasks?.length || 0); // Logs total tasks length
  console.log('Completed Tasks:', completedTasks.length); // Logs completed tasks length
  console.log('Pending Tasks:', pendingTasks.length); // Logs pending tasks length
  return (
    <div className={styles.taskManagement}>
      <h2 className={styles.sectionTitle}>Task Management</h2>
      <div className={styles.completedTasks}>
        <h3>Completed Tasks</h3>
        {completedTasks.length > 0 ? (
          <ul>
            {completedTasks.map((task, index) => (
              <li key={index} className={styles.taskItem}>
                <p>
                  <strong>Description:</strong> {task.description}
                </p>
                <p>
                  <strong>Requesting User:</strong> {task.requestingUser}
                </p>
                <p>
                  <strong>Date Completed:</strong> {task.dateCompleted}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No completed tasks yet.</p>
        )}
      </div>

      <div className={styles.pendingTasks}>
        <h3>Pending Tasks</h3>
        {pendingTasks.length > 0 ? (
          <ul>
            {pendingTasks.map((task, index) => (
              <li key={index} className={styles.taskItem}>
                <p>
                  <strong>Description:</strong> {task.description}
                </p>
                <p>
                  <strong>Requesting User:</strong> {task.requestingUser}
                </p>
                <p>
                  <strong>Expected Completion Date:</strong> {task.expectedCompletionDate}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pending tasks.</p>
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
