import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const buildConfig = () => {
  return { headers: { Authorization: `bearer ${token}` } };
};

const getAll = () => {
  const config = buildConfig();

  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const add = (blog) => {
  const config = buildConfig();

  const request = axios.post(baseUrl, blog, config);
  return request.then((response) => response.data);
};

const edit = (id, blog) => {
  const config = buildConfig();

  const request = axios.put(`${baseUrl}/${id}`, blog, config);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const config = buildConfig();

  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

const blogService = { add, edit, getAll, remove, setToken };

export default blogService;
