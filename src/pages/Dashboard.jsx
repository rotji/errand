import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [bids, setBids] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // Fetch tasks
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    // Fetch bids
    const fetchBids = async () => {
      try {
        const response = await fetch("/api/bids");
        const data = await response.json();
        setBids(data);
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };

    // Fetch agents
    const fetchAgents = async () => {
      try {
        const response = await fetch("/api/agents");
        const data = await response.json();
        setAgents(data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchTasks();
    fetchBids();
    fetchAgents();
  }, []);

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
          <ul className={styles.list}>
            {tasks.slice(0, 5).map((task) => (
              <li key={task._id} className={styles.listItem}>
                {task.title}
              </li>
            ))}
          </ul>
          <button onClick={() => handleNavigation("/tasks")} className={styles.sectionButton}>
            Go to Tasks
          </button>
        </div>

        {/* Bids Section */}
        <div className={styles.section}>
          <h2>Bids</h2>
          <p>Review and track active bids on tasks.</p>
          <ul className={styles.list}>
            {bids.slice(0, 5).map((bid) => (
              <li key={bid._id} className={styles.listItem}>
                Bid by {bid.agentName} on Task {bid.taskId}
              </li>
            ))}
          </ul>
          <button onClick={() => handleNavigation("/bids")} className={styles.sectionButton}>
            View Bids
          </button>
        </div>

        {/* Agents Section */}
        <div className={styles.section}>
          <h2>Agents</h2>
          <p>View and verify agents for the platform.</p>
          <ul className={styles.list}>
            {agents.slice(0, 5).map((agent) => (
              <li key={agent._id} className={styles.listItem}>
                {agent.name}
              </li>
            ))}
          </ul>
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
