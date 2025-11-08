import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TaskBids from "../components/TaskBids"; 
import styles from "./Dashboard.module.css";

// ✅ ADDED: Load API base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [bids, setBids] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null); // NEW: Track the task for which to view bids

  useEffect(() => {
    // Fetch tasks
    const fetchTasks = async () => {
      try {
        // ✅ REPLACED: Hardcoded URL with .env-based dynamic URL
        const response = await fetch(`${API_BASE_URL}/api/tasks`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    // Fetch bids
    const fetchBids = async () => {
      try {
        // ✅ REPLACED: Hardcoded URL with .env-based dynamic URL
        const response = await fetch(`${API_BASE_URL}/api/bids`);
        const data = await response.json();
        setBids(data);
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };

    // Fetch agents
    const fetchAgents = async () => {
      try {
        // ✅ REPLACED: Hardcoded URL with .env-based dynamic URL
        const response = await fetch(`${API_BASE_URL}/api/agents`);
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

  // NEW: Handle when a task’s "View Bids" button is clicked
  const handleViewBids = (taskId) => {
    setSelectedTaskId(taskId);
  };

  // Optionally, provide a way to clear the selection
  const handleCloseBids = () => {
    setSelectedTaskId(null);
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
                {task.description.substring(0, 50)}{task.description.length > 50 ? '...' : ''}{" "}
                <button onClick={() => handleViewBids(task._id)} className={styles.sectionButton}>
                  View Bids
                </button>
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

      {/* NEW: Render TaskBids for the selected task */}
      {selectedTaskId && (
        <div className={styles.section}>
          <h2>Bids for Task</h2>
          <TaskBids taskId={selectedTaskId} />
          <button onClick={handleCloseBids} className={styles.sectionButton}>
            Close Bids
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
