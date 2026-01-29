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

  // 🔄 Loading state
  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading subscription plans...</p>
      </div>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Subscription Plans</h2>

      <div className="row justify-content-center">
        {plans.map((plan) => (
          <div key={plan.planId} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm text-center">
              <div className="card-body">
                <h4 className="card-title text-primary">
                  {plan.planName}
                </h4>

                <h5 className="my-3">
                  ₹{plan.price}
                </h5>

                <p className="card-text">
                  <strong>Total Bids:</strong> {plan.totalBids}
                </p>
                <p className="card-text">
                  <strong>Bids per Auction:</strong> {plan.bidsPerAuction}
                </p>

                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => buyPlan(plan.planName)}
                >
                  Buy Plan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
