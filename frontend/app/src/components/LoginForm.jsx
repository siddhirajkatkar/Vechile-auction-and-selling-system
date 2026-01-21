import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirect
import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // For success/error
  const navigate = useNavigate(); // React Router hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password); // Call backend
      setMessage(data.message); // Display success message

      // Redirect to Home page after login
      navigate("/home");
    } catch (err) {
      setMessage("Login failed. Check your email/password."); // Show error
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Centered login card */}
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="card p-4 shadow" style={{ width: "350px" }}>
          <h3 className="text-center mb-2">Welcome To AuctionMart</h3>
          <p className="text-center text-muted mb-2">Login to your account</p>

          {/* Show success/error message */}
          {message && (
            <p
              className={`text-center ${
                message.includes("Successful") ? "text-success" : "text-danger"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-muted py-3 bg-light">
        © 2026 AuctionMart. All rights reserved. <br />
        Address: Pune, Maha, India | Email: auctionmart@gmail.com
      </footer>
    </div>
  );
}

export default Login;
