import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { useNavigate } from "react-router-dom";

const statusBadge = {
  DRAFT: "bg-secondary",
  PENDING_APPROVAL: "bg-warning text-dark",
  AVAILABLE: "bg-success",
  UNDER_AUCTION: "bg-primary",
  SOLD: "bg-dark",
  CANCELLED: "bg-danger",
};

const MyCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [auctionLoadingId, setAuctionLoadingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCars();
  }, []);

  const fetchMyCars = async () => {
    try {
      const res = await axiosInstance.get("/api/cars/mine");
      setCars(Array.isArray(res.data) ? res.data : []);
    } catch {
      setMessage("❌ Failed to load your cars");
    } finally {
      setLoading(false);
    }
  };

  // auto clear messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // ⭐ START AUCTION (FINAL LOGIC)
  const startAuction = async (carId) => {
    if (!window.confirm("Start auction for this car?")) return;

    try {
      setAuctionLoadingId(carId);

      // 1️⃣ Hit backend
      await axiosInstance.post(`/api/auctions/start/${carId}`);

      // 2️⃣ Update local state
      setCars((prev) =>
        prev.map((car) =>
          car.id === carId
            ? { ...car, status: "UNDER_AUCTION" }
            : car
        )
      );

      // 3️⃣ UX feedback
      setMessage("✅ Auction started! Car is now live.");

      // 4️⃣ Redirect to Cars For Auction page
      setTimeout(() => {
        navigate("/auctions"); // 🔥 this page shows active auctions
      }, 1200);

    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "❌ Auction could not be started"
      );
    } finally {
      setAuctionLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this car?")) return;

    try {
      await axiosInstance.delete(`/api/cars/${id}`);
      setCars((prev) => prev.filter((c) => c.id !== id));
      setMessage("🗑️ Car deleted successfully");
    } catch {
      setMessage("❌ Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Loading your cars...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold text-primary">
        🚗 My Listed Cars
      </h2>

      {message && (
        <div className="alert alert-info text-center fw-semibold">
          {message}
        </div>
      )}

      {cars.length === 0 ? (
        <div className="text-center text-muted">
          <h5>No cars listed yet</h5>
          <p>Start by adding your first car 🚀</p>
        </div>
      ) : (
        <div className="row g-4">
          {cars.map((car) => (
            <div className="col-lg-4 col-md-6" key={car.id}>
              <div className="card h-100 shadow-sm rounded-4 border-0">
                {car.images?.length > 0 ? (
                  <img
                    src={`http://localhost:8080${car.images[0].imageUrl}`}
                    className="card-img-top rounded-top-4"
                    style={{ height: "200px", objectFit: "cover" }}
                    alt={`${car.brand} ${car.model}`}
                  />
                ) : (
                  <div className="bg-light text-center py-5">
                    No Image Available
                  </div>
                )}

                <div className="card-body">
                  <h5 className="fw-bold">
                    {car.brand} {car.model}
                  </h5>

                  <p className="mb-1">
                    <strong>Year:</strong> {car.manufactureYear}
                  </p>
                  <p className="mb-2">
                    <strong>Price:</strong> ₹{car.price?.toLocaleString()}
                  </p>

                  <span
                    className={`badge ${
                      statusBadge[car.status] || "bg-secondary"
                    }`}
                  >
                    {car.status}
                  </span>
                </div>

                <div className="card-footer bg-white border-0 d-flex flex-wrap gap-2 justify-content-between">
  <button
    className="btn btn-sm btn-outline-primary"
    onClick={() => navigate(`/cars/${car.id}`)}
  >
    View
  </button>

  {/* EDIT */}
  <button
    className="btn btn-sm btn-outline-secondary"
    disabled={car.status !== "DRAFT"}
    onClick={() => navigate(`/user/edit-car/${car.id}`)}
  >
    Edit
  </button>

  {/* SUBMIT FOR APPROVAL */}
  {car.status === "DRAFT" && (
    <button
      className="btn btn-sm btn-warning"
      onClick={() => submitForApproval(car.id)}
    >
      Submit
    </button>
  )}

  {/* START AUCTION */}
  {car.status === "AVAILABLE" && (
    <button
      className="btn btn-sm btn-success"
      disabled={auctionLoadingId === car.id}
      onClick={() => startAuction(car.id)}
    >
      {auctionLoadingId === car.id
        ? "Starting..."
        : "Start Auction"}
    </button>
  )}

  {/* DELETE */}
  <button
    className="btn btn-sm btn-danger"
    disabled={car.status === "UNDER_AUCTION"}
    onClick={() => handleDelete(car.id)}
  >
    Delete
  </button>
</div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCars;
