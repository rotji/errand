import React, { useState } from 'react';
import styles from './AgentVerification.module.css';

// ✅ ADDED: Load API base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const AgentVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agentInfo, setAgentInfo] = useState(null);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    try {
      setError('');
      setAgentInfo(null);

      // ✅ REPLACED: Hardcoded fetch URL with .env-based dynamic URL
      const response = await fetch(`${API_BASE_URL}/api/agents/verify?phone=${phoneNumber}`);

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
