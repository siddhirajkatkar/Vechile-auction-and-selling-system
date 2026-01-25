import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-dark bg-primary px-4">
        <span className="navbar-brand">User Dashboard</span>

        <button
          className="btn btn-light"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <div className="container mt-4">
        <h3>Welcome User 👋</h3>
        <p className="text-muted">
          You can participate in auctions or sell your vehicle.
        </p>

        <div className="row mt-4">
          <div className="col-md-4 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <h5>View Auctions</h5>
                <p className="text-muted">
                  Browse and bid on available vehicles.
                </p>
                <button className="btn btn-primary btn-sm">
                  Go
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <h5>My Bids</h5>
                <p className="text-muted">
                  Check vehicles you have bid on.
                </p>
                <button className="btn btn-primary btn-sm">
                  Go
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <h5>Sell Vehicle</h5>
                <p className="text-muted">
                  Add your vehicle for auction.
                </p>
                <button className="btn btn-primary btn-sm">
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

export default UserDashboard;
