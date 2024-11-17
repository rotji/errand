import React, { useState } from 'react';
import styles from './AgentVerification.module.css';

const AgentVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agentInfo, setAgentInfo] = useState(null);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    try {
      setError('');
      setAgentInfo(null);

      // API call to verify agent
      const response = await fetch(`/api/agents/verify?phone=${phoneNumber}`);
      if (!response.ok) throw new Error('Agent not found');
      const data = await response.json();
      setAgentInfo(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Verify Agent</h1>
      <input
        type="text"
        placeholder="Enter Agent's Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleVerify} className={styles.button}>
        Verify
      </button>
      {error && <p className={styles.error}>{error}</p>}
      {agentInfo && (
        <div className={styles.agentInfo}>
          <h2>Agent Details</h2>
          <p>Name: {agentInfo.name}</p>
          <p>Phone: {agentInfo.phone}</p>
          <p>Status: {agentInfo.verified ? 'Verified' : 'Not Verified'}</p>
        </div>
      )}
    </div>
  );
};

export default AgentVerification;
