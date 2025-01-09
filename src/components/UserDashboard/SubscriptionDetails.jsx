import React from 'react';

const SubscriptionDetails = ({ subscription }) => {
  if (!subscription) return null;

  return (
    <div className="subscription-details">
      <h2>Subscription Details</h2>
      <p>Plan: {subscription.plan}</p>
      <p>Tasks Left: {subscription.tasksLeft}</p>
      <p>Expiry Date: {new Date(subscription.expiryDate).toLocaleDateString()}</p>
    </div>
  );
};

export default SubscriptionDetails;
