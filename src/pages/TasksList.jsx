import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard"; // Adjust the path if necessary
import styles from "./TasksList.module.css";
import apiClient from "../components/utils/api";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Fetch email from localStorage
        const email = localStorage.getItem("userEmail"); // Ensure consistent use of "userEmail"
        if (!email) {
          setError("User email not found. Please log in.");
          return;
        }

        // Fetch tasks from the backend API
        const response = await apiClient.get("/tasks/user-tasks", {
          params: { userId: email }, // Use email as the userId
        });

        console.log("Response:", response.data); // Log response data for debugging
        setTasks(response.data.tasks || []); // Handle tasks or fallback to an empty array
      } catch (err) {
        console.error("Error fetching tasks:", err); // Log errors for debugging
        setError("Failed to load tasks. Please try again later.");
      }
    };

    fetchTasks();
  }, []); // No dependency on props, as email is retrieved from localStorage

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
