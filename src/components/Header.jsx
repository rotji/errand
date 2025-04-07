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
        {/* Logo placeholder removed for now */}
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

      <ul className={`${styles.dropdownMenu} ${menuOpen ? styles.show : ''}`}>
        <li><Link to="/" className={styles.menuLink}>Home</Link></li>
        <li><Link to="/dashboard" className={styles.menuLink}>Dashboard</Link></li>
        <li><Link to="/user-dashboard" className={styles.menuLink}>User Dashboard</Link></li>
        <li><Link to="/agent-dashboard" className={styles.menuLink}>Agent Dashboard</Link></li>
      </ul>
    </header>
  );
};

export default Header;
