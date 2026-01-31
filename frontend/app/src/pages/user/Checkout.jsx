import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";

const Checkout = () => {
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const [bankDetails, setBankDetails] = useState({ accName: "", accNo: "", ifsc: "" });

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      // 1. Create Order (Schema: orders table)
      const orderRes = await axiosInstance.post("/api/orders/create-from-auction", { auctionId });
      
      // 2. Simulate Payment (Schema: payments table)
      await axiosInstance.post(`/api/payments/process`, {
        orderId: orderRes.data.order_id,
        amount: orderRes.data.amount,
        method: "Bank Transfer",
        transactionId: "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase()
      });

      alert("Payment Successful! Order Confirmed.");
      navigate("/user/my-orders");
    } catch (err) {
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow border-0 rounded-4">
        <div className="card-body p-5">
          <h3 className="fw-bold mb-4 text-center">Finalize Purchase</h3>
          <form onSubmit={handlePayment}>
            <div className="mb-3">
              <label className="form-label">Account Holder Name</label>
              <input type="text" className="form-control" required onChange={e => setBankDetails({...bankDetails, accName: e.target.value})} />
            </div>
            <div className="mb-3">
              <label className="form-label">Account Number</label>
              <input type="password" className="form-control" required onChange={e => setBankDetails({...bankDetails, accNo: e.target.value})} />
            </div>
            <div className="mb-4">
              <label className="form-label">IFSC Code</label>
              <input type="text" className="form-control" required onChange={e => setBankDetails({...bankDetails, ifsc: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill">Confirm & Pay</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;