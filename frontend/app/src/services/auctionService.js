import api from "./axios";

// ================= BUYER =================

// View active auctions
export const getActiveAuctions = () => {
  return api.get("/api/auctions");
};

// View auctions user has interacted with (optional / legacy)
export const getUserAuctions = () => {
  return api.get("/api/auctions/my");
};

// 🔥 View auctions WON by logged-in user
export const getMyWonAuctions = () => {
  return api.get("/api/auctions/my-wins");
};

// View single auction details
export const getAuctionById = (auctionId) => {
  if (!auctionId) {
    throw new Error("auctionId is required");
  }
  return api.get(`/api/auctions/${auctionId}`);
};

// ================= SELLER =================

// Start auction for a car
export const startAuction = (carId) => {
  if (!carId) {
    throw new Error("carId is required to start auction");
  }
  return api.post(`/api/auctions/start/${carId}`);
};

// ================= ADMIN =================

// 🔥 View ALL auctions (ACTIVE + COMPLETED + CANCELLED)
export const getAllAuctionsForAdmin = () => {
  return api.get("/api/auctions/admin/all");
};
