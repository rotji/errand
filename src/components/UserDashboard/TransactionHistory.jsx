import React from 'react';

const TransactionHistory = ({ transactions }) => {
  if (!transactions || transactions.length === 0) return <p>No transactions available.</p>;

  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <p>Plan: {transaction.plan}</p>
            <p>Amount: ${transaction.amount}</p>
            <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
            {transaction.details && (
              <>
                <p>Tasks Completed: {transaction.details.tasksCompleted}</p>
                <p>Transport Charges: ${transaction.details.transportCharges}</p>
                <p>Platform Charges: ${transaction.details.platformCharges}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
