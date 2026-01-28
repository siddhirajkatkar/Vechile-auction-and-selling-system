import React, { useState } from "react";
import { createCar } from "../carServices/car";

function AddCarForm() {
  const [registrationNo, setRegistrationNo] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [price, setPrice] = useState("");
  const [saleType, setSaleType] = useState("");
  const [mileage, setMileage] = useState("");
  const [manufactureYear, setManufactureYear] = useState("");
  const [color, setColor] = useState("");
  const [engineCc, setEngineCc] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carData = {
      registration_no: registrationNo,
      brand,
      model,
      fuel_type: fuelType,
      transmission,
      price: parseFloat(price),
      sale_type: saleType,
      mileage: mileage ? parseInt(mileage, 10) : null,
      manufacture_year: manufactureYear
        ? parseInt(manufactureYear, 10)
        : null,
      color,
      engine_cc: engineCc ? parseInt(engineCc, 10) : null,
      description,
    };

    try {
      await createCar(carData, images);
      alert("Car added successfully!");
      // Clear form
      setRegistrationNo("");
      setBrand("");
      setModel("");
      setFuelType("");
      setTransmission("");
      setPrice("");
      setSaleType("");
      setMileage("");
      setManufactureYear("");
      setColor("");
      setEngineCc("");
      setDescription("");
      setImages([]);
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Failed to add car");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Registration No:</label>
        <input
          type="text"
          value={registrationNo}
          onChange={(e) => setRegistrationNo(e.target.value)}
        />
      </div>

      <div>
        <label>Brand:</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>

      <div>
        <label>Model:</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </div>

      <div>
        <label>Fuel Type:</label>
        <select
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
        >
          <option value="">Select Fuel</option>
          <option value="PETROL">PETROL</option>
          <option value="DIESEL">DIESEL</option>
          <option value="ELECTRIC">ELECTRIC</option>
          <option value="HYBRID">HYBRID</option>
        </select>
      </div>

      <div>
        <label>Transmission:</label>
        <select
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
        >
          <option value="">Select Transmission</option>
          <option value="MANUAL">MANUAL</option>
          <option value="AUTOMATIC">AUTOMATIC</option>
        </select>
      </div>

      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <label>Sale Type:</label>
        <select value={saleType} onChange={(e) => setSaleType(e.target.value)}>
          <option value="">Select Sale</option>
          <option value="AUCTION">AUCTION</option>
          <option value="DIRECT">DIRECT</option>
        </select>
      </div>

      <div>
        <label>Mileage:</label>
        <input
          type="number"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
        />
      </div>

      <div>
        <label>Manufacture Year:</label>
        <input
          type="number"
          value={manufactureYear}
          onChange={(e) => setManufactureYear(e.target.value)}
        />
      </div>

      <div>
        <label>Color:</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <div>
        <label>Engine CC:</label>
        <input
          type="number"
          value={engineCc}
          onChange={(e) => setEngineCc(e.target.value)}
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Car Images:</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
        />
      </div>

      <button type="submit">Add Car</button>
    </form>
  );
}

export default AddCarForm;
