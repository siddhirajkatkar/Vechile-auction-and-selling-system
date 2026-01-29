import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios";

const MySubscription = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchMySubscription();
  }, []);

  const fetchMySubscription = async () => {
    try {
      const response = await axios.get("/api/subscriptions/me");
      setSubscription(response.data);
    } catch (err) {
      setError("Failed to load subscription details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
        <div className="spinner-border text-primary mb-3" role="status" />
        <h5 className="text-muted text-uppercase tracking-wider">Syncing Account...</h5>
      </div>
    );
  }

  // Back Button Component for reuse
  const BackButton = () => (
    <button 
      className="btn btn-link text-decoration-none text-dark fw-bold mb-4 p-0"
      onClick={() => navigate("/user/dashboard")}
    >
      <i className="bi bi-arrow-left me-2"></i> Back to Dashboard
    </button>
  );

  if (error || !subscription) {
    return (
      <div className="container py-5 text-center">
        <BackButton />
        <div className="card border-0 shadow-sm p-5 mx-auto" style={{ maxWidth: "500px", borderRadius: "20px" }}>
          <div className="mb-4">
            <i className="bi bi-exclamation-circle text-warning" style={{ fontSize: "3rem" }}></i>
          </div>
          <h4>{error || "No Active Subscription"}</h4>
          <p className="text-muted">You need an active plan to participate in auctions.</p>
          <button className="btn btn-primary px-4 py-2 rounded-pill mt-3" onClick={() => navigate("/user/subscriptions")}>
            View Premium Plans
          </button>
        </div>
      </div>
    );
  }

  const isActive = subscription.status === "ACTIVE";
  const totalBids = subscription.plan?.totalBids || 1;
  const bidPercentage = (subscription.bidsRemaining / totalBids) * 100;

  return (
    <div className="min-vh-100 pb-5" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Load Icons */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net" />

      {/* HEADER SECTION */}
      <div className="bg-dark py-4 mb-5 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h4 className="text-white mb-0 fw-bold">My Subscription</h4>
          <button className="btn btn-outline-light btn-sm rounded-pill px-3" onClick={() => navigate("/user/dashboard")}>
            <i className="bi bi-house-door me-2"></i> Dashboard
          </button>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg subscription-card">
              
              {/* TOP HEADER */}
              <div className={`status-banner ${isActive ? 'bg-success' : 'bg-danger'}`}>
                {isActive ? 'PRO USER' : 'EXPIRED'}
              </div>

              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <span className="text-muted text-uppercase small fw-bold">Current Plan</span>
                  <h2 className="fw-bold text-primary mb-0">{subscription.plan?.planName}</h2>
                </div>

                {/* BIDS PROGRESS CIRCLE/BAR */}
                <div className="mb-5">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold">Bids Remaining</span>
                    <span className="text-primary fw-bold">{subscription.bidsRemaining} / {totalBids}</span>
                  </div>
                  <div className="progress" style={{ height: "12px", borderRadius: "10px" }}>
                    <div 
                      className={`progress-bar progress-bar-striped progress-bar-animated ${bidPercentage < 20 ? 'bg-danger' : 'bg-primary'}`} 
                      role="progressbar" 
                      style={{ width: `${bidPercentage}%` }}
                    ></div>
                  </div>
                  <p className="small text-muted mt-2 text-center italic">
                    {subscription.bidsRemaining === 0 ? "You've run out of bids! Renew to continue." : "Your bidding power is active."}
                  </p>
                </div>

                {/* INFO GRID */}
                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <div className="info-box">
                      <i className="bi bi-calendar-check text-success"></i>
                      <label>Started</label>
                      <span>{new Date(subscription.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="info-box">
                      <i className="bi bi-calendar-x text-danger"></i>
                      <label>Expires</label>
                      <span>{new Date(subscription.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="d-grid gap-2">
                  <button className="btn btn-dark btn-lg rounded-pill fw-bold" onClick={() => navigate("/user/subscriptions")}>
                    {isActive ? "Upgrade Plan" : "Renew Subscription"}
                  </button>
                  <button className="btn btn-link text-muted mt-2 border-0 text-decoration-none" onClick={() => navigate("/user/dashboard")}>
                    Return to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .subscription-card {
          border-radius: 30px;
          overflow: hidden;
          background: #fff;
          transition: transform 0.3s ease;
        }
        .status-banner {
          color: white;
          text-align: center;
          font-weight: 800;
          font-size: 0.8rem;
          padding: 8px;
          letter-spacing: 2px;
        }
        .info-box {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 15px;
          text-align: center;
        }
        .info-box i {
          font-size: 1.2rem;
          display: block;
          margin-bottom: 5px;
        }
        .info-box label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          color: #adb5bd;
          font-weight: 700;
          margin: 0;
        }
        .info-box span {
          font-weight: 700;
          font-size: 0.9rem;
          color: #212529;
        }
        .tracking-wider { letter-spacing: 0.15em; }
      `}</style>
    </div>
  );
};

export default MySubscription;