import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.link}>Errand</Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/about" className={styles.link}>About</Link>
        <Link to="/register" className={styles.link}>Register</Link> 
        <Link to="/login" className={styles.link}>Login</Link>
        <Link to="/dashboard" className={styles.link}>Dashboard</Link> 
        <Link to="/analytics" className={styles.link}>Analytics</Link> 
        <Link to="/verify-agent" className={styles.link}>Verify Agent</Link>
        <Link to="/agents-list" className={styles.link}>Agents List</Link>
        <Link to="/find-agent" className={styles.link}>Find Agent</Link> 
        <Link to="/request-task" className={styles.link}>Request Task</Link> 
        <Link to="/agent-profile" className={styles.link}>Agent Profile</Link> 
        <Link to="/user-dashboard" className={styles.link}>User Dashboard</Link>
        <Link to="/agent-dashboard" className={styles.link}>Agent Dashboard</Link> 
        <Link to="/tasks" className={styles.link}>Tasks</Link>
      </nav>
    </header>
  );
};

export default Header;
