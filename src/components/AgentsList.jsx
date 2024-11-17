import React, { useEffect, useState } from 'react';
import styles from './AgentsList.module.css';

const AgentsList = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      // Simulate an API call
      const response = await fetch('/api/agents');
      const data = await response.json();
      setAgents(data);
    };

    fetchAgents();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Nearby Agents</h2>
      {agents.length === 0 ? (
        <p>No agents found in your area.</p>
      ) : (
        <ul className={styles.list}>
          {agents.map((agent) => (
            <li key={agent.id} className={styles.agent}>
              <p>Name: {agent.name}</p>
              <p>Phone: {agent.phone}</p>
              <p>Status: {agent.verified ? 'Verified' : 'Not Verified'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgentsList;
