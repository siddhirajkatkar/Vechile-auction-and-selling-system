import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";

const ViewAuction = () => {
  const { auctionId } = useParams();
  const navigate = useNavigate();

  const loggedInUserId = Number(localStorage.getItem("userId"));
  const username = localStorage.getItem("username") || "User";

  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAuction();
    fetchBidHistory();

    const interval = setInterval(fetchBidHistory, 10000);
    return () => clearInterval(interval);
  }, [auctionId]);

  const fetchAuction = async () => {
    try {
      const res = await axiosInstance.get(`/api/auctions/${auctionId}`);
      setAuction(res.data);
    } catch {
      setMessage("❌ Failed to load auction details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBidHistory = async () => {
    try {
      const res = await axiosInstance.get(`/api/bids/auction/${auctionId}`);
      setBids(Array.isArray(res.data) ? res.data : []);
    } catch {
      setBids([]);
    }
  };

  // ⏳ Remaining time
  const remainingTime = (endTime) => {
    if (!endTime) return "N/A";
    const diff = new Date(endTime) - new Date();
    if (diff <= 0) return "Auction Ended";

    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return `${mins}m ${secs}s remaining`;
  };

  const formatBidTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // 🔨 PLACE BID
  const placeBid = async (customAmount = null) => {
    if (auction.status !== "ACTIVE") {
      setMessage("❌ This auction has already ended.");
      return;
    }

    const amountToBid = Number(customAmount || bidAmount);

    if (!amountToBid || amountToBid <= auction.currentPrice) {
      setMessage("❌ Bid must be higher than the current price.");
      return;
    }

    try {
      await axiosInstance.post(`/api/bids/place/${auctionId}`, {
        bidAmount: amountToBid,
      });

      setMessage("✅ Bid placed successfully!");
      setBidAmount("");
      fetchAuction();
      fetchBidHistory();
      setTimeout(() => setMessage(""), 3000);

    } catch (err) {
      let backendMessage = "Bid failed. Please try again.";

      if (typeof err.response?.data === "string") {
        backendMessage = err.response.data;
      } else if (err.response?.data?.message) {
        backendMessage = err.response.data.message;
      }

      setMessage(`❌ ${backendMessage}`);

      if (
        backendMessage.toLowerCase().includes("subscription") ||
        backendMessage.toLowerCase().includes("bids")
      ) {
        setTimeout(() => navigate("/user/subscriptions"), 2000);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  const quickBidValue = (auction.currentPrice || 0) + 2000;

  return (
    <div className="min-vh-100 bg-light pb-5">

      {/* HEADER */}
      <div className="bg-white border-bottom shadow-sm sticky-top">
        <div className="container py-3 d-flex justify-content-between align-items-center">

          <div>
            <button
              className="btn btn-outline-secondary btn-sm rounded-pill mb-2"
              onClick={() => navigate("/user/dashboard")}
            >
              <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
            </button>

            <h4 className="fw-bold mb-0">
              Live <span className="text-primary">Auction Room</span>
            </h4>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span
              className={`badge ${
                auction.status === "ACTIVE" ? "bg-danger" : "bg-secondary"
              } px-3 py-2`}
            >
              {auction.status === "ACTIVE" ? "LIVE" : "ENDED"}
            </span>

            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
              style={{ width: "38px", height: "38px" }}
            >
              {username.charAt(0).toUpperCase()}
            </div>
          </div>

        </div>
      </div>

      <div className="container mt-4">

        {message && (
          <div className="alert alert-info text-center">{message}</div>
        )}

        {/* AUCTION CARD */}
        <div className="card shadow-sm rounded-4 mb-4">
          <div className="card-body text-center">

            <h2 className="fw-bold">
              {auction.brand} {auction.model}
            </h2>

            <p className="text-muted">
              ⏳ {remainingTime(auction.endTime)}
            </p>

            <h1 className="text-primary fw-bold mb-4">
              ₹{auction.currentPrice?.toLocaleString()}
            </h1>

            {/* 🏆 WINNER */}
            {auction.status === "COMPLETED" && auction.winnerName && (
              <div className="alert alert-success rounded-4">
                🏆 <strong>{auction.winnerName}</strong> won this auction
                <br />
                Final Price: ₹{auction.finalPrice?.toLocaleString()}
              </div>
            )}

            {/* 💳 PAYMENT */}
            {auction.status === "COMPLETED" &&
              auction.winnerId === loggedInUserId && (
                <button
                  className="btn btn-success btn-lg rounded-pill px-5 mt-3"
                  onClick={() =>
                    navigate(`/user/payment/${auction.auctionId}`)
                  }
                >
                  Make Payment
                </button>
              )}

            {/* 🔨 BIDDING */}
            {auction.status === "ACTIVE" && (
              <div className="mt-4">
                <button
                  className="btn btn-outline-primary btn-lg w-100 mb-3 rounded-pill fw-bold"
                  onClick={() => placeBid(quickBidValue)}
                >
                  Quick Bid ₹{quickBidValue.toLocaleString()}
                </button>

                <input
                  type="number"
                  className="form-control form-control-lg mb-3"
                  placeholder={`Min ₹${auction.currentPrice + 1}`}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />

                <button
                  className="btn btn-primary btn-lg w-100 rounded-pill fw-bold"
                  onClick={() => placeBid()}
                >
                  Place Bid
                </button>
              </div>
            )}
          </div>
        </div>

        {/* BID HISTORY */}
        <div className="card shadow-sm rounded-4">
          <div className="card-header fw-bold">
            Bid Activity
          </div>

          <div className="list-group list-group-flush">
            {bids.length === 0 ? (
              <div className="p-4 text-muted text-center">
                No bids yet
              </div>
            ) : (
              bids.map((b, i) => (
                <div key={i} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{b.bidderName}</strong>
                      <div className="text-muted small">
                        {formatBidTime(b.bidTime)}
                      </div>
                    </div>
                    <strong className="text-success">
                      ₹{b.bidAmount.toLocaleString()}
                    </strong>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewAuction;
