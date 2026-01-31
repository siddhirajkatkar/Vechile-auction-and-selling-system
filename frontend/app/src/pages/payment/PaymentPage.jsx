import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyCart } from "../../services/CartService";
// import { createOrder, verifyPayment } from ".";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getMyCart();
      setCart(data);
    } catch (err) {
      alert("Failed to load cart");
    }
    setLoading(false);
  };

  const handlePayment = async () => {
    try {
      const orderRes = await createOrder(cart.totalAmount);
      const payment = orderRes.data;

      const options = {
        key: "rzp_test_xxxxx", // 🔴 replace
        amount: cart.totalAmount * 100,
        currency: "INR",
        name: "Vehicle Auction",
        description: "Car Purchase Payment",
        image: "https://cdn-icons-png.flaticon.com/512/743/743922.png",
        order_id: payment.razorpayOrderId,

        handler: async function (response) {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          alert("✅ Payment Successful!");
          navigate("/user/dashboard");
        },

        prefill: {
          name: "Customer",
          email: "customer@email.com",
        },

        theme: { color: "#0d6efd" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  if (!cart || cart.cars.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3>Your cart is empty</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-4">

        {/* LEFT: USER + PAYMENT INFO */}
        <div className="col-lg-7">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">Billing Details</h4>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" placeholder="Enter name" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Enter email" />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control" placeholder="Enter phone" />
            </div>
          </div>

          <div className="card shadow-sm p-4 mt-4">
            <h5>Secure Payment</h5>
            <p className="text-muted small">
              Your payment is securely processed by Razorpay. We do not store card details.
            </p>
            <img
              src="https://razorpay.com/assets/razorpay-glyph.svg"
              alt="Razorpay"
              width="80"
            />
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="col-lg-5">
          <div className="card shadow-lg p-4">
            <h4 className="mb-3">Order Summary</h4>

            {cart.cars.map((item) => (
              <div key={item.id} className="d-flex justify-content-between mb-3">
                <div>
                  <strong>{item.brand} {item.model}</strong>
                  <div className="text-muted small">{item.registrationNo}</div>
                </div>
                <div>₹{item.price?.toLocaleString()}</div>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₹{cart.totalAmount?.toLocaleString()}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Platform Fee</span>
              <span className="text-success">Free</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fs-5 fw-bold">
              <span>Total</span>
              <span className="text-success">₹{cart.totalAmount?.toLocaleString()}</span>
            </div>

            <button
              className="btn btn-primary w-100 mt-4 py-2 fw-bold"
              onClick={handlePayment}
            >
              🔒 Pay Securely
            </button>

            <p className="text-center text-muted small mt-2">
              100% secure checkout
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;
