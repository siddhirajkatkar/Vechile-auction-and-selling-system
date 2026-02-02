import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";

const Checkout = () => {
  const { auctionId } = useParams();
  const navigate = useNavigate();

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
      // 🔹 Dummy payment API (marks auction as paid)
      await axiosInstance.post(`/api/auctions/pay/${auctionId}`);

      alert("✅ Payment Successful!");
      navigate("/user/my-orders"); // or dashboard

    } catch (err) {
      console.error(err);
      alert("❌ Payment failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow border-0 rounded-4">
        <div className="card-body p-5">
          <h3 className="fw-bold mb-4 text-center">
            Complete Payment
          </h3>

          <p className="text-muted text-center mb-4">
            This is a demo payment screen. No real money will be deducted.
          </p>

          <form onSubmit={handlePayment}>
            <div className="mb-3">
              <label className="form-label">Account Holder Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={bankDetails.accName}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, accName: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Account Number</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter account number"
                value={bankDetails.accNo}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, accNo: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="form-label">IFSC Code</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter IFSC code"
                value={bankDetails.ifsc}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, ifsc: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-success btn-lg w-100 rounded-pill"
            >
              Confirm & Pay
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary w-100 mt-2"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
