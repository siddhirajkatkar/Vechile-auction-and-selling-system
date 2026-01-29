import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";

const ViewAuction = () => {
  const { auctionId } = useParams();
  const navigate = useNavigate();

  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAuction();
    fetchBidHistory();
    // Refresh history every 10 seconds for "live" feel
    const interval = setInterval(fetchBidHistory, 10000);
    return () => clearInterval(interval);
  }, [auctionId]);

  const fetchAuction = async () => {
    try {
      const res = await axiosInstance.get(`/api/auctions/${auctionId}`);
      setAuction(res.data);
    } catch (err) {
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

  const remainingTime = (endTime) => {
    if (!endTime) return "N/A";
    const diff = new Date(endTime) - new Date();
    if (diff <= 0) return "Auction Ended";
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    return hrs > 0 ? `${hrs}h ${mins % 60}m remaining` : `${mins}m remaining`;
  };

  const placeBid = async () => {
    if (!bidAmount || bidAmount <= (auction.currentPrice || 0)) {
      alert("Bid must be higher than current price!");
      return;
    }

    try {
      await axiosInstance.post(`/api/bids/place/${auctionId}`, { bidAmount });
      setMessage("✅ Bid placed successfully!");
      setBidAmount("");
      fetchAuction();
      fetchBidHistory();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Bid failed");
    }
  };

  if (loading) return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="spinner-border text-primary" role="status" />
    </div>
  );

  return (
    <div className="min-vh-100 pb-5" style={{ backgroundColor: "#f0f2f5" }}>
      {/* Bootstrap Icons */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net" />

      {/* STICKY HEADER */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4 py-3 sticky-top">
        <div className="container-fluid">
          <button className="btn btn-outline-light btn-sm rounded-pill" onClick={() => navigate("/user/dashboard")}>
            <i className="bi bi-arrow-left me-2"></i>Dashboard
          </button>
          <span className="navbar-brand ms-3 fw-bold">Live Auction Room</span>
          <div className="ms-auto d-flex align-items-center">
             <span className="badge bg-danger pulse-animation me-2">LIVE</span>
             <span className="text-white-50 small">{remainingTime(auction.endTime)}</span>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        {message && (
          <div className="alert alert-primary border-0 shadow-sm rounded-4 text-center py-2 mb-4 animate__animated animate__fadeIn">
            {message}
          </div>
        )}

        <div className="row g-4">
          {/* LEFT: CAR & BIDDING */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
              <div className="p-4 bg-white border-bottom">
                <h2 className="fw-bold mb-0 text-dark">{auction.brand} {auction.model}</h2>
                <p className="text-muted mb-0">{auction.manufactureYear} • {auction.fuelType} • Registered: {auction.registrationNo}</p>
              </div>
              
              <div className="card-body p-4 text-center bg-light">
                <p className="text-uppercase small fw-bold text-muted mb-1">Current Highest Bid</p>
                <h1 className="display-3 fw-bold text-primary mb-4">₹{auction.currentPrice?.toLocaleString()}</h1>
                
                <div className="bg-white p-4 rounded-4 shadow-sm border mx-auto" style={{ maxWidth: "450px" }}>
                  <label className="form-label fw-bold small text-muted">PLACE YOUR BID (INR)</label>
                  <div className="input-group input-group-lg mb-3">
                    <span className="input-group-text bg-white border-end-0">₹</span>
                    <input
                      type="number"
                      className="form-control border-start-0 ps-0 fw-bold"
                      placeholder={`Min: ${(auction.currentPrice + 1000).toLocaleString()}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary btn-lg w-100 rounded-pill fw-bold py-3 shadow" onClick={placeBid}>
                    Place Bid Now
                  </button>
                  <p className="small text-muted mt-3 mb-0">
                    <i className="bi bi-shield-check text-success me-1"></i> Secure Encrypted Bidding
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: LIVE BID HISTORY */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
              <div className="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">Bid Activity</h5>
                <span className="badge bg-light text-dark border">{bids.length} Bids</span>
              </div>
              <div className="card-body p-0 overflow-auto" style={{ maxHeight: "500px" }}>
                {bids.length === 0 ? (
                  <div className="p-5 text-center text-muted">
                    <i className="bi bi-chat-left-dots mb-3 d-block fs-1"></i>
                    <p>No activity yet. Be the first to bid!</p>
                  </div>
                ) : (
                  <div className="list-group list-group-flush">
                    {bids.map((b, i) => (
                      <div key={i} className={`list-group-item p-3 border-0 border-start border-4 ${i === 0 ? 'border-primary bg-primary bg-opacity-10' : 'border-light'}`}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <p className="mb-0 fw-bold">{b.bidderName}</p>
                            <small className="text-muted">Just Now</small>
                          </div>
                          <div className="text-end">
                            <p className={`mb-0 fw-bold ${i === 0 ? 'text-primary' : ''}`}>₹{b.bidAmount.toLocaleString()}</p>
                            {i === 0 && <span className="badge bg-primary rounded-pill small">Highest</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pulse-animation {
          animation: pulse-red 2s infinite;
        }
        @keyframes pulse-red {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
        }
        .animate__fadeIn { animation: fadeIn 0.5s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default ViewAuction;