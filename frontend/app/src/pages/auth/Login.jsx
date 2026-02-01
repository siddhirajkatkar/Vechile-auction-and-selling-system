import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import Footer from "../../components/common/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("LOGIN BUTTON CLICKED");

    try {
      const data = await login(email, password);

      console.log("LOGIN RESPONSE", data);

      // Save auth info
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      setMessage("Login Successful");

      // Redirect based on role
      if (data.role === "ROLE_ADMIN") {
        navigate("/admin-ui/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error("LOGIN ERROR", error);
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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
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
            <div className="text-end mb-3">
  <span
    className="text-primary"
    style={{ cursor: "pointer", fontSize: "14px" }}
    onClick={() => navigate("/reset-password")}
  >
    Forgot Password?
  </span>
</div>

            {/* Register Link */}
            <div className="text-center mt-3">
              <span className="text-muted">Don’t have an account? </span>
              <span
                className="text-primary fw-bold"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
