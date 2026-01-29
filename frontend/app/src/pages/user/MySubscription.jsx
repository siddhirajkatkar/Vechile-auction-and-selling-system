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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h4>Loading subscription...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <h4 className="text-danger">{error}</h4>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/user/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="container text-center mt-5">
        <h5>No active subscription</h5>
        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => navigate("/user/subscriptions")}
        >
          View Plans
        </button>
      </div>
    );
  }

  const isActive = subscription.status === "ACTIVE";

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">My Subscription</h2>

      <div className="card shadow-sm mx-auto" style={{ maxWidth: "420px" }}>
        <div className="card-body">
          <p>
            <strong>Plan:</strong> {subscription.plan?.planName}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`badge ${
                isActive ? "bg-success" : "bg-danger"
              }`}
            >
              {subscription.status}
            </span>
          </p>

          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(subscription.startDate).toLocaleString()}
          </p>

          <p>
            <strong>End Date:</strong>{" "}
            {new Date(subscription.endDate).toLocaleString()}
          </p>

          <p>
            <strong>Bids Remaining:</strong>{" "}
            <span className="fw-bold">{subscription.bidsRemaining}</span>
          </p>

          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/user/dashboard")}
            >
              Dashboard
            </button>

            {!isActive && (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/user/subscriptions")}
              >
                Renew Plan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySubscription;
