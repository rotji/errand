import React, { useState } from "react";
import axios from "axios";
import styles from "./AuthForm.module.css"; // Assuming module CSS for styling

// ✅ ADDED: Load backend URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const AuthForm = () => {
  const [isRegistering, setIsRegistering] = useState(true); // Toggle between register and login
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: { type: "Point", coordinates: [] },
  });

  const [error, setError] = useState(null); // To store error messages
  const [message, setMessage] = useState(null); // To store success messages

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "coordinates") {
      // Handle geospatial coordinates for location
      setFormData((prevState) => ({
        ...prevState,
        location: {
          type: "Point",
          coordinates: value.split(",").map((coord) => parseFloat(coord.trim())),
        },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ✅ ADDED: Build the URL using the environment variable
    const url = isRegistering
      ? `${API_BASE_URL}/api/users/register`
      : `${API_BASE_URL}/api/users/login`;

    try {
      const response = await axios.post(url, formData);
      setMessage(response.data.message || "Success!");
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong");
      setMessage(null); // Clear any previous messages
    }
  };

  // Switch between Register/Login form
  const toggleForm = () => setIsRegistering(!isRegistering);

  return (
    <div className={styles.authForm}>
      <h2>{isRegistering ? "Register" : "Login"} to Your Account</h2>
      
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <div>
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
        )}

        <div>
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

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
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

        {isRegistering && (
          <div>
            <label htmlFor="coordinates">Location (Longitude, Latitude)</label>
            <input
              type="text"
              id="coordinates"
              name="coordinates"
              value={formData.location.coordinates.join(", ")}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <button type="submit">
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>

      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}

      <p onClick={toggleForm} className={styles.toggleForm}>
        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
      </p>
    </div>
  );
};

export default AuthForm;
