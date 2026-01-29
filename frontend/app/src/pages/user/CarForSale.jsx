import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { useNavigate } from "react-router-dom";

const CarsForSale = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      const res = await axiosInstance.get("/api/cars/all");
      const cleanedCars = (Array.isArray(res.data) ? res.data : []).map(car => ({
        ...car,
        images: (car.images || []).map(img => ({
          id: img.id,
          imageUrl: img.imageUrl
        }))
      }));
      setCars(cleanedCars);
    } catch (err) {
      alert("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAddToCart = async (carId) => {
    try {
      await axiosInstance.post(`/api/cart/add/${carId}`);
      alert("Car added to cart successfully!");
    } catch (err) {
      alert("Failed to add car to cart");
    }
  };

  if (loading) return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="spinner-grow text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="min-vh-100 pb-5" style={{ backgroundColor: "#f3f4f7" }}>
      {/* Bootstrap Icons */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net" />

      {/* TOP NAVIGATION & HEADER */}
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

      <div className="container">
        {cars.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-car-front text-muted" style={{ fontSize: "4rem" }}></i>
            <h4 className="mt-3">No cars available for sale.</h4>
            <button className="btn btn-primary mt-2" onClick={() => navigate("/user/dashboard")}>Return Home</button>
          </div>
        ) : (
          <div className="row g-4">
            {cars.map(car => (
              <div key={car.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm car-card">
                  
                  {/* IMAGE SECTION */}
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

                  {/* CONTENT */}
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="fw-bold mb-0">{car.brand} {car.model}</h5>
                      <span className="text-muted small fw-bold">{car.manufactureYear}</span>
                    </div>

                    <div className="d-flex gap-2 mb-3">
                      <span className="spec-pill"><i className="bi bi-fuel-pump me-1"></i> {car.fuelType}</span>
                      <span className="spec-pill"><i className="bi bi-gear me-1"></i> {car.transmission}</span>
                    </div>

                    <div className="d-flex align-items-baseline mb-4">
                      <h4 className="text-primary fw-bold mb-0">₹{car.price?.toLocaleString()}</h4>
                      <small className="text-muted ms-2">+ Taxes</small>
                    </div>

                    <div className="row g-2">
                      <div className="col-6">
                        <button className="btn btn-outline-primary w-100 rounded-pill fw-bold" onClick={() => navigate(`/cars/${car.id}`)}>
                          Details
                        </button>
                      </div>
                      <div className="col-6">
                        <button className="btn btn-success w-100 rounded-pill fw-bold" onClick={() => handleAddToCart(car.id)}>
                          <i className="bi bi-cart-plus me-1"></i> Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .car-card {
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .car-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
        }
        .spec-pill {
          background: #f8f9fa;
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          color: #6c757d;
          font-weight: 600;
          text-transform: uppercase;
        }
        .btn-primary { background-color: #0d6efd; border: none; }
        .btn-success { background-color: #198754; border: none; }
      `}</style>
    </div>
  );
};

export default CarsForSale;
