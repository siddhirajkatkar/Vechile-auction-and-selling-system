import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const CarCard = ({ car }) => {
  const imageUrl =
    car.images && car.images.length > 0
      ? car.images[0].imageUrl
      : "https://via.placeholder.com/300";  

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={`http://localhost:8080${imageUrl}`}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-primary">
          {car.brand} {car.model}
        </Card.Title>

        <Card.Text className="text-secondary mb-2">
          <strong>Fuel:</strong> {car.fuel_type}
        </Card.Text>

        <Card.Text className="mb-2">
          <strong>Price:</strong> ₹{car.price.toLocaleString()}
        </Card.Text>

        <div className="mt-auto">
          <Button variant="success">View Details</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CarCard;
