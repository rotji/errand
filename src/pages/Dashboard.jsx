import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      {/* Quick Action Bar */}
      <div className={styles.quickActions}>
        <button onClick={() => handleNavigation("/tasks")} className={styles.quickAction}>
          View Tasks
        </button>
        <button onClick={() => handleNavigation("/agents")} className={styles.quickAction}>
          Manage Agents
        </button>
        <button onClick={() => handleNavigation("/users")} className={styles.quickAction}>
          View Users
        </button>
        <button onClick={() => handleNavigation("/request-task")} className={styles.quickAction}>
          Request Task
        </button>
      </div>

      {/* Sections */}
      <div className={styles.sections}>
        {/* Tasks Section */}
        <div className={styles.section}>
          <h2>Tasks</h2>
          <p>Manage and monitor tasks requested by users.</p>
          <button onClick={() => handleNavigation("/tasks")} className={styles.sectionButton}>
            Go to Tasks
          </button>
        </div>

        {/* Agents Section */}
        <div className={styles.section}>
          <h2>Agents</h2>
          <p>View and verify agents for the platform.</p>
          <button onClick={() => handleNavigation("/agents")} className={styles.sectionButton}>
            Manage Agents
          </button>
        </div>

        {/* Users Section */}
        <div className={styles.section}>
          <h2>Users</h2>
          <p>Browse and manage platform users.</p>
          <button onClick={() => handleNavigation("/users")} className={styles.sectionButton}>
            View Users
          </button>
        </div>

        {/* Analytics Section */}
        <div className={styles.section}>
          <h2>Analytics</h2>
          <p>Track platform performance and activities.</p>
          <button onClick={() => handleNavigation("/analytics")} className={styles.sectionButton}>
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
