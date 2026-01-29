import React, { useEffect, useState } from "react";
import { getUserAuctions } from "../../services/auctionService";
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
      const response = await getUserAuctions();
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
              <th>Year</th>
              <th>Fuel</th>
              <th>Start Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {auctions.map((auction) => (
              <tr key={auction.auctionId}>
                <td>
                  {auction.car?.brand} {auction.car?.model}
                </td>
                <td>{auction.car?.manufactureYear}</td>
                <td>{auction.car?.fuelType}</td>
                <td>₹ {auction.startPrice}</td>
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
