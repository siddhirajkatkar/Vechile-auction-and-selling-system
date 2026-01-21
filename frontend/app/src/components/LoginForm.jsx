import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Centered login card */}
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="card p-4 shadow" style={{ width: "350px" }}>
          <h3 className="text-center mb-2">Welcome To AuctionMart</h3>
          <p className="text-center text-muted mb-4">Login to your account</p>

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
        Address: Pune,Maha,India | Email: autionmart@gmail.com
      </footer>
    </div>
  );
}

export default Login;
