import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get("/api/subscriptions/plans");
      setPlans(response.data);
    } catch (err) {
      setError("Failed to load subscription plans");
    } finally {
      setLoading(false);
    }
  };

  const buyPlan = async (planName) => {
    try {
      await axios.post(`/api/subscriptions/buy/${planName}`);
      alert("Subscription purchased successfully!");
      navigate("/user/my-subscription");
    } catch (err) {
      alert("Failed to purchase subscription");
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
        <div className="spinner-grow text-primary" role="status" />
        <p className="mt-3 fw-bold text-muted text-uppercase tracking-widest">Finding the best deals...</p>
      </div>
    );
  }

  return (
    <div className="min-vh-100 pb-5" style={{ backgroundColor: "#f4f7fe" }}>
      {/* Load Icons */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net" />

      {/* HEADER & NAVIGATION */}
      <div className="bg-dark text-white py-5 mb-5 shadow">
        <div className="container">
          <button 
            className="btn btn-outline-light btn-sm mb-3 rounded-pill border-0"
            onClick={() => navigate("/user/dashboard")}
          >
            <i className="bi bi-arrow-left me-2"></i> Back to Dashboard
          </button>
          <h1 className="display-5 fw-bold text-center">Upgrade Your Bidding Power</h1>
          <p className="text-center text-light opacity-75">Choose a plan that fits your car-buying strategy</p>
        </div>
      </div>

      <div className="container">
        {error && <div className="alert alert-danger rounded-4 text-center shadow-sm">{error}</div>}

        <div className="row g-4 justify-content-center">
          {plans.map((plan) => {
            const isPremium = plan.price > 1000; // Visual logic for a "Featured" plan

            return (
              <div key={plan.planId} className="col-12 col-md-6 col-lg-4">
                <div className={`card h-100 border-0 shadow-lg plan-card ${isPremium ? 'featured-card' : ''}`}>
                  {isPremium && (
                    <div className="premium-badge">Most Popular</div>
                  )}
                  
                  <div className="card-body p-5 text-center">
                    <h3 className="fw-bold mb-1">{plan.planName}</h3>
                    <div className="price-tag my-4">
                      <span className="currency">₹</span>
                      <span className="amount">{plan.price}</span>
                      <span className="duration">/one-time</span>
                    </div>

                    <hr className="my-4 opacity-10" />

                    <div className="features-list text-start mb-4">
                      <div className="feature-item">
                        <i className="bi bi-check-circle-fill text-success me-3"></i>
                        <span><strong>{plan.totalBids}</strong> Total Bids</span>
                      </div>
                      <div className="feature-item">
                        <i className="bi bi-check-circle-fill text-success me-3"></i>
                        <span><strong>{plan.bidsPerAuction}</strong> Bids per Auction</span>
                      </div>
                      <div className="feature-item">
                        <i className="bi bi-check-circle-fill text-success me-3"></i>
                        <span>Priority Notifications</span>
                      </div>
                      <div className="feature-item">
                        <i className="bi bi-check-circle-fill text-success me-3"></i>
                        <span>24/7 Support Access</span>
                      </div>
                    </div>

                    <button
                      className={`btn btn-lg w-100 rounded-pill fw-bold py-3 transition-btn ${
                        isPremium ? 'btn-warning shadow' : 'btn-outline-primary'
                      }`}
                      onClick={() => buyPlan(plan.planName)}
                    >
                      {isPremium ? 'Get Pro Access' : 'Choose Plan'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .plan-card {
          border-radius: 24px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: #ffffff;
        }
        .plan-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15) !important;
        }
        .featured-card {
          background: linear-gradient(145deg, #ffffff, #fef9e7);
          border: 2px solid #ffc107 !important;
        }
        .premium-badge {
          background: #ffc107;
          color: #000;
          font-weight: 800;
          font-size: 0.75rem;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 0 0 12px 12px;
          width: fit-content;
          margin: 0 auto;
        }
        .price-tag .amount {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -2px;
        }
        .price-tag .currency {
          font-size: 1.5rem;
          vertical-align: super;
          font-weight: 600;
        }
        .price-tag .duration {
          color: #6c757d;
          font-size: 0.9rem;
        }
        .feature-item {
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          font-size: 1.05rem;
        }
        .transition-btn {
          transition: all 0.2s ease;
        }
        .transition-btn:active {
          transform: scale(0.95);
        }
        .tracking-widest { letter-spacing: 0.2em; }
      `}</style>
    </div>
  );
};

export default SubscriptionPlans;