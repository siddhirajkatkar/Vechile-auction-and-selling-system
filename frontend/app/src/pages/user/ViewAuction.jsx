import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";

const ViewAuction = () => {
  const { auctionId } = useParams();

  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAuction();
    fetchBidHistory();
  }, [auctionId]);

  // 🔹 Fetch auction details
  const fetchAuction = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/auctions/${auctionId}`
      );
      setAuction(res.data);
    } catch (err) {
      setMessage("❌ Failed to load auction");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch bid history
  const fetchBidHistory = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/bids/auction/${auctionId}`
      );
      setBids(Array.isArray(res.data) ? res.data : []);
    } catch {
      setBids([]);
    }
  };

  // 🔹 Remaining time
  const remainingTime = (endTime) => {
    if (!endTime) return "N/A";
    const diff = new Date(endTime) - new Date();
    if (diff <= 0) return "Ended";

    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    return hrs > 0 ? `${hrs}h ${mins % 60}m left` : `${mins}m left`;
  };

  // 🔹 Place bid
  const placeBid = async () => {
    if (!bidAmount) return;

    try {
      await axiosInstance.post(
        `/api/bids/place/${auctionId}`,
        { bidAmount }
      );

      setMessage("✅ Bid placed successfully");
      setBidAmount("");
      fetchAuction();
      fetchBidHistory();
    } catch (err) {
      setMessage(
        err.response?.data?.message || "❌ Bid failed"
      );
    }
  };

  // 🔄 Loading
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Loading auction...</p>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="text-center mt-5 text-danger">
        Auction not found
      </div>
    );
  }

  return (
    <div className="container my-5">

      {/* 🔥 Header */}
      <div
        className="p-4 mb-4 rounded-4 text-white"
        style={{
          background: "linear-gradient(135deg, #0d6efd, #6610f2)",
        }}
      >
        <h2 className="fw-bold mb-1">
          🚗 {auction.brand} {auction.model}
        </h2>
        <span className="badge bg-warning text-dark">
          ⏳ {remainingTime(auction.endTime)}
        </span>
      </div>

      {message && (
        <div className="alert alert-info">{message}</div>
      )}

      <div className="row g-4">

        {/* 💰 Auction Info */}
        <div className="col-md-6">
          <div className="card shadow rounded-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Auction Details</h5>

              <p>
                <strong>Status:</strong>{" "}
                <span className="badge bg-success">
                  {auction.status}
                </span>
              </p>

              <p>
                <strong>Current Bid:</strong>
                <br />
                <span className="fs-3 fw-bold text-success">
                  ₹{auction.currentPrice?.toLocaleString()}
                </span>
              </p>

              {/* Place bid */}
              <div className="mt-3">
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Enter bid amount"
                  value={bidAmount}
                  onChange={(e) =>
                    setBidAmount(e.target.value)
                  }
                />

                <button
                  className="btn btn-primary w-100"
                  onClick={placeBid}
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 📜 Bid History */}
        <div className="col-md-6">
          <div className="card shadow rounded-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Bid History</h5>

              {bids.length === 0 ? (
                <p className="text-muted">
                  No bids yet
                </p>
              ) : (
                <ul className="list-group">
                  {bids.map((b, i) => (
                    <li
                      key={i}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>
                        👤 {b.bidderName}
                      </span>
                      <span className="fw-bold">
                        ₹{b.bidAmount}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewAuction;
