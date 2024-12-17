import React, { useState } from "react";
import styles from "./RequestTask.module.css";
import axios from "axios";

const RequestTask = () => {
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    from: "",
    to: "",
    phone: "",
  });

  const [message, setMessage] = useState(""); // Submission status message
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks submission state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/api/tasks", taskDetails);
      setIsSubmitting(false);
      setMessage("Task submitted successfully!"); // Success message

      // Clear the form
      setTaskDetails({
        title: "",
        description: "",
        from: "",
        to: "",
        phone: "",
      });
    } catch (error) {
      setIsSubmitting(false);
      setMessage("Failed to submit the task. Please try again.");
      console.error("Error submitting task:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Request a Task</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Title:
          <input
            type="text"
            name="title"
            value={taskDetails.title}
            onChange={handleChange}
            className={styles.input}
            placeholder="Title"
            required
          />
        </label>

        <label className={styles.label}>
          From (Address/Zip Code):
          <input
            type="text"
            name="from"
            value={taskDetails.from}
            onChange={handleChange}
            className={styles.input}
            placeholder="From Address/Zip Code"
            required
          />
        </label>

        <label className={styles.label}>
          To (Address/Zip Code):
          <input
            type="text"
            name="to"
            value={taskDetails.to}
            onChange={handleChange}
            className={styles.input}
            placeholder="To Address/Zip Code"
            required
          />
        </label>

        <label className={styles.label}>
          Phone:
          <input
            type="text"
            name="phone"
            value={taskDetails.phone}
            onChange={handleChange}
            className={styles.input}
            placeholder="Phone"
            required
          />
        </label>

        {/* Removed "Description:" outside the box */}
        <textarea
          name="description"
          value={taskDetails.description}
          onChange={handleChange}
          className={`${styles.input} ${styles.textarea}`}
          placeholder="Description"
          required
        ></textarea>

        <button type="submit" className={styles.submitButton}>
          {isSubmitting ? "Submitting..." : "Submit Task"}
        </button>
      </form>

      {/* Status message */}
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default RequestTask;
