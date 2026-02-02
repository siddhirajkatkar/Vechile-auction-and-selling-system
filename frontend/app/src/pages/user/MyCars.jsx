import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";
import CarDetailsModal from "./CarDetailsModal";

const statusBadge = {
  DRAFT: "bg-secondary bg-opacity-10 text-secondary",
  PENDING_APPROVAL: "bg-warning bg-opacity-10 text-dark",
  AVAILABLE: "bg-success bg-opacity-10 text-success",
  UNDER_AUCTION: "bg-primary bg-opacity-10 text-primary",
  AUCTION_COMPLETED: "bg-info bg-opacity-10 text-info",
  SOLD: "bg-dark text-white",
  CANCELLED: "bg-danger bg-opacity-10 text-danger",
};

const MyCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [auctionLoadingId, setAuctionLoadingId] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const navigate = useNavigate();

  // UI-only username (safe default)
  const username = localStorage.getItem("username") || "User";

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

  // ✅ SUBMIT FOR APPROVAL
  const submitForApproval = async (carId) => {
    if (!window.confirm("Submit this car for admin approval?")) return;

    try {
      await axiosInstance.put(`/api/cars/submit/${carId}`);
      setCars(prev =>
        prev.map(car =>
          car.id === carId
            ? { ...car, status: "PENDING_APPROVAL" }
            : car
        )
      );
      setMessage("✅ Car submitted for approval");
    } catch {
      setMessage("❌ Submission failed");
    }
  };

  const startAuction = async (carId) => {
    if (!window.confirm("Start auction for this car?")) return;

    try {
      setAuctionLoadingId(carId);
      await axiosInstance.post(`/api/auctions/start/${carId}`);
      setCars(prev =>
        prev.map(car =>
          car.id === carId
            ? { ...car, status: "UNDER_AUCTION" }
            : car
        )
      );
      setMessage("✅ Auction started!");
    } catch {
      setMessage("❌ Auction failed");
    } finally {
      setAuctionLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this car listing?")) return;

    try {
      await axiosInstance.delete(`/api/cars/${id}`);
      setCars(prev => prev.filter(c => c.id !== id));
      setMessage("🗑️ Car deleted successfully");
    } catch {
      setMessage("❌ Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <div className="min-vh-100 pb-5" style={{ backgroundColor: "#fcfcfd" }}>

      {/* HEADER */}
      <div className="bg-white border-bottom shadow-sm sticky-top">
        <div className="container py-3 d-flex justify-content-between align-items-center">

          {/* LEFT */}
          <div>
            <button
              className="btn btn-outline-secondary btn-sm rounded-pill mb-2"
              onClick={() => navigate("/user/dashboard")}
            >
              <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
            </button>

            <h4 className="fw-bold mb-0">
              My <span className="text-primary">Garage</span>
            </h4>
          </div>

          {/* RIGHT */}
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={() => navigate("/user/add-car")}
            >
              <i className="bi bi-plus-circle me-2"></i> List New Car
            </button>

            <div className="d-flex align-items-center gap-2">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                style={{ width: "38px", height: "38px" }}
              >
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="text-end small">
                <div className="fw-bold text-dark">{username}</div>
                <div className="text-muted">Seller</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CONTENT */}
      <div className="container mt-5">

        {message && (
          <div className="alert alert-dark text-center">{message}</div>
        )}

        <div className="row g-4">
          {cars.map((car) => (
            <div className="col-lg-4 col-md-6" key={car.id}>
              <div
                className="card car-card h-100 border-0 shadow-sm"
                onClick={() => setSelectedCar(car)}
              >

                <div className="position-relative">
                  <img
                    src={`http://localhost:8080${car.images?.[0]?.imageUrl}`}
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                    alt=""
                  />
                  <span className={`status-pill ${statusBadge[car.status]}`}>
                    {car.status.replace("_", " ")}
                  </span>
                </div>

                <div className="card-body p-4">
                  <h5 className="fw-bold">
                    {car.brand} {car.model}
                  </h5>
                  <p className="text-muted small">
                    {car.manufactureYear} • {car.fuelType}
                  </p>

                  <h4 className="text-primary fw-bold mb-3">
                    ₹{car.price?.toLocaleString()}
                  </h4>

                  <div className="d-flex gap-2">

                    {car.status === "DRAFT" && (
                      <button
                        className="btn btn-outline-dark btn-sm w-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/user/edit-car/${car.id}`);
                        }}
                      >
                        Edit
                      </button>
                    )}

                    {car.status === "DRAFT" && (
                      <button
                        className="btn btn-warning btn-sm w-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          submitForApproval(car.id);
                        }}
                      >
                        Submit
                      </button>
                    )}

                    {car.status === "AVAILABLE" && (
                      <button
                        className="btn btn-success btn-sm w-100"
                        disabled={auctionLoadingId === car.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          startAuction(car.id);
                        }}
                      >
                        Auction
                      </button>
                    )}

                    <button
                      className="btn btn-outline-danger btn-sm w-100"
                      disabled={[
                        "UNDER_AUCTION",
                        "AUCTION_COMPLETED",
                        "SOLD",
                      ].includes(car.status)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(car.id);
                      }}
                    >
                      Delete
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <CarDetailsModal
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
      />

      {/* STYLES */}
      <style>{`
        .car-card {
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .car-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.12);
        }
        .status-pill {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }
      `}</style>

    </div>
  );
};

export default MyCars;
