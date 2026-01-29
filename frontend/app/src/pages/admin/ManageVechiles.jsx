import { useEffect, useState } from "react";
import {
  getPendingVehicles,
  approveVehicle,
  rejectVehicle,
} from "../../services/adminVehicleService";

const ManageVehicles = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      setLoading(true);
      const res = await getPendingVehicles();
      setCars(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch {
      setError("❌ Unable to load pending vehicles.");
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Approve this vehicle?")) return;

    try {
      setActionLoading(true);
      await approveVehicle(id);
      setMessage("✅ Vehicle approved successfully");
      loadCars();
    } catch {
      alert("Failed to approve vehicle");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Reject this vehicle?")) return;

    try {
      setActionLoading(true);
      await rejectVehicle(id);
      setMessage("❌ Vehicle rejected");
      loadCars();
    } catch {
      alert("Failed to reject vehicle");
    } finally {
      setActionLoading(false);
    }
  };

  // Auto-clear message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold text-primary">
        🛠️ Pending Vehicle Approvals
      </h2>

      {message && (
        <div className="alert alert-info text-center fw-semibold">
          {message}
        </div>
      )}

      {loading && (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" />
          <p className="mt-2">Loading pending vehicles...</p>
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger mt-3">{error}</div>
      )}

      {!loading && !error && cars.length === 0 && (
        <p className="text-muted mt-3">
          🎉 No pending vehicle approvals.
        </p>
      )}

      {!loading && !error && cars.length > 0 && (
        <div className="row g-4">
          {cars.map((car) => (
            <div key={car.id} className="col-md-6 col-lg-4">
              <div className="card shadow-sm rounded-4 h-100">
                <div className="card-body">
                  <h5 className="fw-bold mb-2">
                    {car.brand} {car.model}
                  </h5>

                  <p className="mb-1">
                    <strong>Year:</strong> {car.manufactureYear}
                  </p>
                  <p className="mb-1">
                    <strong>Price:</strong> ₹{car.price?.toLocaleString()}
                  </p>
                  <p className="mb-2">
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-warning text-dark">
                      {car.status}
                    </span>
                  </p>

                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-success btn-sm"
                      disabled={actionLoading}
                      onClick={() => handleApprove(car.id)}
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      disabled={actionLoading}
                      onClick={() => handleReject(car.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageVehicles;
