import axios from "axios";

const BASE_URL = "http://localhost:8080/admin/cars";

export const getPendingVehicles = () => {
  return axios.get(`${BASE_URL}/pending`);
};

export const approveVehicle = (id) => {
  return axios.put(`${BASE_URL}/${id}/approve`);
};

export const rejectVehicle = (id) => {
  return axios.put(`${BASE_URL}/${id}/reject`);
};
