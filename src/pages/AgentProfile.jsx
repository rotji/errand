import React from 'react';
import styles from './AgentProfile.module.css';

const AgentProfile = ({ agent }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Agent Profile</h2>
      <p>Name: {agent?.name || 'Unknown'}</p>
      <p>Rating: {agent?.rating || 'N/A'}</p>
      <p>Distance: {agent?.distance || 'N/A'} km</p>
      <p>
        Verification Status:{' '}
        <span className={agent?.verified ? styles.verified : styles.notVerified}>
          {agent?.verified ? 'Verified' : 'Not Verified'}
        </span>
      </p>
    </div>
  );
};

export default AgentProfile;
