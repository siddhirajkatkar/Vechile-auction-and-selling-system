import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

// LOGIN (if you add it later)
export const login = async (email, password) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/login`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
};

// REGISTER (THIS MATCHES BACKEND)
export const register = async (userData) => {
  return axios.post(`${API_BASE_URL}/user/register`, userData);
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
