import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { useNavigate } from "react-router-dom";

const CarsForSale = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all available cars
  const fetchCars = async () => {
    try {
      const res = await axiosInstance.get("/api/cars/all");
      // Clean circular references and prepare images
      const cleanedCars = (Array.isArray(res.data) ? res.data : []).map(car => ({
        ...car,
        images: (car.images || []).map(img => ({
          id: img.id,
          imageUrl: img.imageUrl
        }))
      }));
      setCars(cleanedCars);
    } catch (err) {
      console.error("Error fetching cars", err.response?.data || err.message);
      alert("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Navigate to car details page
  const handleView = (id) => navigate(`/cars/${id}`);

  // Add car to cart
  const handleAddToCart = async (carId) => {
    try {
      await axiosInstance.post(`/api/cart/add/${carId}`);
      alert("Car added to cart successfully!");
    } catch (err) {
      console.error("Add to cart failed", err.response?.data || err.message);
      alert("Failed to add car to cart");
    }
  };

  if (loading)
    return <h4 className="text-center mt-5 text-secondary">Loading cars...</h4>;

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold text-primary mb-4">
        🚘 Cars Available For Sale
      </h2>

      {cars.length === 0 ? (
        <p className="text-center">No cars available right now.</p>
      ) : (
        <div className="row">
          {cars.map(car => (
            <div key={car.id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 rounded-4 h-100">

                {/* Image */}
                {car.images?.length > 0 ? (
                  <img
                    src={`http://localhost:8080${car.images[0].imageUrl}`}
                    className="card-img-top rounded-top-4"
                    alt={`${car.brand} ${car.model}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div className="bg-light text-center p-5">No Image</div>
                )}

                {/* Card Body */}
                <div className="card-body">
                  <h5 className="fw-bold">{car.brand} {car.model}</h5>
                  <p className="text-muted mb-1">📅 {car.manufactureYear}</p>
                  <p className="text-muted mb-1">⛽ {car.fuelType}</p>
                  <p className="text-muted mb-1">⚙ {car.transmission}</p>
                  <h5 className="text-success fw-bold mt-2">
                    ₹ {car.price?.toLocaleString()}
                  </h5>
                </div>

                {/* Card Footer */}
                <div className="card-footer bg-white d-flex justify-content-between">
                  <button
                    className="btn btn-primary btn-sm w-45"
                    onClick={() => handleView(car.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-success btn-sm w-45"
                    onClick={() => handleAddToCart(car.id)}
                  >
                    Add to Cart
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsForSale;
