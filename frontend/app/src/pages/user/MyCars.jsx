import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";

const statusBadge = {
  DRAFT: "bg-secondary bg-opacity-10 text-secondary",
  PENDING_APPROVAL: "bg-warning bg-opacity-10 text-dark",
  AVAILABLE: "bg-success bg-opacity-10 text-success",
  UNDER_AUCTION: "bg-primary bg-opacity-10 text-primary",
  SOLD: "bg-dark text-white",
  CANCELLED: "bg-danger bg-opacity-10 text-danger",
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

  const startAuction = async (carId) => {
    if (!window.confirm("Start auction for this car?")) return;
    try {
      setAuctionLoadingId(carId);
      await axiosInstance.post(`/api/auctions/start/${carId}`);
      setCars(prev => prev.map(car => car.id === carId ? { ...car, status: "UNDER_AUCTION" } : car));
      setMessage("✅ Auction started! Redirecting...");
      setTimeout(() => navigate("/user/auctions"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Auction failed");
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

  if (loading) return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary shadow-sm" role="status" />
    </div>
  );

  return (
    <div className="min-vh-100 pb-5" style={{ backgroundColor: "#fcfcfd" }}>
      {/* Bootstrap Icons */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net" />

      {/* HEADER SECTION */}
      <div className="bg-white border-bottom py-4 mb-5 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <button className="btn btn-link text-decoration-none text-muted p-0 mb-1" onClick={() => navigate("/user/dashboard")}>
              <i className="bi bi-arrow-left me-1"></i> Dashboard
            </button>
            <h3 className="fw-bold mb-0">My <span className="text-primary">Garage</span></h3>
          </div>
          <button className="btn btn-primary rounded-pill px-4" onClick={() => navigate("/user/add-car")}>
            <i className="bi bi-plus-lg me-2"></i> List New Car
          </button>
        </div>
      </div>

      <div className="container">
        {message && (
          <div className="alert alert-dark border-0 shadow-sm rounded-3 text-center mb-4 py-2">
            {message}
          </div>
        )}

        {cars.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm">
            <i className="bi bi-emoji-smile text-muted" style={{ fontSize: "3rem" }}></i>
            <h4 className="mt-3">Your garage is empty</h4>
            <p className="text-muted">Turn your car into cash today!</p>
            <button className="btn btn-primary rounded-pill mt-2" onClick={() => navigate("/user/add-car")}>List a Car</button>
          </div>
        ) : (
          <div className="row g-4">
            {cars.map((car) => (
              <div className="col-lg-4 col-md-6" key={car.id}>
                <div className="card h-100 border-0 shadow-sm garage-card">
                  <div className="position-relative">
                    {car.images?.length > 0 ? (
                      <img
                        src={`http://localhost:8080${car.images[0].imageUrl}`}
                        className="card-img-top"
                        style={{ height: "210px", objectFit: "cover" }}
                        alt={car.brand}
                      />
                    ) : (
                      <div className="bg-light text-center py-5" style={{ height: "210px" }}>No Image</div>
                    )}
                    <span className={`status-pill position-absolute top-0 end-0 m-3 ${statusBadge[car.status]}`}>
                      {car.status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-1">{car.brand} {car.model}</h5>
                    <p className="text-muted small mb-3">{car.manufactureYear} • {car.fuelType}</p>
                    
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <span className="text-primary fw-bold fs-5">₹{car.price?.toLocaleString()}</span>
                    </div>

                    <div className="d-flex gap-2">
                      <button className="btn btn-light flex-grow-1 rounded-3 fw-bold btn-sm" onClick={() => navigate(`/cars/${car.id}`)}>
                        View
                      </button>
                      
                      {car.status === "DRAFT" && (
                        <button className="btn btn-outline-secondary flex-grow-1 rounded-3 btn-sm" onClick={() => navigate(`/user/edit-car/${car.id}`)}>
                          Edit
                        </button>
                      )}

                      {car.status === "AVAILABLE" && (
                        <button 
                          className="btn btn-success flex-grow-1 rounded-3 btn-sm fw-bold shadow-sm" 
                          disabled={auctionLoadingId === car.id}
                          onClick={() => startAuction(car.id)}
                        >
                          {auctionLoadingId === car.id ? "..." : "Auction"}
                        </button>
                      )}

                      <button 
                        className="btn btn-outline-danger btn-sm border-0" 
                        disabled={car.status === "UNDER_AUCTION" || car.status === "SOLD"}
                        onClick={() => handleDelete(car.id)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .garage-card { border-radius: 20px; overflow: hidden; transition: all 0.3s ease; }
        .garage-card:hover { transform: translateY(-5px); box-shadow: 0 12px 25px rgba(0,0,0,0.08) !important; }
        .status-pill { padding: 4px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
        .btn-light { background: #f1f3f5; color: #495057; }
        .btn-light:hover { background: #e9ecef; }
      `}</style>
    </div>
  );
};

export default MyCars;