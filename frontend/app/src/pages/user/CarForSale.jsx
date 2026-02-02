import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { useNavigate } from "react-router-dom";
import CarDetailsModal from "./CarDetailsModal";

const CarsForSale = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });

  const navigate = useNavigate();

  // UI-only username (safe default)
  const username = localStorage.getItem("username") || "User";

  const fetchCars = async () => {
    try {
      const res = await axiosInstance.get("/api/cars");
      const cleanedCars = (Array.isArray(res.data) ? res.data : []).map(car => ({
        ...car,
        images: (car.images || []).map(img => ({
          id: img.id,
          imageUrl: img.imageUrl
        }))
      }));
      setCars(cleanedCars);
    } catch {
      alert("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (carId) => {
    try {
      await axiosInstance.post(`/api/cart/add/${carId}`);
      setToast({ show: true, message: "Car added to cart successfully!" });
      setTimeout(() => setToast({ show: false, message: "" }), 3000);
    } catch {
      setToast({ show: true, message: "Failed to add car to cart!" });
      setTimeout(() => setToast({ show: false, message: "" }), 3000);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-grow text-primary" />
      </div>
    );
  }

  return (
    <div className="min-vh-100 pb-5" style={{ backgroundColor: "#f3f4f7" }}>

      {/* HEADER */}
      <div className="bg-white shadow-sm border-bottom sticky-top">
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
              Direct Purchase <span className="text-primary">Marketplace</span>
            </h4>
          </div>

          {/* RIGHT */}
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-dark rounded-pill px-4 shadow-sm"
              onClick={() => navigate("/user/cart")}
            >
              <i className="bi bi-cart3 me-2"></i> View Cart
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
                <div className="text-muted">Buyer</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CARS GRID */}
      <div className="container mt-5">
        <div className="row g-4">
          {cars.map(car => (
            <div key={car.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm car-card">

                {/* IMAGE */}
                <div className="position-relative">
                  {car.images?.length > 0 ? (
                    <img
                      src={`http://localhost:8080${car.images[0].imageUrl}`}
                      className="card-img-top"
                      alt={car.brand}
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center"
                      style={{ height: "220px" }}
                    >
                      <i className="bi bi-image text-muted fs-1"></i>
                    </div>
                  )}

                  <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-3 px-3 py-2 shadow-sm fw-bold">
                    FIXED PRICE
                  </span>
                </div>

                {/* INFO */}
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-1">
                    {car.brand} {car.model}
                  </h5>
                  <p className="text-muted small mb-2">
                    {car.manufactureYear} • {car.fuelType}
                  </p>

                  <h4 className="text-primary fw-bold mb-3">
                    ₹{car.price?.toLocaleString()}
                  </h4>

                  <div className="row g-2">
                    <div className="col-6">
                      <button
                        className="btn btn-outline-primary w-100 rounded-pill fw-bold"
                        onClick={() => setSelectedCar(car)}
                      >
                        Details
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn btn-success w-100 rounded-pill fw-bold"
                        onClick={() => handleAddToCart(car.id)}
                      >
                        <i className="bi bi-cart-plus-fill me-1"></i> Add To Cart
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CAR DETAILS MODAL */}
      {selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}

      {/* TOAST */}
      {toast.show && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div className="toast show text-white bg-primary border-0 shadow">
            <div className="d-flex">
              <div className="toast-body">{toast.message}</div>
              <button
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setToast({ show: false, message: "" })}
              />
            </div>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style>{`
        .car-card {
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .car-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.12) !important;
        }
      `}</style>

    </div>
  );
};

export default CarsForSale;
