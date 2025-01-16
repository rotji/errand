import axios from "axios";

// Create an Axios instance for centralized configuration (optional)
const apiClient = axios.create({
  baseURL: "/api", // Base URL for your API
  timeout: 10000, // Request timeout
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

// Function to fetch all tasks
export const fetchAllTasks = async () => {
  try {
    const response = await apiClient.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    throw error;
  }
};

// Function to fetch tasks for a specific user
export const fetchUserTasks = async (userId) => {
  try {
    // Retrieve email from localStorage and include it in the request params
    const email = localStorage.getItem("userEmail");
    const response = await apiClient.get(`/tasks/user-tasks`, {
      params: { userId, email }, // Include email in the request parameters
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    throw error;
  }
};

// Function to create a new task using fetch
export const createTask = async (taskData) => {
  try {
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return response.json();
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Export the Axios instance if needed elsewhere
export default apiClient;
