import axios from "../api/axiosConfig";

export const getAllUsers = () => {
  return axios.get("/admin/users");
};

export const makeAdmin = (userId) => {
  return axios.put(`/admin/users/${userId}/make-admin`);
};
