import axios from "axios";

export const login = async (email, password) => {
  const response = await axios.post(
    "http://localhost:8080/user/login",
    {
      email,
      password
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  console.log("Login response:", response.data);

  // ✅ THIS LINE FIXES EVERYTHING
  return response.data;
};
