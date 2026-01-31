import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";

const ViewAuction = () => {
  const { auctionId } = useParams();
  const navigate = useNavigate();

  const loggedInUserId = Number(localStorage.getItem("userId"));

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
      setMessage("❌ Failed to load auction");
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

  // ⏳ Countdown (works automatically for 10 mins)
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

  const placeBid = async (customAmount = null) => {
    if (auction.status !== "ACTIVE") {
      alert("Auction has ended");
      return;
    }

    const amountToBid = customAmount || bidAmount;

    if (!amountToBid || amountToBid <= auction.currentPrice) {
      alert("Bid must be higher than current price!");
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
      setMessage(err.response?.data?.message || "❌ Bid failed");
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
    <div className="min-vh-100 pb-5 bg-light">
      {/* HEADER */}
      <nav className="navbar navbar-dark bg-dark px-4 py-3 sticky-top">
        <button
          className="btn btn-outline-light btn-sm rounded-pill"
          onClick={() => navigate("/user/dashboard")}
        >
          ← Dashboard
        </button>
        <span className="navbar-brand ms-3 fw-bold">Live Auction Room</span>
        <span
          className={`badge ${
            auction.status === "ACTIVE" ? "bg-danger" : "bg-secondary"
          }`}
        >
          {auction.status === "ACTIVE" ? "LIVE" : "ENDED"}
        </span>
      </nav>

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

            <p className="text-muted">{remainingTime(auction.endTime)}</p>

            <h1 className="text-primary fw-bold">
              ₹{auction.currentPrice?.toLocaleString()}
            </h1>

            {/* 🏆 WINNER */}
            {auction.status === "COMPLETED" && auction.winnerName && (
              <div className="alert alert-success mt-4 rounded-4">
                🏆 <strong>{auction.winnerName}</strong> won this auction <br />
                Final Price: ₹{auction.finalPrice?.toLocaleString()}
              </div>
            )}

            {/* 💳 PAYMENT – WINNER ONLY */}
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

            {/* 🔨 BIDDING – ONLY WHILE ACTIVE */}
            {auction.status === "ACTIVE" && (
              <div className="mt-4">
                <button
                  className="btn btn-outline-primary btn-lg w-100 mb-3 rounded-pill"
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
                  className="btn btn-primary btn-lg w-100 rounded-pill"
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
          <div className="card-header fw-bold">Bid Activity</div>
          <div className="list-group list-group-flush">
            {bids.length === 0 ? (
              <div className="p-4 text-muted text-center">
                No bids yet
              </div>
            ) : (
              bids.map((b, i) => (
                <div key={i} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>{b.bidderName}</strong>
                      <div className="text-muted small">
                        {formatBidTime(b.bidTime)}
                      </div>
                    </div>
                    <strong>₹{b.bidAmount.toLocaleString()}</strong>
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
