
import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { useNavigate } from "react-router-dom";

const MyCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch user's cars and clean circular references
  const fetchMyCars = async () => {
    try {
      const res = await axiosInstance.get("/api/cars/mine");
      console.log(res.data);
      // Ensure res.data is an array and clean circular references
      const cleanedCars = (Array.isArray(res.data) ? res.data : []).map(car => ({
        id: car.id,
        registrationNo: car.registrationNo,
        brand: car.brand,
        model: car.model,
        status: car.status || "N/A",
        manufactureYear: car.manufactureYear,
        price: car.price,
        images: (car.images || []).map(img => ({
          id: img.id,
          imageUrl: img.imageUrl
        }))
      }));

      setCars(cleanedCars);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to load your cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCars();
  }, []);

  const handleView = (id) => navigate(`/cars/${id}`);
  const handleEdit = (id) => navigate(`/user/edit-car/${id}`);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this car?")) return;
    try {
      await axiosInstance.delete(`/api/cars/${id}`);
      setCars(cars.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <h4 className="text-center mt-5">Loading your cars...</h4>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary fw-bold">🚗 My Listed Cars</h2>

      {cars.length === 0 ? (
        <p className="text-center text-muted">You haven’t listed any cars yet.</p>
      ) : (
        <div className="row">
          {cars.map(car => (
            <div className="col-md-4 mb-4" key={car.id}>
              <div className="card shadow rounded-4 h-100">
                {car.images?.length > 0 ? (
                  <img
                    src={`http://localhost:8080${car.images[0].imageUrl}`}
                    className="card-img-top rounded-top-4"
                    style={{ height: "200px", objectFit: "cover" }}
                    alt={`${car.brand} ${car.model}`}
                  />
                ) : (
                  <div className="bg-light text-center p-5">No Image</div>
                )}

                <div className="card-body">
                  <h5 className="card-title">{car.brand} {car.model}</h5>
                  <p className="card-text">
                    <strong>Year:</strong> {car.manufactureYear} <br />
                    <strong>Price:</strong> ₹{car.price?.toLocaleString()} <br />
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-success">{car.status}</span>
                  </p>
                </div>

                <div className="card-footer bg-white d-flex justify-content-between">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => handleView(car.id)}>View</button>
                  <button className="btn btn-sm btn-primary" onClick={() => handleEdit(car.id)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(car.id)}>Delete</button>
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
