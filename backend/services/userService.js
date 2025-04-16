import axios from 'axios';

// Use environment variable with fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/user`;

const getAccountDetails = async (userId) => {
  const response = await axios.get(`${API_URL}/account/${userId}`);
  return response.data;
};

export default {
  getAccountDetails,
};
