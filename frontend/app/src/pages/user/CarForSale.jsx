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

  const fetchCars = async () => {
    try {
      const res = await axiosInstance.get("/api/cars/all");
      const cleanedCars = (Array.isArray(res.data) ? res.data : []).map(car => ({
        ...car,
        images: (car.images || []).map(img => ({ id: img.id, imageUrl: img.imageUrl }))
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

  useEffect(() => { fetchCars(); }, []);

  if (loading) return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="spinner-grow text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="min-vh-100 pb-5" style={{ backgroundColor: "#f3f4f7" }}>
      {/* Header */}
      <div className="bg-white shadow-sm py-4 mb-5 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <button className="btn btn-link text-decoration-none text-muted p-0 mb-1" onClick={() => navigate("/user/dashboard")}>
              <i className="bi bi-chevron-left me-1"></i> Dashboard
            </button>
            <h3 className="fw-bold mb-0 text-dark">Direct Purchase <span className="text-primary">Marketplace</span></h3>
          </div>
          <button className="btn btn-dark rounded-pill px-4 shadow-sm" onClick={() => navigate("/user/cart")}>
            <i className="bi bi-cart3 me-2"></i> View Cart
          </button>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="container">
        <div className="row g-4">
          {cars.map(car => (
            <div key={car.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm car-card">
                {/* Car Image */}
                <div className="position-relative">
                  {car.images?.length > 0 ? (
                    <img
                      src={`http://localhost:8080${car.images[0].imageUrl}`}
                      className="card-img-top"
                      alt={car.brand}
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                  ) : (
                    <div className="bg-secondary bg-opacity-10 text-center py-5 d-flex align-items-center justify-content-center" style={{height: "220px"}}>
                      <i className="bi bi-image text-muted" style={{fontSize: "2rem"}}></i>
                    </div>
                  )}
                  <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-3 shadow-sm px-3 py-2 fw-bold">
                    FIXED PRICE
                  </span>
                </div>

                {/* Car Info */}
                <div className="card-body p-4">
                  <h5 className="fw-bold">{car.brand} {car.model}</h5>
                  <p className="text-muted small">{car.manufactureYear} • {car.fuelType}</p>
                  <h4 className="text-primary fw-bold">₹{car.price?.toLocaleString()}</h4>

                  <div className="row g-2 mt-3">
                    <div className="col-6">
                      <button className="btn btn-outline-primary w-100 rounded-pill fw-bold" onClick={() => setSelectedCar(car)}>
                        Details
                      </button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-success w-100 rounded-pill fw-bold" onClick={() => handleAddToCart(car.id)}>
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

      {/* Car Details Modal */}
      {selectedCar && (
        <CarDetailsModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div className="toast show align-items-center text-white bg-primary border-0">
            <div className="d-flex">
              <div className="toast-body">{toast.message}</div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToast({ show: false, message: "" })}></button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .car-card { border-radius: 20px; overflow: hidden; transition: 0.3s; }
        .car-card:hover { transform: translateY(-8px); box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important; }
      `}</style>
    </div>
  );
};

export default CarsForSale;
