// src/services/carService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const addCar = async (car, images) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  // 🔥 car MUST be sent as JSON Blob
  formData.append(
    "car",
    new Blob([JSON.stringify(car)], {
      type: "application/json"
    })
  );

  // images (optional)
  if (images && images.length > 0) {
    Array.from(images).forEach((file) => {
      formData.append("images", file);
    });
  }

  // 🔐 SEND TOKEN HERE
  return axios.post(
    `${API_BASE_URL}/user/cars/add`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`
        // ❌ DO NOT set Content-Type manually
      }
    }
  );
};
