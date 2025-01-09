import React, { useEffect, useState } from 'react';
import SubscriptionDetails from '../components/UserDashboard/SubscriptionDetails';
import TaskHistory from '../components/UserDashboard/TaskHistory';
import TransactionHistory from '../components/UserDashboard/TransactionHistory';
import styles from './userdashboard.module.css';

const UserDashboard = () => {
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const response = await fetch('/api/user-tasks'); // Adjust the endpoint as needed
        if (!response.ok) {
          throw new Error('Failed to fetch user tasks');
        }
        const data = await response.json();
        setUserTasks(data);
      } catch (error) {
        console.error('Error fetching user tasks:', error);
      }
    };

    fetchUserTasks();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.header}>Welcome to Your Dashboard</h1>
      <div className={styles.section}>
        <SubscriptionDetails />
      </div>
      <div className={styles.section}>
        <TaskHistory />
      </div>
      <div className={styles.section}>
        <TransactionHistory />
      </div>
      <div className={styles.section}>
        <h2>Your Posted Tasks</h2>
        {userTasks.length === 0 ? (
          <p>You haven't posted any tasks yet.</p>
        ) : (
          <ul className={styles.taskList}>
            {userTasks.map((task) => (
              <li key={task._id} className={styles.taskItem}>
                <strong>{task.title}</strong>: {task.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
