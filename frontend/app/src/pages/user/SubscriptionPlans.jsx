import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios";
import { createOrder, verifyPayment } from "../../services/paymentService";

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

  // 🔥 FINAL BUY PLAN WITH PAYMENT
  const buyPlan = async (plan) => {
    try {
      // 1️⃣ Create Razorpay order
      const order = await createOrder(plan.price);

      const options = {
        key: "rzp_test_xxxxx", // 👉 YOUR RAZORPAY TEST KEY
        amount: order.amount,
        currency: "INR",
        name: "AuctionMart",
        description: "Subscription Plan Purchase",
        order_id: order.razorpayOrderId,

        handler: async function (response) {
          // 2️⃣ Verify payment
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          alert("Payment successful!");
          navigate("/user/my-subscription");
        },

        theme: { color: "#0d6efd" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      alert("Payment failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
        <div className="spinner-grow text-primary" role="status" />
        <p className="mt-3 fw-bold text-muted text-uppercase">
          Finding the best deals...
        </p>
      </div>
    );
  }

  return (
    <div className="min-vh-100 pb-5" style={{ backgroundColor: "#f4f7fe" }}>
      {/* HEADER */}
      <div className="bg-dark text-white py-5 mb-5 shadow">
        <div className="container">
          <button
            className="btn btn-outline-light btn-sm mb-3 rounded-pill border-0"
            onClick={() => navigate("/user/dashboard")}
          >
            ← Back to Dashboard
          </button>
          <h1 className="display-5 fw-bold text-center">
            Upgrade Your Bidding Power
          </h1>
          <p className="text-center text-light opacity-75">
            Choose a plan that fits your strategy
          </p>
        </div>
      </div>

      <div className="container">
        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        <div className="row g-4 justify-content-center">
          {plans.map((plan) => {
            const isPremium = plan.price > 1000;

            return (
              <div key={plan.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-lg border-0">
                  <div className="card-body p-5 text-center">
                    <h3 className="fw-bold">{plan.planName}</h3>

                    <div className="my-4">
                      <span className="fs-1 fw-bold">₹{plan.price}</span>
                    </div>

                    <hr />

                    <p>✅ {plan.totalBids} Total Bids</p>
                    <p>✅ {plan.bidsPerAuction} Bids per Auction</p>
                    <p>✅ Priority Notifications</p>

                    <button
                      className={`btn btn-lg w-100 mt-4 ${
                        isPremium
                          ? "btn-warning fw-bold"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => buyPlan(plan)}
                    >
                      {isPremium ? "Get Pro Access" : "Choose Plan"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
