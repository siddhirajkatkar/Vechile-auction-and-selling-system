import axios from "../api/axiosConfig";

export const getOngoingAuctions = () => {
  return axios.get("/admin/auctions/ongoing");
};
