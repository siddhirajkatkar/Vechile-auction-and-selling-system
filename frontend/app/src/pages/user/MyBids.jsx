import { useEffect, useState } from "react";
import { getMyBids } from "../../services/bidService";
import { useNavigate } from "react-router-dom";

const statusColor = {
  ACTIVE: "bg-success",
  COMPLETED: "bg-secondary",
  CANCELLED: "bg-danger",
};

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadBids();
  }, []);

  const loadBids = async () => {
    try {
      const res = await getMyBids();
      setBids(res.data);
    } catch (err) {
      console.error("Failed to load bids", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Loading your bids...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">

      {/* 🔥 Header */}
      <div
        className="p-4 mb-4 rounded-4 text-white d-flex justify-content-between align-items-center"
        style={{
          background: "linear-gradient(135deg, #0d6efd, #6610f2)",
        }}
      >
        <div>
          <h2 className="fw-bold mb-1">📌 My Bids</h2>
          <p className="mb-0 opacity-75">
            Track all bids you have placed so far
          </p>
        </div>

        {/* 🔙 Back to Dashboard */}
        <button
          className="btn btn-light fw-semibold"
          onClick={() => navigate("/user/dashboard")}
        >
          ← Dashboard
        </button>
      </div>

      {/* Empty State */}
      {bids.length === 0 ? (
        <div className="text-center text-muted mt-5">
          <h5>No bids placed yet</h5>
          <p>Start bidding on live auctions 🚀</p>
        </div>
      ) : (
        <div className="row g-4">
          {bids.map((bid, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body">

                  <h5 className="fw-bold mb-2">
                    🚗 {bid.brand} {bid.model}
                  </h5>

                  <p className="mb-2">
                    <span className="text-muted">Your Bid</span>
                    <br />
                    <span className="fs-4 fw-bold text-success">
                      ₹{bid.bidAmount.toLocaleString()}
                    </span>
                  </p>

                  <p className="mb-3 text-muted">
                    ⏰ {new Date(bid.bidTime).toLocaleString()}
                  </p>

                  <span
                    className={`badge ${
                      statusColor[bid.auctionStatus] || "bg-primary"
                    }`}
                  >
                    {bid.auctionStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBids;
