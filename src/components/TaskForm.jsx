import React, { useState, useEffect } from 'react';
import styles from './TaskForm.module.css';
import { createTask } from './utils/api';

const TaskForm = ({ onSubmit }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    from: '',
    to: '',
    phone: '',
    amount: '',
    transport: '',
    email: '' // New email field
  });

  // Pre-fill email field from localStorage (if available)
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setTaskData((prevData) => ({ ...prevData, email: storedEmail }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use the email from the form if available, else fallback to localStorage
      const taskDataWithUser = {
        ...taskData,
        userId: taskData.email || localStorage.getItem('email'), // Check if email is entered; else use the localStorage value
      };
      
      // Send task data to the backend
      await createTask(taskDataWithUser);
      alert('Task created successfully!');

      // Reset the form
      setTaskData({
        title: '',
        description: '',
        from: '',
        to: '',
        phone: '',
        amount: '',
        transport: '',
        email: '', // Reset email
      });
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
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
      <label className={styles.label}>
        Description:
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          className={styles.input}
          placeholder="Description"
          required
        />
      </label>
      <label className={styles.label}>
        From:
        <input
          type="text"
          name="from"
          value={taskData.from}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>
      <label className={styles.label}>
        To:
        <input
          type="text"
          name="to"
          value={taskData.to}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>
      <label className={styles.label}>
        Phone:
        <input
          type="text"
          name="phone"
          value={taskData.phone}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>
      <label className={styles.label}>
        Amount:
        <input
          type="number"
          name="amount"
          value={taskData.amount}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>
      <label className={styles.label}>
        Transport:
        <input
          type="text"
          name="transport"
          value={taskData.transport}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>
      <label className={styles.label}>
        Email:
        <input
          type="email"
          name="email"
          value={taskData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>
      <button type="submit" className={styles.submitButton}>
        Submit Task
      </button>
    </form>
  );
};

export default TaskForm;
