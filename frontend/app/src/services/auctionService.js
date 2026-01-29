import api from "./axios";

export const getUserAuctions = () => {
  return api.get("/api/auctions");
};
