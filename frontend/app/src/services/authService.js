import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/user/login",
      {
        email: email,
        password: password
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Login response:", response.data);
    // save token or user info if needed
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
  }
};
