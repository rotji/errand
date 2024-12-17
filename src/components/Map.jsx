import React, { useEffect, useRef } from 'react';
import styles from './Map.module.css';

const Map = ({ userLocation, agents }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && userLocation) {
      // Initialize map and plot locations (replace with actual map library logic)
      console.log('User Location:', userLocation);
      console.log('Agents:', agents);

      // For now, simulate adding markers for agents
      agents.forEach((agent, index) => {
        console.log(`Agent ${index + 1} at location:`, agent.location);
      });
    }
  }, [userLocation, agents]);

  return <div className={styles.mapContainer} ref={mapRef}>Map Component</div>;
};

export default Map;
