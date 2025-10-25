import React from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Welcome to AtmosCore</h1>
      <p className={styles.subtitle}>
        The Admin Dashboard for Global Weather Monitoring.
      </p>
      <p>
        Please use the <strong>Admin Login</strong> link to access the
        protected dashboard.
      </p>
    </div>
  );
};

export default HomePage;