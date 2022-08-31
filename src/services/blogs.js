import axios from 'axios';
const baseUrl = '/api/blogs';
let token;

const setToken = (newToken) => {
  token = newToken;
};

const getAll = () => {
  const config = { headers: { Authorization: `bearer ${token}` } };

  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const blogService = { getAll, setToken };

export default blogService;
