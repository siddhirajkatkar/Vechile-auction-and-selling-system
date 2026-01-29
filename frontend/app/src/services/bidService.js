import api from "./axios";

export const getMyBids = () =>
  api.get("/api/bids/my-bids");
