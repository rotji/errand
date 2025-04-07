import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.title}>Errand</Link>
        <Link to="/">
          <img src="/logo.png" alt="Errand Logo" className={styles.logoImg} />
        </Link>
      </div>

      <nav className={styles.nav}>
        <Link to="/about" className={styles.link}>About</Link>
        <Link to="/register" className={styles.link}>Register</Link>
        <Link to="/login" className={styles.link}>Login</Link>
        <Link to="/request-task" className={styles.link}>Request Task</Link>
        <Link to="/tasks" className={styles.link}>Tasks</Link>
      </nav>

      <div className={styles.menuIcon} onClick={toggleMenu}>
        ☰
      </div>

      {menuOpen && (
        <div className={styles.menuDropdown}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/dashboard" className={styles.link}>Dashboard</Link>
          <Link to="/user-dashboard" className={styles.link}>User Dashboard</Link>
          <Link to="/agent-dashboard" className={styles.link}>Agent Dashboard</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
