import axios from "../api/axiosConfig";

export const getPendingVehicles = () => {
  return axios.get("/admin/cars/pending");
};

export const approveVehicle = (id) => {
  return axios.put(`/admin/cars/${id}/approve`);
};

export const rejectVehicle = (id) => {
  return axios.put(`/admin/cars/${id}/reject`);
};
