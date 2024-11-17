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
        <Link to="/verify-agent" className={styles.link}>Verify Agent</Link>
        <Link to="/agents-list" className={styles.link}>Agents List</Link>
      </nav>
    </header>
  );
};

export default Header;
