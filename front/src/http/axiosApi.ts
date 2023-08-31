import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:3500/', // Your API base URL
});

// Set authentication token in the headers
const token = localStorage.getItem('authToken');
if (token) {
  apiInstance.defaults.headers.common['Authorization'] = `${token}`;
}

export default apiInstance;
