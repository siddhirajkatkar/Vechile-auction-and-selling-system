// src/components/CartItem.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="card mb-4 shadow-sm border-0">
      <div className="row g-0 align-items-center">

        {/* 🔹 Car Image */}
        <div className="col-md-4">
          {item.images && item.images.length > 0 ? (
            <img
              src={`http://localhost:8080${item.images[0].imageUrl}`}
              alt={item.model}
              className="img-fluid rounded-start"
              style={{
                height: "200px",
                objectFit: "cover",
                width: "100%",
              }}
            />
          ) : (
            <div
              className="d-flex justify-content-center align-items-center bg-light text-muted rounded-start"
              style={{ height: "200px" }}
            >
              No Image Available
            </div>
          )}
        </div>

        {/* 🔹 Car Details */}
        <div className="col-md-6">
          <div className="card-body py-3">
            <h5 className="card-title mb-2">
              {item.brand} {item.model}
              <span className="badge bg-primary ms-2">{item.status}</span>
            </h5>

            <div className="row small text-muted">
              <div className="col-6 mb-1">
                <strong>Registration:</strong> {item.registrationNo}
              </div>
              <div className="col-6 mb-1">
                <strong>Price:</strong>{" "}
                <span className="text-success fw-semibold">
                  ₹{item.price.toLocaleString()}
                </span>
              </div>
              <div className="col-6 mb-1">
                <strong>Seller:</strong> {item.sellerName}
              </div>
              <div className="col-6 mb-1">
                <strong>Phone:</strong> {item.sellerPhone}
              </div>
              <div className="col-12">
                <strong>Email:</strong> {item.sellerEmail}
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Remove Action */}
        <div className="col-md-2 d-flex justify-content-center align-items-center">
          <button
            onClick={() => onRemove(item.cartItemId)}
            className="btn btn-outline-danger px-3"
          >
            <i className="bi bi-trash-fill me-1"></i>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
