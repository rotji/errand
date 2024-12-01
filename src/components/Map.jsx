import React, { useEffect, useRef, useState } from 'react';
import styles from './Map.module.css'; // Import the CSS module

const Map = () => {
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate map initialization
    const initializeMap = () => {
      if (mapRef.current) {
        console.log('Map initialized in', mapRef.current);

        // Replace this with actual map initialization logic
        setTimeout(() => {
          setIsLoading(false); // Simulate map loading completion
        }, 2000); // Simulating loading time
      }
    };

    initializeMap();
  }, []);

  return (
    <div className={styles.mapContainer} ref={mapRef}>
      {isLoading ? (
        <div className={styles.mapLoading}>Loading map...</div>
      ) : (
        // Replace with the map rendering logic
        <div>Map is ready!</div>
      )}
    </div>
  );
};

export default Map;
