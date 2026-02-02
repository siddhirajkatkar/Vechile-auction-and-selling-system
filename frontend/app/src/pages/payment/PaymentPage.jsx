import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyCart } from "../../services/CartService";
import { createOrder, verifyPayment } from "../../services/paymentService";
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
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
// <<<<<<< HEAD
      const orderRes = await createOrder(cart.totalAmount);
      const payment = orderRes;
//         console.log(cart.totalAmount);
// =======
//       // 1️⃣ Create Razorpay order (JWT REQUIRED)
//       const payment = await createOrder(cart.totalAmount);

//       // 2️⃣ Razorpay checkout — MINIMAL & SAFE CONFIG
// >>>>>>> a674a0fdb23fde66a3a7cb4f7ae75e0df962642e
      const options = {
        key: "rzp_test_SBA7ydUnLAocKr", // must match backend key
        order_id: payment.razorpayOrderId,

        name: "Vehicle Auction",
        description: "Checkout Payment",

        handler: async function (response) {
          // 3️⃣ Verify payment (NO JWT)
          await verifyPayment({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });

          alert("✅ Payment Successful!");
          navigate("/user/dashboard");
        }
      };

      new window.Razorpay(options).open();

    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

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

        {/* LEFT: INFO */}
        <div className="col-lg-7">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">Billing Details</h4>
            <p className="text-muted small">
              Payment will be securely processed via Razorpay.
            </p>
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="col-lg-5">
          <div className="card shadow-lg p-4 border-primary">
            <h4 className="mb-3">Order Summary</h4>

            {cart.cars.map((item) => (
              <div key={item.id} className="d-flex justify-content-between mb-3">
                <div>
                  <strong>{item.brand} {item.model}</strong>
                  <div className="text-muted small">
                    {item.registrationNo}
                  </div>
                </div>
                <div>₹{item.price?.toLocaleString()}</div>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between fs-5 fw-bold">
              <span>Total</span>
              <span className="text-success">
                ₹{cart.totalAmount?.toLocaleString()}
              </span>
            </div>

            <button
              className="btn btn-primary w-100 mt-4 py-3 fw-bold"
              onClick={handlePayment}
            >
              🔒 Pay Securely
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;
