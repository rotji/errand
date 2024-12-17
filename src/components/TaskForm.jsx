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
    onSubmit(taskData);
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
