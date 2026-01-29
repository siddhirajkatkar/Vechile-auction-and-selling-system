import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-dark bg-primary px-4">
        <span className="navbar-brand">User Dashboard</span>

        <button
          className="btn btn-light btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <div className="container mt-4">
        <h3>Welcome 👋</h3>
        <p className="text-muted">
          Manage subscriptions, auctions, bids, and your vehicles.
        </p>

        <div className="row mt-4">

          {/* VIEW AUCTIONS */}
          <div className="col-md-4 mb-3">
            <div className="card text-center h-100">
              <div className="card-body">
                <h5>View Auctions</h5>
                <p className="text-muted">
                  Browse active auctions and place bids.
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate("/user/auctions")}
                >
                  Go
                </button>
              </div>
            </div>
          </div>

          {/* MY BIDS */}
          <div className="col-md-4 mb-3">
            <div className="card text-center h-100">
              <div className="card-body">
                <h5>My Bids</h5>
                <p className="text-muted">
                  Track vehicles you have bid on.
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate("/user/bids")}
                >
                  Go
                </button>
              </div>
            </div>
          </div>

          {/* SELL VEHICLE */}
          <div className="col-md-4 mb-3">
            <div className="card text-center h-100">
              <div className="card-body">
                <h5>Sell Vehicle</h5>
                <p className="text-muted">
                  Add your vehicle for auction or direct sale.
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate("/user/add-car")}
                >
                  Go
                </button>
              </div>
            </div>
          </div>

          {/* SUBSCRIPTION PLANS */}
          <div className="col-md-4 mb-3">
            <div className="card text-center h-100">
              <div className="card-body">
                <h5>Subscription Plans</h5>
                <p className="text-muted">
                  Buy or upgrade your bidding plan.
                </p>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => navigate("/user/subscriptions")}
                >
                  View Plans
                </button>
              </div>
            </div>
          </div>

          {/* MY SUBSCRIPTION */}
          <div className="col-md-4 mb-3">
            <div className="card text-center h-100">
              <div className="card-body">
                <h5>My Subscription</h5>
                <p className="text-muted">
                  Check your active plan and remaining bids.
                </p>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => navigate("/user/my-subscription")}
                >
                  View
                </button>
              </div>
            </div>
          </div>

          {/* MY CARS (SELLER) */}
          <div className="col-md-4 mb-3">
            <div className="card text-center h-100">
              <div className="card-body">
                <h5>My Cars</h5>
                <p className="text-muted">
                  Manage vehicles you have listed.
                </p>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate("/user/my-cars")}
                >
                  Go
                </button>
              </div>
            </div>
          </div>

          {/* CARS FOR SALE */}
          <div className="col-md-4 mb-3">
            <div className="card text-center h-100 "> 
              {/* border-0 shadow-sm */}
              <div className="card-body">
                <h5>Cars For Sale</h5>
                <p className="text-muted">
                  Explore vehicles available for direct purchase.
                </p>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => navigate("/user/car-for-sell")}
                >
                  Browse Cars
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
