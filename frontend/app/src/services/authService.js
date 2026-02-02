import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const login = async (email, password) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/login`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
};

export const resetPassword = async (email, newPassword) => {
  const response = await axios.post(
    `${API_URL}/reset-password`,
    null,
    {
      params: {
        email,
        newPassword,
      },
    }
  );
  return response.data;
};
export const register = async (userData) => {
  return axios.post(`${API_BASE_URL}/api/auth/register`, userData);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
