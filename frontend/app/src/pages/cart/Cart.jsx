// src/pages/Cart.js
import React, { useEffect, useState } from "react";
import { getMyCart, removeFromCart } from "../../services/CartService";
import CartItem from "./CartItem";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { startPayment } from "../../util/startPayment";

const Cart = () => {
  const [cart, setCart] = useState({ cars: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Username (UI only)
  const username = localStorage.getItem("username") || "User";

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await getMyCart();
      console.log(data.CartItem);
      setCart(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch cart");
    }
    setLoading(false);
  };

  const handleRemove = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId);
      fetchCart();
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary mb-3"></div>
        <h5>Loading cart...</h5>
      </div>
    );

  if (cart.cars.length === 0)
    return (
      <div className="text-center mt-5">
        <h4>Your cart is empty.</h4>
        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => navigate("/user/dashboard")}
        >
          ⬅ Back to Dashboard
        </button>
      </div>
    );

  return (
    <div className="container my-5">

      {/* 🔹 Header Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0">🛒 My Cart</h4>
            <small className="text-muted">
              Welcome, <strong>{username}</strong>
            </small>
          </div>

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/user/dashboard")}
          >
            ⬅ Back to Cart
          </button>
        </div>
      </div>

      {/* 🔹 Cart Items */}
      {cart.cars.map((item) => (
        <CartItem key={item.id} item={item} onRemove={handleRemove} />
      ))}

      {/* 🔹 Total & Checkout */}
      <div className="card shadow-lg p-4 mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Total Amount</h4>
          <h3 className="text-success fw-bold">
            ₹{cart.totalAmount.toLocaleString()}
          </h3>
        </div>

        <button
          className="btn btn-success btn-lg w-100"
          onClick={() => {
            startPayment({
              amount: cart.totalAmount,
              paymentFor: "CAR_PURCHASE",
              referenceId: cart.cartId,
              title: "Car Purchase Payment",
              onSuccess: () => navigate("/user/dashboard"),
            });
          }}
        >
          <i className="bi bi-cart-check-fill me-2"></i>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
