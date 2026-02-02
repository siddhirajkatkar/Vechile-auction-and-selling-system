import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";

const Checkout = () => {
  const { auctionId } = useParams();
  const navigate = useNavigate();

  // UI-only username (safe default)
  const username = localStorage.getItem("username") || "User";

  const [bankDetails, setBankDetails] = useState({
    accName: "",
    accNo: "",
    ifsc: ""
  });

  const handlePayment = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!bankDetails.accName || !bankDetails.accNo || !bankDetails.ifsc) {
      alert("Please fill all bank details");
      return;
    }

    try {
      // 🔹 Dummy payment API
      await axiosInstance.post(`/api/auctions/pay/${auctionId}`);
      alert("✅ Payment Successful!");
      navigate("/user/my-orders");
    } catch (err) {
      console.error(err);
      alert("❌ Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f3f4f7" }}>

      {/* HEADER */}
      <div className="bg-white shadow-sm border-bottom sticky-top">
        <div className="container py-3 d-flex justify-content-between align-items-center">

          <div>
            <button
              className="btn btn-outline-secondary btn-sm rounded-pill mb-2"
              onClick={() => navigate("/user/dashboard")}
            >
              <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
            </button>
            <h4 className="fw-bold mb-0">
              Secure <span className="text-primary">Checkout</span>
            </h4>
          </div>

          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
              style={{ width: "38px", height: "38px" }}
            >
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="text-end small">
              <div className="fw-bold">{username}</div>
              <div className="text-muted">Payment</div>
            </div>
          </div>

        </div>
      </div>

      {/* CHECKOUT CARD */}
      <div className="container d-flex justify-content-center align-items-center py-5">
        <div className="card shadow border-0 rounded-4 w-100" style={{ maxWidth: "600px" }}>
          <div className="card-body p-5">

            <h3 className="fw-bold mb-3 text-center">
              Complete Payment
            </h3>

            <p className="text-muted text-center mb-4">
              This is a demo payment screen. No real money will be deducted.
            </p>

            <form onSubmit={handlePayment}>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="Enter name"
                  value={bankDetails.accName}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, accName: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Account Number
                </label>
                <input
                  type="password"
                  className="form-control custom-input"
                  placeholder="Enter account number"
                  value={bankDetails.accNo}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, accNo: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  IFSC Code
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="Enter IFSC code"
                  value={bankDetails.ifsc}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, ifsc: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="btn btn-success btn-lg w-100 rounded-pill fw-bold"
              >
                Confirm & Pay
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary w-100 mt-2 rounded-pill"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

            </form>
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .custom-input {
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
          background-color: #fcfcfc;
          transition: all 0.2s;
        }
        .custom-input:focus {
          border-color: #0d6efd;
          background-color: #fff;
          box-shadow: 0 0 0 4px rgba(13,110,253,0.1);
        }
      `}</style>

    </div>
  );
};

export default Checkout;
