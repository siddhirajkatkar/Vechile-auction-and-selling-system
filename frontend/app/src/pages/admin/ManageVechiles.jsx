import { useEffect, useState } from "react";
import {
  getPendingVehicles,
  approveVehicle,
  rejectVehicle,
} from "../../services/adminVehicleService";

const ManageVehicles = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      setLoading(true);
      const res = await getPendingVehicles();
      setCars(res.data || []);
      setError("");
    } catch (err) {
      setError("Unable to load pending vehicles. Backend not ready.");
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveVehicle(id);
      loadCars();
    } catch (err) {
      alert("Failed to approve vehicle");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectVehicle(id);
      loadCars();
    } catch (err) {
      alert("Failed to reject vehicle");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Pending Vehicle Approvals</h3>

      {/* Loading */}
      {loading && (
        <p className="text-muted mt-3">Loading pending vehicles...</p>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="text-danger mt-3">{error}</p>
      )}

      {/* No pending vehicles */}
      {!loading && !error && cars.length === 0 && (
        <p className="text-muted mt-3">
          No pending vehicle approvals.
        </p>
      )}

      {/* Pending vehicles */}
      {!loading && !error && cars.length > 0 && (
        cars.map((car) => (
          <div key={car.carId} className="card p-3 mb-3">
            <p>
              <b>{car.brand} {car.model}</b>
            </p>
            <p>Price: ₹{car.price}</p>

            <button
              className="btn btn-success btn-sm me-2"
              onClick={() => handleApprove(car.carId)}
            >
              Approve
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleReject(car.carId)}
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageVehicles;
