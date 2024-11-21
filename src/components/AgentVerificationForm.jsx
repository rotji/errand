import React, { useState } from 'react';
import styles from './AgentVerificationForm.module.css';

const AgentVerificationForm = ({ onVerify }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(phoneNumber);
    setPhoneNumber('');
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Phone Number:
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={styles.input}
          placeholder="Enter agent's phone number"
          required
        />
      </label>
      <button type="submit" className={styles.submitButton}>
        Verify Agent
      </button>
    </form>
  );
};

export default AgentVerificationForm;
