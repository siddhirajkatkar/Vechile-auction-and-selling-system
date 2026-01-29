import React, { useState } from "react";
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const navigate = useNavigate();

  const [car, setCar] = useState({
    registrationNo: "",
    brand: "",
    manufacturer: "",
    model: "",
    manufactureYear: "",
    fuelType: "",
    transmission: "",
    kmDriven: "",
    color: "",
    price: "",
    saleType: "DIRECT"
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const submitCar = async (e) => {
    e.preventDefault();

    try {
      // 🔥 Convert data to DTO format expected by backend
      const carData = {
        registrationNo: car.registrationNo,
        brand: car.brand,
        manufacturer: car.manufacturer,
        model: car.model,
        manufactureYear: parseInt(car.manufactureYear),
        fuelType: car.fuelType,
        transmission: car.transmission,
        kmDriven: parseInt(car.kmDriven),
        mileage: null,
        color: car.color,
        engineCc: null,
        price: parseFloat(car.price),
        description: "",
        saleType: car.saleType
      };

      const formData = new FormData();
      formData.append("carData", JSON.stringify(carData));

      // Add images if selected
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await axios.post("/api/cars/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("🚗 Car added successfully!");
      navigate("/user/my-cars");

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      alert("❌ Failed to add car");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-4">
          <h2 className="text-center mb-4 text-primary fw-bold">🚗 Add New Car</h2>

          <form onSubmit={submitCar}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Registration No</label>
                <input type="text" name="registrationNo" className="form-control" onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Brand</label>
                <input type="text" name="brand" className="form-control" onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Manufacturer</label>
                <input type="text" name="manufacturer" className="form-control" onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Model</label>
                <input type="text" name="model" className="form-control" onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Manufacture Year</label>
                <input type="number" name="manufactureYear" className="form-control" onChange={handleChange} required />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Fuel Type</label>
                <select name="fuelType" className="form-select" onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="PETROL">Petrol</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="ELECTRIC">Electric</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Transmission</label>
                <select name="transmission" className="form-select" onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="MANUAL">Manual</option>
                  <option value="AUTOMATIC">Automatic</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">KM Driven</label>
                <input type="number" name="kmDriven" className="form-control" onChange={handleChange} required />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Color</label>
                <input type="text" name="color" className="form-control" onChange={handleChange} />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Price (₹)</label>
                <input type="number" name="price" className="form-control" onChange={handleChange} required />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Sale Type</label>
              <select name="saleType" className="form-select" onChange={handleChange}>
                <option value="DIRECT">Direct Sale</option>
                <option value="AUCTION">Auction</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">Car Images</label>
              <input type="file" className="form-control" multiple onChange={handleImageChange} />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg rounded-3">
                ➕ Add Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
