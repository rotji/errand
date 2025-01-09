import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user';

const getAccountDetails = async (userId) => {
  const response = await axios.get(`${API_URL}/account/${userId}`);
  return response.data;
};

export default {
  getAccountDetails,
};
