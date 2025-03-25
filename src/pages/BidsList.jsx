import React, { useEffect, useState } from "react";
import styles from "./BidsList.module.css";
import { acceptBid } from "../components/utils/api";

const BidsList = () => {
  const [tasksWithBids, setTasksWithBids] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all tasks that have bids
  const fetchTasksWithBids = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/tasks/all-tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const tasks = await response.json();
      const tasksWithBids = tasks.filter(
        (task) => Array.isArray(task.bids) && task.bids.length > 0
      );
      setTasksWithBids(tasksWithBids);
    } catch (err) {
      console.error("Error fetching tasks with bids:", err);
      setError("Failed to load tasks with bids.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all agents from the backend
  const fetchAgents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/agents");
      if (!response.ok) {
        throw new Error("Failed to fetch agents");
      }
      const agentsData = await response.json();
      setAgents(agentsData);
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  useEffect(() => {
    fetchTasksWithBids();
    fetchAgents();
  }, []);

  // Create a mapping from agent _id to full agent details.
  const agentMap = agents.reduce((map, agent) => {
    map[agent._id.toString()] = agent;
    return map;
  }, {});

  // Handler for accepting a bid.
  const handleAccept = async (taskId, bidId) => {
    try {
      await acceptBid(taskId, bidId);
      alert("Bid accepted successfully.");
      fetchTasksWithBids(); // Refresh the tasks with bids after accepting one.
    } catch (err) {
      console.error("Error accepting bid:", err);
      alert("Failed to accept bid.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tasks with Bids</h2>
      {loading ? (
        <p className={styles.message}>Loading tasks...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : tasksWithBids.length === 0 ? (
        <p className={styles.message}>No tasks with bids found.</p>
      ) : (
        tasksWithBids.map((task) => (
          <div key={task._id} className={styles.taskCard}>
            <h3 className={styles.taskTitle}>{task.title}</h3>
            <p className={styles.taskDescription}>{task.description}</p>
            <p className={styles.taskInfo}>
              <strong>From:</strong> {task.from} | <strong>To:</strong> {task.to} |{" "}
              <strong>Amount:</strong> ${task.amount} | <strong>Transport:</strong> $
              {task.transport}
            </p>
            <div className={styles.bidsSection}>
              <h4>Bids:</h4>
              <ul className={styles.bidList}>
                {task.bids.map((bid) => {
                  // Look up the full agent details using the bid's agentId (inside the map function).
                  const agentDetails = agentMap[bid.agentId];

                  return (
                    <li key={bid._id} className={styles.bidItem}>
                      <div className={styles.bidInfo}>
                        {agentDetails ? (
                          <>
                            <div>
                              <strong>Name:</strong> {agentDetails.name}
                            </div>
                            <div>
                              <strong>Email:</strong> {agentDetails.email}
                            </div>
                            <div>
                              <strong>Phone:</strong> {agentDetails.phone}
                            </div>
                            {/* Add additional bio details here if needed */}
                          </>
                        ) : (
                          <span>{bid.agentId}</span>
                        )}
                        <div>
                          <strong>Date:</strong> {new Date(bid.date).toLocaleString()} |{" "}
                          <strong>Status:</strong> {bid.status}
                        </div>
                      </div>
                      {bid.status === "pending" && (
                        <button
                          className={styles.acceptButton}
                          onClick={() => handleAccept(task._id, bid._id)}
                        >
                          Accept Bid
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BidsList;
