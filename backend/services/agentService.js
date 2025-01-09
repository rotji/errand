import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api/agents";

// Fetch agent details by ID
export const getAgentDetails = async (agentId) => {
  try {
    const response = await axios.get(`${API_URL}/${agentId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error fetching agent details");
  }
};

// Add or update a task for an agent
export const addOrUpdateTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/task`, taskData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error adding/updating task");
  }
};

// Fetch transaction history of an agent
export const getTransactionHistory = async (agentId) => {
  try {
    const response = await axios.get(`${API_URL}/${agentId}/transactions`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error fetching transaction history");
  }
};

// Raise a dispute for an agent
export const raiseDispute = async (disputeData) => {
  try {
    const response = await axios.post(`${API_URL}/dispute`, disputeData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error raising dispute");
  }
};

// **New Functionality**: Add a bid for a specific task
export const addBidToTask = async (taskId, bidData) => {
  try {
    const response = await axios.post(`${API_URL}/tasks/${taskId}/bid`, bidData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error adding bid to task");
  }
};
