import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand fw-bold" href="/">
          AuctionMart
        </a>

        <div className="ms-auto">
          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button className="btn btn-warning">Register</button>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="bg-light text-center py-5">
        <div className="container">
          <h1 className="fw-bold display-5">
            Buy & Sell Smarter with Live Auctions
          </h1>
          <p className="text-muted mt-3">
            Join real-time bidding and sell your products to the highest bidder.
          </p>

          <div className="mt-4">
            <button
              className="btn btn-primary btn-lg me-3"
              onClick={() => navigate("/auctions")}
            >
              Explore Auctions
            </button>
            <button className="btn btn-outline-secondary btn-lg">
              Start Selling
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="container py-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body">
                <h5 className="card-title">Live Bidding</h5>
                <p className="card-text text-muted">
                  Participate in real-time auctions with instant updates.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body">
                <h5 className="card-title">Secure Payments</h5>
                <p className="card-text text-muted">
                  Safe and transparent payment handling.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body">
                <h5 className="card-title">Verified Sellers</h5>
                <p className="card-text text-muted">
                  Trusted sellers and quality products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LIVE AUCTIONS ================= */}
      <section className="bg-light py-5">
        <div className="container">
          <h3 className="text-center fw-bold mb-4">🔥 Live Auctions</h3>

          <div className="row">
            {[1, 2, 3].map((item) => (
              <div className="col-md-4 mb-4" key={item}>
                <div className="card shadow-sm hover-card">
                  <div className="card-body">
                    <h5 className="card-title">Product #{item}</h5>
                    <p className="card-text">
                      Current Bid: <strong>₹{item * 5000}</strong>
                    </p>
                    <button className="btn btn-primary w-100">
                      Place Bid
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-dark text-light text-center py-3">
        © 2026 AuctionMart | Pune, India | auctionmart@gmail.com
      </footer>
    </div>
  );
}

export default Home;
