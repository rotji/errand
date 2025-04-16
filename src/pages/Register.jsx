import React, { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// ✅ Load API base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user", // Default role
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(""); // Clear previous success message
    setError(""); // Clear previous error
    setLoading(true);
    setMessage("Registering...");


    try {
      // ✅ Use dynamic backend URL
      const response = await axios.post(`${API_BASE_URL}/api/register`, formData);
      setMessage("Registration successful!");


      // Store the email in localStorage after successful registration
      localStorage.setItem("email", formData.email); // Added this line

      setFormData({ name: "", email: "", password: "", phone: "", role: "user" }); // Reset form

      // Navigate to the About page after successful registration
      setTimeout(() => { // <-- Delay navigation to show success message
        navigate("/about");
      }, 1500);
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
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel" // Use "tel" for phone input
            id="phone"
            name="phone"
            value={formData.phone}
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
          disabled={!formData.name || !formData.email || !formData.password || !formData.phone}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
