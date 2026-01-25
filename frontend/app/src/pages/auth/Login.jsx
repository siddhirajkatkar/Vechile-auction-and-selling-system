import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import Footer from "../../components/common/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      // Store auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      setMessage("Login Successful");

      // Role-based redirection
      if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      setMessage("Login failed. Check your email or password.");
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Login Card */}
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="card p-4 shadow" style={{ width: "360px" }}>
          <h3 className="text-center mb-2">Welcome to AuctionMart</h3>
          <p className="text-center text-muted mb-3">
            Login to your account
          </p>

          {message && (
            <p
              className={`text-center ${
                message === "Login Successful"
                  ? "text-success"
                  : "text-danger"
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

      <Footer />
    </div>
  );
};

export default Login;
