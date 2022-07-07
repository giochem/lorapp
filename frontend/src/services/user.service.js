import axios from 'axios';

const API_URL = `/api/v1/users`;

// Register user
const register = async (user) => {
  const res = await axios.post(API_URL, user);
  console.warn(res);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

// Login user
const login = async (userData) => {
  const res = await axios.post(API_URL + `/login`, userData);
  console.warn(res);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  return res.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const userService = {
  register,
  logout,
  login,
};

export default userService;
