import React, { useEffect, useState } from "react";
import { getMyOrders } from "../../services/orderService";
import "bootstrap/dist/css/bootstrap.min.css";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (err) {
      alert("Failed to load orders");
    }
    setLoading(false);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  if (!orders.length) return <div className="text-center mt-5">No orders yet.</div>;

  return (
    <div className="container py-5">
      <h3 className="mb-4">My Orders</h3>

      {orders.map((order) => (
        <div key={order.id} className="card mb-3 shadow-sm p-3">
          <h5>Order ID: {order.id}</h5>
          <p>Order Time: {new Date(order.orderTime).toLocaleString()}</p>
          <p>Status: <strong>{order.status}</strong></p>
          <p>Total Amount: ₹{order.totalAmount.toLocaleString()}</p>

          <div className="mt-2">
            <h6>Cars:</h6>
            {order.items.map((item) => (
              <div key={item.id} className="d-flex justify-content-between">
                <div>{item.car.brand} {item.car.model}</div>
                <div>₹{item.priceAtAddTime.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrdersPage;
