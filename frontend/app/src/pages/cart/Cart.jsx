// src/pages/Cart.js
import React, { useEffect, useState } from "react";
import { getMyCart, removeFromCart } from "../../services/CartService";
import CartItem from "./CartItem";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const [cart, setCart] = useState({ cars: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await getMyCart();
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
      fetchCart(); // refresh cart after removal
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div> Loading cart...</div>;

  if (cart.cars.length === 0) 
    return <div className="text-center mt-5"><h4>Your cart is empty.</h4></div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">My Cart</h2>

      {/* Cart Items */}
      {cart.cars.map((item) => (
        <CartItem key={item.id} item={item} onRemove={handleRemove} />
      ))}

      {/* Total & Checkout */}
      <div className="card shadow-sm p-3 mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Total Amount:</h4>
          <h4 className="text-success">₹{cart.totalAmount.toLocaleString()}</h4>
        </div>
        <button className="btn btn-success btn-lg w-100 mt-3">
          <i className="bi bi-cart-check-fill me-2"></i> Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
