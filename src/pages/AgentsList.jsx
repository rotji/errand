import React, { useEffect, useState } from 'react';
import styles from './AgentsList.module.css';

// ✅ ADDED: Load backend base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const AgentsList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        // ✅ REPLACED: Hardcoded fetch URL with dynamic one
        const response = await fetch(`${API_BASE_URL}/api/agents`);

        if (!response.ok) {
          throw new Error('Failed to fetch agents');
        }
        const data = await response.json();
        setAgents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Nearby Agents</h2>
      {loading && <p>Loading agents...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && agents.length === 0 && (
        <p>No agents found in your area.</p>
      )}
      {!loading && !error && agents.length > 0 && (
        <ul className={styles.list}>
          {agents.map((agent) => (
            <li key={agent.id} className={styles.agent}>
              <p><strong>Name:</strong> {agent.name}</p>
              <p><strong>Phone:</strong> {agent.phone}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={
                    agent.verified ? styles.verified : styles.notVerified
                  }
                >
                  {agent.verified ? 'Verified' : 'Not Verified'}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgentsList;
