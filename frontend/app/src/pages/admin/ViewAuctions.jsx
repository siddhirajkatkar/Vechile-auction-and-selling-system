import { useEffect, useState } from "react";
import { getOngoingAuctions } from "../../services/auctionService";

const ViewAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAuctions();
  }, []);

  const loadAuctions = async () => {
    try {
      setLoading(true);
      const res = await getOngoingAuctions();
      setAuctions(res.data || []);
      setError("");
    } catch (err) {
      setError("Unable to load auctions. Backend not ready.");
      setAuctions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Ongoing Auctions</h3>

      {/* Loading */}
      {loading && (
        <p className="text-muted mt-3">Loading ongoing auctions...</p>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="text-danger mt-3">{error}</p>
      )}

      {/* No auctions */}
      {!loading && !error && auctions.length === 0 && (
        <p className="text-muted mt-3">
          No ongoing auctions at the moment.
        </p>
      )}

      {/* Auctions list */}
      {!loading && !error && auctions.length > 0 && (
        auctions.map((a) => (
          <div key={a.auctionId} className="card p-3 mb-3">
            <p><b>Car:</b> {a.carName}</p>
            <p><b>Highest Bid:</b> ₹{a.highestBid}</p>
            <p><b>Status:</b> {a.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewAuctions;
