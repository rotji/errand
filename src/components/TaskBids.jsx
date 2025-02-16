// src/components/TaskBids.jsx
import React, { useEffect, useState } from "react";
import { getTaskBids, acceptBid } from "./utils/api"; // adjust the import path if needed

const TaskBids = ({ taskId }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBids = async () => {
    setLoading(true);
    try {
      const data = await getTaskBids(taskId);
      // Assuming the response has a "bids" property (adjust if necessary)
      setBids(data.bids || []);
    } catch (err) {
      console.error("Error fetching bids:", err);
      setError("Failed to load bids.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskId) {
      fetchBids();
    }
  }, [taskId]);

  const handleAcceptBid = async (bidId) => {
    try {
      await acceptBid(taskId, bidId);
      alert("Bid accepted successfully");
      fetchBids(); // refresh bids after accepting one
    } catch (err) {
      console.error("Error accepting bid:", err);
      alert("Failed to accept bid.");
    }
  };

  return (
    <div>
      <h3>Bids for Task</h3>
      {loading ? (
        <p>Loading bids...</p>
      ) : error ? (
        <p>{error}</p>
      ) : bids.length === 0 ? (
        <p>No bids found.</p>
      ) : (
        <ul>
          {bids.map((bid) => (
            <li key={bid._id}>
              <span>Agent: {bid.agentId}</span> | <span>Status: {bid.status}</span>{" "}
              {bid.status === "pending" && (
                <button onClick={() => handleAcceptBid(bid._id)}>Accept Bid</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskBids;
