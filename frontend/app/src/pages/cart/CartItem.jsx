// src/components/CartItem.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="row g-0 align-items-center">
        
        {/* Car Image */}
        <div className="col-md-4">
          {item.images && item.images.length > 0 ? (
            <img
              src={`http://localhost:8080${item.images[0].imageUrl}`} // fixed property name
              className="img-fluid rounded-start"
              alt={item.model}
              style={{ height: "180px", objectFit: "cover", width: "100%" }}
            />
          ) : (
            <div className="d-flex justify-content-center align-items-center bg-light rounded-start" style={{ height: "180px" }}>
              No Image
            </div>
          )}
        </div>

        {/* Car Info */}
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">
              {item.brand} {item.model} <span className="badge bg-primary ms-2">{item.status}</span>
            </h5>
            <p className="card-text mb-1"><strong>Registration:</strong> {item.registrationNo}</p>
            <p className="card-text mb-1"><strong>Price:</strong> ₹{item.price.toLocaleString()}</p>
            <p className="card-text mb-1"><strong>Seller:</strong> {item.sellerName}</p>
            <p className="card-text mb-1"><strong>Email:</strong> {item.sellerEmail}</p>
            <p className="card-text"><strong>Phone:</strong> {item.sellerPhone}</p>
          </div>
        </div>

        {/* Remove Button */}
        <div className="col-md-2 text-center">
          <button 
            onClick={() => onRemove(item.cartItemId)} 
            className="btn btn-danger mt-4"
          >
            <i className="bi bi-trash-fill"></i> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
