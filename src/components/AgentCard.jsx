import React from 'react';
import styles from './AgentCard.module.css';

const AgentCard = ({ name, phone, verified, distance }) => {
  return (
    <div className={styles.card}>
      <p className={styles.name}>Name: {name}</p>
      <p>Phone: {phone}</p>
      <p>
        Status: 
        <span className={verified ? styles.verified : styles.notVerified}>
          {verified ? 'Verified' : 'Not Verified'}
        </span>
      </p>
      <p>Distance: {distance.toFixed(2)} km</p>
    </div>
  );
};

export default AgentCard;
