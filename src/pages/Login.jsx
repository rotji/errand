import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // Import the module.css file

// ✅ Load API base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // ✅ Use .env for backend login request
      const response = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
      console.log("Login successful:", response.data);

      // Store the email in localStorage on successful login
      localStorage.setItem("email", email); // Added this line

      // If successful, navigate to the dashboard or home page
      alert("Login successful");
      navigate('/About'); // Adjust this route to your project requirements
    } catch (err) {
      console.error("Login error:", err.response?.data?.error || "Server error");
      setError(err.response?.data?.error || "Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await handleLogin(); // Use the dedicated handleLogin function
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
