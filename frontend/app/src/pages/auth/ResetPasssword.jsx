import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/auth/reset-password",
        null,
        {
          params: {
            email,
            newPassword
          }
        }
      );

      setMessage("Password reset successful. Please login.");
      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      setMessage("User not found or error occurred");
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="card p-4 shadow" style={{ width: "360px" }}>
          <h4 className="text-center mb-3">Reset Password</h4>

          {message && (
            <p className="text-center text-info">{message}</p>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleReset();
            }}
          >
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Registered Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResetPassword;
