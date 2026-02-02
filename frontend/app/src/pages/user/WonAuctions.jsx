import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { startPayment } from "../../util/startPayment";

const WonAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // UI-only username (safe default)
  const username = localStorage.getItem("username") || "User";

  useEffect(() => {
    fetchWonAuctions();
  }, []);

  const fetchWonAuctions = async () => {
    try {
      const res = await axiosInstance.get("/api/auctions/my-wins");
      setAuctions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch won auctions", err);
      alert("Failed to load won auctions");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = (auction) => {
    startPayment({
      amount: auction.currentPrice,
      paymentFor: "AUCTION_WIN",
      referenceId: auction.auctionId,
      title: `${auction.brand} ${auction.model} - Auction Payment`,
      onSuccess: () => {
        fetchWonAuctions(); // refresh after payment
        navigate("/user/won-auctions");
      },
    });
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className="spinner-border text-primary" />
        <p className="mt-2">Loading won auctions...</p>
      </div>
    );
  }

  return (
    <div className="min-vh-100 pb-5" style={{ backgroundColor: "#f3f4f7" }}>

      {/* HEADER */}
      <div className="bg-white border-bottom shadow-sm sticky-top">
        <div className="container py-3 d-flex justify-content-between align-items-center">

          {/* LEFT */}
          <div>
            <button
              className="btn btn-outline-secondary btn-sm rounded-pill mb-2"
              onClick={() => navigate("/user/dashboard")}
            >
              <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
            </button>

            <h4 className="fw-bold mb-0">
              🏆 My <span className="text-primary">Won Auctions</span>
            </h4>
          </div>

          {/* RIGHT */}
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
              style={{ width: "38px", height: "38px" }}
            >
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="text-end small">
              <div className="fw-bold text-dark">{username}</div>
              <div className="text-muted">Winner</div>
            </div>
          </div>

        </div>
      </div>

      {/* CONTENT */}
      <div className="container mt-5">

        {auctions.length === 0 ? (
          <div className="text-center text-muted mt-5">
            <h5>You haven’t won any auctions yet</h5>
            <p>Keep bidding — your win is coming 🏁</p>
          </div>
        ) : (
          auctions.map((a) => (
            <div key={a.auctionId} className="card mb-3 shadow-sm border-0 rounded-4 win-card">
              <div className="card-body d-flex justify-content-between align-items-center">

                <div>
                  <h5 className="fw-bold mb-1">
                    {a.brand} {a.model}
                  </h5>
                  <p className="mb-0 text-muted">
                    Final Price:{" "}
                    <span className="fw-bold text-success">
                      ₹{a.currentPrice?.toLocaleString()}
                    </span>
                  </p>
                </div>

                {!a.paid ? (
                  <button
                    className="btn btn-success rounded-pill fw-bold px-4"
                    onClick={() => handlePayment(a)}
                  >
                    Make Payment
                  </button>
                ) : (
                  <span className="badge bg-success fs-6 px-3 py-2">
                    Paid ✅
                  </span>
                )}

              </div>
            </div>
          ))
        )}
      </div>

      {/* STYLES */}
      <style>{`
        .win-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .win-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        }
      `}</style>

    </div>
  );
};

export default WonAuctions;
