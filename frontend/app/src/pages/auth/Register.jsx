import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import Footer from "../../components/common/Footer";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="card shadow p-4" style={{ width: "420px" }}>
          <h4 className="text-center mb-3">Create an Account</h4>

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <textarea
              className="form-control mb-3"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />

            <button className="btn btn-primary w-100" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
