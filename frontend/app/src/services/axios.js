import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Automatically attach JWT token (EXCEPT Razorpay)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // 🚫 DO NOT attach JWT for Razorpay verification
    if (token && !config.url.includes("/razorpay")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Handle global errors (401 / 403)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized - Please login again");
    }
    if (error.response?.status === 403) {
      console.error("Forbidden - Access denied");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
