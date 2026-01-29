import React, { useEffect, useState } from "react";
import { getActiveAuctions } from "../../services/auctionService";
import { Link } from "react-router-dom";

const statusColor = {
  ACTIVE: "bg-success",
  COMPLETED: "bg-secondary",
  CANCELLED: "bg-danger",
};

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      const res = await getActiveAuctions();
      setAuctions(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      console.error("AUCTION LOAD ERROR:", err);
      setError("Failed to load live auctions");
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Remaining time helper
  const remainingTime = (endTime) => {
    if (!endTime) return "N/A";
    const diff = new Date(endTime) - new Date();
    if (diff <= 0) return "Ended";

    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    return hrs > 0 ? `${hrs}h ${mins % 60}m left` : `${mins}m left`;
  };

  // 🔄 Loading state
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Loading live auctions...</p>
      </div>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <div className="text-center mt-5 text-danger fw-bold">
        {error}
      </div>
    );
  }

  return (
    <div className="container my-5">

      {/* 🔥 Header */}
      <div
        className="p-4 mb-5 rounded-4 text-white"
        style={{
          background: "linear-gradient(135deg, #0d6efd, #6610f2)",
        }}
      >
        <h1 className="fw-bold mb-1">🔥 Live Auctions</h1>
        <p className="mb-0 opacity-75">
          Bid on vehicles before time runs out
        </p>
      </div>

      {/* 🚫 No auctions */}
      {auctions.length === 0 ? (
        <div className="text-center text-muted">
          <h5>No auctions available</h5>
          <p>Please check back later 🚀</p>
        </div>
      ) : (
        <div className="row g-4">
          {auctions.map((auction) => (
            <div
              key={auction.auctionId}
              className="col-md-6 col-lg-4"
            >
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body d-flex flex-column">

                  {/* 🚗 Car */}
                  <h5 className="fw-bold mb-2">
                    🚗 {auction.brand} {auction.model}
                  </h5>

                  {/* 💰 Current Bid */}
                  <div className="mb-2">
                    <span className="text-muted">Current Bid</span>
                    <div className="fs-4 fw-bold text-success">
                      ₹{auction.currentPrice?.toLocaleString()}
                    </div>
                  </div>

                  {/* ⏳ Time */}
                  <span className="badge bg-warning text-dark mb-2">
                    ⏳ {remainingTime(auction.endTime)}
                  </span>

                  {/* 🟢 Status */}
                  <span
                    className={`badge ${
                      statusColor[auction.status] || "bg-primary"
                    } mb-3`}
                  >
                    {auction.status}
                  </span>

                  {/* 👉 View Auction */}
                  <Link
                    to={`/user/auction/${auction.auctionId}`}
                    className="btn btn-outline-primary mt-auto fw-semibold"
                  >
                    View Auction →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Auctions;
