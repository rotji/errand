import React, { useEffect, useState } from "react";
import styles from "./TasksList.module.css";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Task Requests</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <li key={task._id} className={styles.task}>
              <p>Title: {task.title}</p>
              <p>Description: {task.description}</p>
              <p>Location: {task.location}</p>
              <p>Status: {task.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksList;
