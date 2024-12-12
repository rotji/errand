import React, { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(""); // Clear previous success message
    setError(""); // Clear previous error

    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      setMessage(response.data.message); // Display success message
      setFormData({ name: "", email: "", password: "", role: "user" }); // Reset form
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong"); // Display error
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <h2>Register</h2>
        {message && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="role">Register as:</label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
          </select>
        </div>

        <button
          type="submit"
          className={styles.registerButton}
          disabled={!formData.name || !formData.email || !formData.password}
        >
          {message ? "Registered" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
