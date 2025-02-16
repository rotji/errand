import axios from "axios";

// Create an Axios instance for centralized configuration (optional)
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL for your API
  timeout: 60000, // Request timeout
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

// Function to create a new task using axios
export const createTask = async (taskData) => {
  try {
    const response = await apiClient.post("/tasks", taskData); // Use axios to send POST request
    return response.data; // Return the response data from the backend
  } catch (error) {
    console.error("Error creating task:", error);
    throw error; // Rethrow the error so it can be handled in the calling component
  }
};

// Function to place a bid on a task
export const placeBid = async (taskId) => {
  try {
    const agentId = localStorage.getItem("agentId");
    const email = localStorage.getItem("email");
    const agentName = localStorage.getItem("agentName");
    const agentPhone = localStorage.getItem("agentPhone"); // Get phone from localStorage

    // Debugging logs
    console.log("Placing bid with:", { agentId, email, agentName, agentPhone });

    if (!agentId || !email || !agentName || !agentPhone) {
      throw new Error("Missing agent details (ID, email, name, or phone)");
    }

    const response = await apiClient.post(`/tasks/${taskId}/bid`, {
      agentId,
      email,
      agentName,
      agentPhone, 
    });

    return response.data;
  } catch (error) {
    console.error("Error placing bid:", error.response ? error.response.data : error.message);
    throw error;
  }
};




// Function to fetch all bids for a given task
export const getTaskBids = async (taskId) => {
  try {
    const response = await apiClient.get(`/tasks/${taskId}/bids`);
    return response.data;
  } catch (error) {
    console.error("Error fetching task bids:", error);
    throw error;
  }
};

// Function to accept a specific bid for a task
export const acceptBid = async (taskId, bidId) => {
  try {
    const response = await apiClient.patch(`/tasks/${taskId}/bids/${bidId}/accept`);
    return response.data;
  } catch (error) {
    console.error("Error accepting bid:", error);
    throw error;
  }
};


// Export the Axios instance if needed elsewhere
export default apiClient;
