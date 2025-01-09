import React, { useState } from "react";
import styles from "./BidButton.module.css";

const BidButton = ({ onBid }) => {
  const [isBidding, setIsBidding] = useState(false);

  const handleBid = async () => {
    setIsBidding(true);
    try {
      if (onBid) {
        await onBid(); // Call the passed `onBid` handler
      }
      alert("Bid successfully submitted!");
    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("Failed to submit the bid.");
    } finally {
      setIsBidding(false);
    }
  };

  return (
    <button
      className={`${styles.bidButton} ${isBidding ? styles.disabled : ""}`}
      onClick={handleBid}
      disabled={isBidding}
    >
      {isBidding ? "Submitting..." : "Bid Task"}
    </button>
  );
};

export default BidButton;
