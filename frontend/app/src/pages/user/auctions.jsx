import React, { useEffect, useState } from "react";
import { getActiveAuctions } from "../../services/auctionService";
import { Link } from "react-router-dom";

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await getActiveAuctions();
      setAuctions(response.data);
    } catch (err) {
      setError("Failed to load auctions");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading auctions...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red", textAlign: "center" }}>{error}</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Auctions</h1>

      {auctions.length === 0 ? (
        <p>No auctions available</p>
      ) : (
        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>Car</th>
              <th>Current Price</th>
              <th>Auction Ends</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {auctions.map((auction) => (
              <tr key={auction.auctionId}>
                <td>
                  {auction.brand} {auction.model}
                </td>
                <td>₹ {auction.currentPrice}</td>
                <td>
                  {new Date(auction.endTime).toLocaleString()}
                </td>
                <td>{auction.status}</td>
                <td>
                  <Link to={`/user/auction/${auction.auctionId}`}>
                    View Auction
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Auctions;
