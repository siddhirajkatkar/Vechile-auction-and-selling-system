// src/pages/payment/PaymentPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyCart } from "../../services/CartService"; // make sure this returns cart data
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch cart on mount
  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await getMyCart();
      setCart(data); // { cars: [...], totalAmount: ... }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch cart");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!cart || cart.cars.length === 0) {
    return (
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <h3>Your cart is empty!</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/user/cars")}
        >
          Browse Cars
        </button>
      </div>
    );
  }

  const handlePayment = () => {
    // Future: integrate payment gateway here
    alert(`Payment of ₹${cart.totalAmount.toLocaleString()} successful!`);
    navigate("/user/dashboard");
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Payment Summary</h2>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Items in Cart</h5>
          {cart.cars.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2"
            >
              <div className="d-flex align-items-center">
                {item.images?.[0]?.url ? (
                  <img
                    src={item.images[0].url}
                    alt={item.model}
                    style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "5px", marginRight: "10px" }}
                  />
                ) : (
                  <div
                    className="bg-light d-flex justify-content-center align-items-center"
                    style={{ width: "80px", height: "60px", marginRight: "10px", borderRadius: "5px" }}
                  >
                    No Image
                  </div>
                )}
                <div>
                  <strong>{item.brand} {item.model}</strong>
                  <p className="mb-0 text-muted" style={{ fontSize: "0.85rem" }}>{item.registrationNo}</p>
                </div>
              </div>
              <span className="fw-bold">₹{item.price?.toLocaleString() || 0}</span>
            </div>
          ))}

          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <h5>Total Amount:</h5>
            <h4 className="text-success fw-bold">₹{cart.totalAmount?.toLocaleString() || 0}</h4>
          </div>
        </div>
      </div>

      <button
        className="btn btn-success w-100 btn-lg fw-bold"
        onClick={handlePayment}
      >
        Pay ₹{cart.totalAmount?.toLocaleString() || 0}
      </button>
    </div>
  );
};

export default PaymentPage;
