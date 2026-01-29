import api from "./axios";

// BUYER: view active auctions
export const getActiveAuctions = () => {
  return api.get("/api/auctions");
};
export const getUserAuctions = () => {
  return api.get("/api/auctions/my");
};


// SELLER: start auction for a car
export const startAuction = (carId) => {
  if (!carId) {
    throw new Error("carId is required to start auction");
  }

  return api.post(`/api/auctions/start/${carId}`);
};
