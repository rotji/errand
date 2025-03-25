import React from "react";
import styles from "../../pages/AgentDashboard.module.css"; // Ensure this file exists

const TransactionHistory = (props) => {
  const transactions = props.transactions || [];
  const paidTasks = props.paidTasks || [];
  const unpaidTasks = props.unpaidTasks || [];
  const { totalEarnings = { paid: 0, pending: 0 } } = props; // Default values

  return (
    <div className={styles?.transactionHistory || ""}>
      <h2 className={styles?.sectionTitle || ""}>Transaction History</h2>

      <div className={styles?.paidTasks || ""}>
        <h3>Paid Tasks</h3>
        {paidTasks.length > 0 ? (
          <ul>
            {paidTasks.map((task, index) => (
              <li key={index} className={styles?.taskItem || ""}>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Payment Amount:</strong> ${task.paymentAmount}</p>
                <p><strong>Payment Date:</strong> {task.paymentDate}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No paid tasks yet.</p>
        )}
      </div>

      <div className={styles?.unpaidTasks || ""}>
        <h3>Unpaid Tasks</h3>
        {unpaidTasks.length > 0 ? (
          <ul>
            {unpaidTasks.map((task, index) => (
              <li key={index} className={styles?.taskItem || ""}>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Expected Payment Date:</strong> {task.expectedPaymentDate}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No unpaid tasks.</p>
        )}
      </div>

      <div className={styles?.totalEarnings || ""}>
        <h3>Total Earnings</h3>
        <p><strong>Paid:</strong> ${totalEarnings.paid}</p>
        <p><strong>Pending:</strong> ${totalEarnings.pending}</p>
      </div>
    </div>
  );
};

export default TransactionHistory;
