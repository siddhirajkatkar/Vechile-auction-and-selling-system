import axios from "axios";

const API_BASE = "http://localhost:8080/user/cars/getcars";

// 🔹 Get all cars
export const getAllCars = async () => {
  try {
    const response = await axios.get(API_BASE);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

// 🔹 Get single car by id (future use)
export const getCarById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching car:", error);
    throw error;
  }
};
