import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest(`.${styles.header}`)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  const navigationLinks = [
    { to: "/about", label: "About" },
    { to: "/register", label: "Register" },
    { to: "/login", label: "Login" },
    { to: "/request-task", label: "Request Task" },
    { to: "/tasks", label: "Tasks" }
  ];

  const dashboardLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/user-dashboard", label: "User Dashboard" },
    { to: "/agent-dashboard", label: "Agent Dashboard" }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.title}>Errand</Link>
        <Link to="/">
          <img src="/logo.png" alt="Errand Logo" className={styles.logoImg} />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className={styles.nav}>
        {navigationLinks.map((link) => (
          <Link key={link.to} to={link.to} className={styles.link}>
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className={styles.menuIcon} 
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Mobile Menu Overlay */}
      {menuOpen && isMobile && (
        <div className={styles.mobileOverlay} onClick={closeMenu}>
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mobileMenuHeader}>
              <h3>Navigation</h3>
              <button className={styles.closeButton} onClick={closeMenu} aria-label="Close menu">
                ×
              </button>
            </div>
            
            <div className={styles.mobileMenuContent}>
              <div className={styles.menuSection}>
                <h4>Main Pages</h4>
                {navigationLinks.map((link) => (
                  <Link 
                    key={link.to} 
                    to={link.to} 
                    className={styles.mobileLink}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className={styles.menuSection}>
                <h4>Dashboards</h4>
                {dashboardLinks.map((link) => (
                  <Link 
                    key={link.to} 
                    to={link.to} 
                    className={styles.mobileLink}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Dropdown Menu */}
      {menuOpen && !isMobile && (
        <div className={styles.desktopDropdown}>
          <div className={styles.dropdownSection}>
            <h4>Dashboards</h4>
            {dashboardLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={styles.dropdownLink}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
