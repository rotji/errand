import React, { useEffect, useState, useContext } from "react";
import TaskCard from "../components/TaskCard"; 
import styles from "./TasksList.module.css";
import apiClient from "../components/utils/api";
import { APIContext } from "../App";


const TasksList = ({ loggedInEmail }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const apiBaseURL = useContext(APIContext);
  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Determine which email to use
        const emailToUse = loggedInEmail || localStorage.getItem("userEmail"); // Use loggedInEmail first, fallback to localStorage
        if (!emailToUse) {
          setError("User email not found. Please log in."); // Handle case when no email is found
          return;
        }

        // Fetch tasks using the API endpoint
        const response = await fetch(`${apiBaseURL}/tasks/${emailToUse}`, {
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks.");
        }

        const data = await response.json();
        setTasks(data); // Update tasks state
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks. Please try again later.");
      }
    };

    fetchTasks();
  }, [loggedInEmail]); // Re-fetch tasks whenever loggedInEmail changes

  const handleBid = (taskId) => {
    console.log("Bidding on task:", taskId);
    // Implement the bidding logic here if necessary
  };

  return (
    <div className={styles.container}>
      <h2>Task Requests</h2>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className={styles.taskCards}>
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onBid={handleBid} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksList;
