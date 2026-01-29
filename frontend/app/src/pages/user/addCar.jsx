import React, { useState } from "react";
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const navigate = useNavigate();

  const [car, setCar] = useState({
    brand: "",
    model: "",
    manufactureYear: "",
    fuelType: "",
    transmission: "",
    basePrice: "",
  });

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const submitCar = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/seller/cars", car);
      alert("Car added successfully!");
      navigate("/user/my-cars");
    } catch (err) {
      alert("Failed to add car");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Car</h1>

      <form onSubmit={submitCar}>
        <input name="brand" placeholder="Brand" onChange={handleChange} />
        <br />

        <input name="model" placeholder="Model" onChange={handleChange} />
        <br />

        <input
          name="manufactureYear"
          placeholder="Year"
          onChange={handleChange}
        />
        <br />

        <select name="fuelType" onChange={handleChange}>
          <option value="">Select Fuel</option>
          <option value="PETROL">Petrol</option>
          <option value="DIESEL">Diesel</option>
          <option value="ELECTRIC">Electric</option>
        </select>
        <br />

        <select name="transmission" onChange={handleChange}>
          <option value="">Select Transmission</option>
          <option value="MANUAL">Manual</option>
          <option value="AUTOMATIC">Automatic</option>
        </select>
        <br />

        <input
          name="basePrice"
          placeholder="Base Price"
          onChange={handleChange}
        />
        <br />

        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
