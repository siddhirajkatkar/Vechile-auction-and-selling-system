import { useEffect, useState } from "react";
import { getMyBids } from "../../services/bidService";

const MyBids = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    loadBids();
  }, []);

  const loadBids = async () => {
    const res = await getMyBids();
    setBids(res.data);
  };

  return (
    <div>
      <h3>My Bids</h3>
      {/* render table */}
    </div>
  );
};

export default MyBids;
