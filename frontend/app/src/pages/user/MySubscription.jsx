import React, { useEffect, useState } from "react";
import axios from "../../services/axios";

const MySubscription = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMySubscription();
  }, []);

  const fetchMySubscription = async () => {
    try {
      const response = await axios.get("/api/subscriptions/me");
      // example API: GET /user/subscription
      setSubscription(response.data);
    } catch (err) {
      setError("Failed to load subscription details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading subscription...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red", textAlign: "center" }}>{error}</h2>;
  }

  if (!subscription) {
    return <p style={{ textAlign: "center" }}>No active subscription</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Subscription</h1>

      <div style={{ border: "1px solid #ccc", padding: "15px", width: "400px" }}>
        <p><b>Plan:</b> {subscription.planName}</p>
        <p><b>Status:</b> {subscription.status}</p>
        <p><b>Start Date:</b> {subscription.startDate}</p>
        <p><b>End Date:</b> {subscription.endDate}</p>
        <p><b>Bids Left:</b> {subscription.remainingBids}</p>
      </div>
    </div>
  );
};

export default MySubscription;
