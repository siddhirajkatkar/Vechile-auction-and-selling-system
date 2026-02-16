import React, { useEffect, useState } from "react";
import { getActiveAuctions } from "../../services/auctionService";
import { Link, useNavigate } from "react-router-dom";

const statusColor = {
  ACTIVE: "bg-success",
  COMPLETED: "bg-secondary",
  CANCELLED: "bg-danger",
};

const Auctions = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "User";

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

  const remainingTime = (endTime) => {
    if (!endTime) return "N/A";
    const diff = new Date(endTime) - new Date();
    if (diff <= 0) return "Ended";

    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    return hrs > 0 ? `${hrs}h ${mins % 60}m left` : `${mins}m left`;
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Loading live auctions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger fw-bold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
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
              🔥 Live <span className="text-primary">Auctions</span>
            </h4>
          </div>

          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
              style={{ width: "38px", height: "38px" }}
            >
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="text-end">
              <div className="fw-bold">{username}</div>
              <div className="small text-muted">Buyer Dashboard</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div
          className="p-4 mb-5 rounded-4 text-white shadow-sm"
          style={{
            background: "linear-gradient(135deg, #0d6efd, #6610f2)",
          }}
        >
          <h1 className="fw-bold mb-1">Bid Before Time Runs Out ⏳</h1>
          <p className="mb-0 opacity-75">
            Explore live vehicle auctions happening right now
          </p>
        </div>

        {auctions.length === 0 ? (
          <div className="text-center text-muted">
            <h5>No auctions available</h5>
            <p>Please check back later 🚀</p>
          </div>
        ) : (
          <div className="row g-4">
            {auctions.map((auction) => (
              <div key={auction.auctionId} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0 rounded-4 auction-card">
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold mb-2">
                      🚗 {auction.brand} {auction.model}
                    </h5>

                    <div className="mb-2">
                      <span className="text-muted small">Current Bid</span>
                      <div className="fs-4 fw-bold text-success">
                        ₹{auction.currentPrice?.toLocaleString()}
                      </div>
                    </div>

                    <span className="badge bg-warning text-dark mb-2">
                      ⏳ {remainingTime(auction.endTime)}
                    </span>

                    <span
                      className={`badge ${
                        statusColor[auction.status] || "bg-primary"
                      } mb-3`}
                    >
                      {auction.status}
                    </span>

                    <Link
                      to={`/user/auction/${auction.auctionId}`}
                      className="btn btn-outline-primary mt-auto fw-semibold rounded-pill"
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

      <style>{`
        .auction-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .auction-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.12);
        }
      `}</style>
    </div>
  );
};

export default Auctions;
