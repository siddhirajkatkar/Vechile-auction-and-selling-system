import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/">AuctionMart</Link>

        <div className="ms-auto">
          <Link to="/login" className="btn btn-outline-light me-2">
            Login
          </Link>
          <Link to="/register" className="btn btn-warning">
            Register
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="bg-light text-center py-5">
        <h1 className="display-5 fw-bold">Welcome to AuctionMart</h1>
        <p className="lead mt-3">
          Buy and sell vehicles through live auctions with ease.
        </p>

        <div className="mt-4">
          <Link to="/vehicles" className="btn btn-primary btn-lg me-3">
            Browse Vehicles
          </Link>
          <Link to="/register" className="btn btn-outline-secondary btn-lg">
            Get Started
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-5">
        <div className="row text-center">
          <div className="col-md-4">
            <h4>Browse Vehicles</h4>
            <p>Explore live and upcoming vehicle auctions.</p>
            <Link to="/vehicles">View Vehicles →</Link>
          </div>

          <div className="col-md-4">
            <h4>Live Auctions</h4>
            <p>Participate in transparent bidding.</p>
            <Link to="/vehicles">View Auctions →</Link>
          </div>

          <div className="col-md-4">
            <h4>Secure Platform</h4>
            <p>Trusted buyers and verified sellers.</p>
            <Link to="/about">Learn More →</Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-dark text-light py-5 text-center">
        <h3>About AuctionMart</h3>
        <p className="mt-3 w-75 mx-auto">
          AuctionMart is a modern vehicle auction platform connecting buyers
          and sellers with secure authentication and real-time bidding.
        </p>
        <Link to="/about" className="btn btn-outline-light mt-3">
          Read More
        </Link>
      </section>

      {/* SUPPORT */}
      <section className="container py-5 text-center">
        <h3>Need Help?</h3>
        <p>Our support team is here to assist you.</p>
        <Link to="/contact" className="btn btn-primary">
          Contact Support
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-light text-center py-4">
        <p className="mb-1">© 2026 AuctionMart</p>
        <div>
          <Link to="/terms" className="me-3">Terms</Link>
          <Link to="/terms">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}

export default Home;
