import axiosInstance from "./axios";

// Base path must match backend controller
const BASE_URL = "/api/cars";

// ================= ADMIN VEHICLE APIs =================

export const getPendingVehicles = () => {
  return axiosInstance.get(`${BASE_URL}/pending`);
};

export const approveVehicle = (id) => {
  return axiosInstance.put(`${BASE_URL}/approve/${id}`);
};

export const rejectVehicle = (id) => {
  return axiosInstance.put(`${BASE_URL}/reject/${id}`);
};
