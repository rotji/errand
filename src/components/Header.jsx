import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  // ✅ Keep only this single useState declaration
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styleccds.logo}>
        <Link to="/" className={styles.link}>Errand</Link>
      </div>
      
      <nav className={styles.nav}>
        <Link to="/about" className={styles.link}>About</Link>
        <Link to="/register" className={styles.link}>Register</Link> 
        <Link to="/login" className={styles.link}>Login</Link>
        <Link to="/request-task" className={styles.link}>Request Task</Link> 
        <Link to="/tasks" className={styles.link}>Tasks</Link>

        {/* Hamburger Menu Button */}
        <button className={styles.menuButton} onClick={toggleMenu}>
          ☰
        </button>

        {/* Conditionally render the hidden links */}
        {menuOpen && (
          <div className={styles.menuDropdown}>
            <Link to="/dashboard" className={styles.link}>Dashboard</Link> 
            <Link to="/user-dashboard" className={styles.link}>User Dashboard</Link>
            <Link to="/agent-dashboard" className={styles.link}>Agent Dashboard</Link>
            <Link to="/" className={styles.link}>Home</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
