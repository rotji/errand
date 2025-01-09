import React, { useState } from 'react';
import styles from './TaskForm.module.css';

const TaskForm = ({ onSubmit }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve email from localStorage
    const email = localStorage.getItem('userEmail'); // Add email to task data
    const taskDataWithEmail = { ...taskData, email }; // Include email in the task data

    onSubmit(taskDataWithEmail); // Pass the updated task data to the onSubmit function
    setTaskData({ title: '', description: '' });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Title:
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>
      <textarea
        name="description"
        value={taskData.description}
        onChange={handleChange}
        className={styles.input}
        placeholder="Description" // Placeholder text inside the box
        required
      />
      <button type="submit" className={styles.submitButton}>
        Submit Task
      </button>
    </form>
  );
};

export default TaskForm;
