import { useNavigate } from "react-router-dom";

// IMPORT IMAGES
import car1 from "../../assets/images/car1.jpg";
import car2 from "../../assets/images/car2.jpg";
import car3 from "../../assets/images/car3.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">AuctionMart</span>

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

      {/* HERO SECTION */}
      <section className="bg-light text-center py-5">
        <div className="container">
          <h1 className="fw-bold">
            Online Vehicle Auction System
          </h1>
          <p className="text-muted mt-3">
            A platform to buy and sell vehicles using live auctions.
          </p>

          <div className="mt-4">
            <button
              className="btn btn-primary me-3"
              onClick={() => navigate("/login")}
            >
              View Auctions
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/register")}
            >
              Sell Vehicle
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-5">
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <h5>Live Bidding</h5>
            <p className="text-muted">
              Users can place bids in real time.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Secure System</h5>
            <p className="text-muted">
              User data and transactions are protected.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Verified Users</h5>
            <p className="text-muted">
              Only registered users can participate.
            </p>
          </div>
        </div>
      </section>

      {/* SAMPLE AUCTIONS */}
      <section className="bg-light py-5">
        <div className="container">
          <h4 className="text-center mb-4">
            Sample Auctions
          </h4>

          <div className="row">
            {[
              { id: 1, img: car1 },
              { id: 2, img: car2 },
              { id: 3, img: car3 }
            ].map((item) => (
              <div className="col-md-4 mb-3" key={item.id}>
                <div className="card shadow-sm">
                  {/* IMAGE */}
                  <img
                    src={item.img}
                    alt="Vehicle"
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />

                  <div className="card-body">
                    <h6>Vehicle {item.id}</h6>
                    <p>Current Bid: ₹{item.id * 100000}</p>

                    <button
                      className="btn btn-sm btn-primary w-100"
                      onClick={() => navigate("/login")}
                    >
                      Login to Bid
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-light text-center py-3">
        © 2026 AuctionMart | Pune, India
      </footer>
    </div>
  );
};

export default Home;
