import React from "react";
import styles from "../../pages/AgentDashboard.module.css";


const Support = ({ onRaiseDispute, onContactAdmin }) => {
  const handleDisputeSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onRaiseDispute(Object.fromEntries(formData));
  };

  const handleAdminContact = () => {
    onContactAdmin();
  };

  return (
    <div className={styles.support}>
      <h2 className={styles.sectionTitle}>Support</h2>

      <div className={styles.raiseDispute}>
        <h3>Raise a Dispute</h3>
        <form onSubmit={handleDisputeSubmit}>
          <label>
            Task ID: <input name="taskId" />
          </label>
          <label>
            Issue Description: <textarea name="issue" />
          </label>
          <button type="submit">Submit Dispute</button>
        </form>
      </div>

      <div className={styles.contactAdmin}>
        <h3>Contact Admin</h3>
        <button onClick={handleAdminContact}>Contact Admin</button>
      </div>
    </div>
  );
};

export default Support;
