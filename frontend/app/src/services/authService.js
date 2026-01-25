import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

// Login
export const login = async (email, password) => {
  const response = await axios.post(
    `${API_BASE_URL}/login`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return response.data; // { token, role, userId }
};

// Register
export const register = async (userData) => {
  return axios.post(`${API_BASE_URL}/register`, userData);
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
