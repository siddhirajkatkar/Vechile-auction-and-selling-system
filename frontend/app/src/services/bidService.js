import axiosInstance from "./axios"; // ✅ FIXED

const BASE_URL = "http://localhost:8080/api/bids";

// 🔹 Get bids placed by logged-in user
export const getMyBids = () => {
  return axiosInstance.get("/api/bids/my-bids");
};

// 🔹 Place a bid on an auction
// bidService.js
export const placeBid = (auctionId, bidAmount) => {
  return axiosInstance.post(
    `/api/bids/place/${auctionId}`,
    { bidAmount }
  );
};

