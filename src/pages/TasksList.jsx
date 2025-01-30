import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard"; // Adjust the path if necessary
import styles from "./TasksList.module.css";
import apiClient from "../components/utils/api";

const TasksList = ({ loggedInEmail }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Determine which email to use
        const emailToUse = loggedInEmail || localStorage.getItem("userEmail"); // Use loggedInEmail first, fallback to localStorage
        if (!emailToUse) {
          setError("User email not found. Please log in."); // Handle case when no email is found
          return;
        }

        // Fetch tasks from the backend API
        const response = await apiClient.get("/tasks/user-tasks", {
          params: { userId: emailToUse }, // Use the determined email as userId
        });

        console.log("Response:", response.data); // Log response data for debugging
        setTasks(response.data.tasks || []); // Handle tasks or fallback to an empty array
      } catch (err) {
        console.error("Error fetching tasks:", err); // Log errors for debugging
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
