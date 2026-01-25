import { useNavigate } from "react-router-dom";

const PublicNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span
        className="navbar-brand fw-bold"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        AuctionMart
      </span>

      <div className="ms-auto">
        <button
          className="btn btn-outline-light me-2"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="btn btn-warning"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default PublicNavbar;
