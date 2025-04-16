import React, { useState } from "react";
import styles from "./RequestTask.module.css";
import axios from "axios";

// ✅ Load API base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const RequestTask = () => {
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    from: "",
    to: "",
    phone: "",
    email: "",
    amount: "", // Task amount
    transport: "", // Transport amount
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
      // ✅ Use dynamic backend URL
      const response = await axios.post(`${API_BASE_URL}/api/tasks/create`, taskDetails, {
        headers: { "Content-Type": "application/json" },
      });

      setIsSubmitting(false);
      setMessage("Task submitted successfully!");

      // Clear the form
      setTaskDetails({
        title: "",
        description: "",
        from: "",
        to: "",
        phone: "",
        email: "",
        amount: "",
        transport: "",
      });
    } catch (error) {
      setIsSubmitting(false);
      const errorMessage =
        error.response?.data?.message || "Failed to submit the task. Please try again.";
      setMessage(errorMessage);
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

        <label className={styles.label}>
          Email:
          <input
            type="email"
            name="email"
            value={taskDetails.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="Email"
            required
          />
        </label>


        <label className={styles.label}>
          Amount:
          <input
            type="number"
            name="amount"
            value={taskDetails.amount}
            onChange={handleChange}
            className={styles.input}
            placeholder="Task Amount in USD"
            required
          />
        </label>

        <label className={styles.label}>
          Transport Cost:
          <input
            type="number"
            name="transport"
            value={taskDetails.transport}
            onChange={handleChange}
            className={styles.input}
            placeholder="Transport Cost in USD"
            required
          />
        </label>

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
