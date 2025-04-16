import React, { useEffect, useState } from 'react';
import styles from './FindAgent.module.css';
import Map from "../components/Map";
import AgentCard from "../components/AgentCard";
import axios from 'axios';

// ✅ ADDED: Load API base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const FindAgent = () => {
  const [agents, setAgents] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Fetch user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => console.error("Error fetching user location:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      // ✅ REPLACED: Hardcoded URL with .env-based dynamic URL
      axios
        .get(`${API_BASE_URL}/api/agents/find?lat=${userLocation.latitude}&lng=${userLocation.longitude}`)
        .then((response) => setAgents(response.data))
        .catch((error) => console.error("Error fetching agents:", error));
    }
  }, [userLocation]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Find an Agent</h2>
      <Map userLocation={userLocation} agents={agents} />
      <div className={styles.agentList}>
        {agents.map((agent, index) => (
          <AgentCard
            key={index}
            name={agent.name}
            phone={agent.phone}
            verified={agent.verified}
            distance={agent.distance}
          />
        ))}
      </div>
    </div>
  );
};

export default FindAgent;
