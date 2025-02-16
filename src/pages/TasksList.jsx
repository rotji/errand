import React, { useEffect, useState, useContext } from "react";
import TaskCard from "../components/TaskCard"; 
import styles from "./TasksList.module.css";
import apiClient from "../components/utils/api";
import { APIContext } from "../App";
import RequestTask from "../pages/RequestTask";
import { placeBid } from "../components/utils/api";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const apiBaseURL = useContext(APIContext);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // ✅ New API endpoint to fetch all tasks
        const response = await fetch(`${apiBaseURL}/tasks/all-tasks`, {
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks.");
        }

        const data = await response.json();
        setTasks(data.reverse()); // Display newest tasks first
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks. Please try again later.");
      }
    };

    fetchTasks();
  }, []);  

  // Function to add a new task at the top of the list
  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleBid = async (taskId) => {
    try {
      const agentId = localStorage.getItem("agentId") || "agent@example.com";
      const result = await placeBid(taskId, agentId);
      console.log("Bid placed successfully", result);
    } catch (error) {
      console.error("Error placing bid", error);
    }
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
