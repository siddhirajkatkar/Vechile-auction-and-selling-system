import { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";

const PendingCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    loadPendingCars();
  }, []);

  const loadPendingCars = async () => {
    const res = await axios.get("/admin/cars/pending");
    setCars(res.data);
  };

  const handleApprove = async (id) => {
    await axios.put(`/admin/cars/${id}/approve`);
    loadPendingCars();
  };

  const handleReject = async (id) => {
    await axios.put(`/admin/cars/${id}/reject`);
    loadPendingCars();
  };

  return (
    <div>
      <h2>Pending Car Approvals</h2>

      {cars.length === 0 && <p>No pending approvals</p>}

      {cars.map((car) => (
        <div key={car.carId} className="card">
          <p><b>{car.brand} {car.model}</b></p>
          <p>Year: {car.manufactureYear}</p>
          <p>Price: ₹{car.price}</p>
          <p>Status: {car.status}</p>

          <button onClick={() => handleApprove(car.carId)}>
            Approve
          </button>
          <button onClick={() => handleReject(car.carId)}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
};

export default PendingCars;
