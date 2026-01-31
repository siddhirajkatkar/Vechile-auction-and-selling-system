import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";

const AdminAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/api/auctions/admin/all")
      .then((res) => setAuctions(res.data))
      .catch(() => setError("You are not authorized or failed to load auctions"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-dark" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-4">All Auctions (Admin)</h3>

      {auctions.length === 0 ? (
        <div className="alert alert-secondary text-center">
          No auctions found
        </div>
      ) : (
        <table className="table table-hover shadow-sm align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Current / Final Price</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {auctions.map((a) => (
              <tr key={a.auctionId}>
                <td>{a.auctionId}</td>
                <td>
                  <strong>{a.brand}</strong> {a.model}
                </td>
                <td>
                  <span
                    className={`badge ${
                      a.status === "ACTIVE"
                        ? "bg-success"
                        : a.status === "COMPLETED"
                        ? "bg-primary"
                        : "bg-secondary"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td>
                  ₹{a.currentPrice?.toLocaleString()}
                </td>
                <td>
                  {a.winnerName ? (
                    <span className="text-success fw-bold">
                      {a.winnerName}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminAuctions;
