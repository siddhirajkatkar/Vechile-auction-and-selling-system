import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { startPayment } from "../../util/startPayment";

const WonAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWonAuctions();
  }, []);

  const fetchWonAuctions = async () => {
    try {
      const res = await axiosInstance.get("/api/auctions/my-wins");
      setAuctions(res.data);
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
        fetchWonAuctions(); // refresh to show Paid ✅
        navigate("/user/won-auctions");
      }
    });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Loading won auctions...</p>
      </div>
    );
  }

  if (auctions.length === 0) {
    return (
      <div className="text-center mt-5">
        <h4>You haven’t won any auctions yet.</h4>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4 text-center">🏆 My Won Auctions</h3>

      {auctions.map((a) => (
        <div key={a.auctionId} className="card mb-3 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">
                {a.brand} {a.model}
              </h5>
              <p className="mb-0 text-muted">
                Final Price: ₹{a.currentPrice?.toLocaleString()}
              </p>
            </div>

            {!a.paid ? (
              <button
                className="btn btn-success"
                onClick={() => handlePayment(a)}
              >
                Make Payment
              </button>
            ) : (
              <span className="badge bg-success fs-6">
                Paid ✅
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WonAuctions;
