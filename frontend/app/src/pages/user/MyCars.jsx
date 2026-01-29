import { useEffect, useState } from "react";
import axios from "../../services/axios";

const MyCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch seller's cars
  useEffect(() => {
    axios
      .get("/api/cars/my")
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Failed to load cars");
        setLoading(false);
      });
  }, []);

  // Start auction
  const startAuction = async (carId) => {
    if (!carId) {
      setMessage("Invalid car ID. Please refresh.");
      return;
    }

    try {
      await axios.post(`/api/auctions/start/${carId}`);
      setMessage("Auction started successfully");

      // update UI instantly
      setCars((prev) =>
        prev.map((car) =>
          car.id === carId
            ? { ...car, status: "UNDER_AUCTION" }
            : car
        )
      );
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Unable to start auction"
      );
    }
  };

  if (loading) return <p>Loading cars...</p>;

  return (
    <div className="container mt-4">
      <h3>My Cars</h3>
      <p className="text-muted">
        Vehicles you have listed for sale or auction.
      </p>

      {message && <div className="alert alert-info">{message}</div>}

      {cars.length === 0 ? (
        <p>No cars listed yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Registration</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.registrationNo}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>
                  <span className="badge bg-secondary">
                    {car.status}
                  </span>
                </td>
                <td>
                  {car.status === "AVAILABLE" ? (
                    <button
                      className="btn btn-sm btn-primary"
                      disabled={!car.id}
                      onClick={() => startAuction(car.id)}
                    >
                      Start Auction
                    </button>
                  ) : (
                    <span className="text-muted">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyCars;
