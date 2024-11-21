import React, { useState } from 'react';
import styles from './RequestTask.module.css';

const RequestTask = () => {
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task Requested:', taskDetails);
    // Add your API call to create the task
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Request a Task</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={taskDetails.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={taskDetails.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={taskDetails.location}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className={styles.submitButton}>
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default RequestTask;
