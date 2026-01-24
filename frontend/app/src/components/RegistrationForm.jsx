import React, { useState } from "react";
import { registerUser } from "../services/Registration";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("ROLE_BUYER"); // default
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      roles: [role] // only BUYER or SELLER
    };

    registerUser(userData)
      .then(() =>{ 
        alert("Registration successful") 
        navigate("/login");

      })  
      .catch(() => alert("Registration failed"));

  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h4>User Registration</h4>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>

                <input className="form-control mb-3"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required />

                <input className="form-control mb-3"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required />

                <input className="form-control mb-3"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />

                <input className="form-control mb-3"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />

                <input className="form-control mb-3"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)} />

                <textarea className="form-control mb-3"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)} />

                {/* Role Selection */}
                {/* <div className="mb-3">
                  <label className="form-label">Register As</label>

                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="role"
                      value="ROLE_BUYER"
                      checked={role === "ROLE_BUYER"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label className="form-check-label">Buyer</label>
                  </div>

                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="role"
                      value="ROLE_SELLER"
                      checked={role === "ROLE_SELLER"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label className="form-check-label">Seller</label>
                  </div>
                </div> */}

                <button className="btn btn-primary w-100">
                  Register
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
