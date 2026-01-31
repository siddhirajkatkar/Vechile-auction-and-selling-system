import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">🏆 My Won Auctions</h3>

      {auctions.length === 0 ? (
        <p className="text-muted">You haven’t won any auctions yet.</p>
      ) : (
        auctions.map((a) => (
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

              <button
                className="btn btn-success"
                onClick={() => navigate(`/payment/${a.auctionId}`)}
              >
                Make Payment
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WonAuctions;
