import { useEffect, useState } from "react";
import { getUserAuctions } from "../../services/auctionService";

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
      const res = await getUserAuctions();
      setAuctions(res.data || []);
      setError("");
    } catch (err) {
      console.error("AUCTION LOAD ERROR:", err);
      setError("Unable to load auctions.");
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
      {!loading && !error && auctions.length > 0 &&
        auctions.map((a) => (
          <div key={a.auctionId} className="card p-3 mb-3">
            <p>
              <b>Car:</b>{" "}
              {a.car ? `${a.car.brand} ${a.car.model}` : "N/A"}
            </p>

            <p>
              <b>Start Price:</b> ₹{a.startPrice}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span className="badge bg-success">{a.status}</span>
            </p>
          </div>
        ))
      }
    </div>
  );
};

export default ViewAuctions;
