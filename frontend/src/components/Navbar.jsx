import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Navbar.module.css';
// --- 1. Import the icons ---
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navBrand}>
        <NavLink to="/">AtmosCore</NavLink>
      </div>

      <ul className={styles.navList}>
        {/* --- Main Nav Links --- */}
        <li className={styles.navItem}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Home
          </NavLink>
        </li>
        {token ? (
          <>
            <li className={styles.navItem}>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Dashboard
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li className={styles.navItem}>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Admin Login
            </NavLink>
          </li>
        )}

        <li className={styles.divider}></li> 

        <li className={styles.navItem}>
          <a
            href="https://devAniketcolb"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIconLink}
          >
            <FaGithub />
          </a>
        </li>
        <li className={styles.navItem}>
          <a
            href="https://devAniketcolb" 
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIconLink}
          >
            <FaTwitter />
          </a>
        </li>
        <li className={styles.navItem}>
          <a
            href="https://devAniketcolb"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIconLink}
          >
            <FaLinkedin />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;