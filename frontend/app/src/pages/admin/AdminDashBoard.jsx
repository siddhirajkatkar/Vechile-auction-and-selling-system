import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand">Admin Dashboard</span>

        <button
          className="btn btn-light"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <div className="container mt-4">
        <h3>Welcome Admin 👋</h3>
        <p className="text-muted">
          Manage users, vehicles, and auctions.
        </p>

        <div className="row mt-4">
          <div className="col-md-4 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <h5>Manage Users</h5>
                <p className="text-muted">
                  View and manage registered users.
                </p>
                <button className="btn btn-dark btn-sm">
                  Go
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <h5>Manage Vehicles</h5>
                <p className="text-muted">
                  Approve or reject vehicle listings.
                </p>
                <button className="btn btn-dark btn-sm">
                  Go
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <h5>View Auctions</h5>
                <p className="text-muted">
                  Monitor ongoing auctions.
                </p>
                <button className="btn btn-dark btn-sm">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
