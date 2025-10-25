import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './DashboardPage.module.css';
import WeatherCard from '../components/WeatherCard';
import ForecastChart from '../components/ForecastChart';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const auth = useAuth();

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch from the new '/api/dashboard' endpoint
      const response = await fetch('/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      if (response.status === 401) {
        auth.logout();
        throw new Error('Session expired. Please log in again.');
      }
      
      // Handle rate limit error
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data.');
      }

      const result = await response.json();
      setDashboardData(result.data); // Set the 'data' object from the response

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const renderContent = () => {
    if (loading) {
      return <p className={styles.loading}>Loading dashboard data...</p>;
    }

    if (error) {
      return <p className={styles.error}>{error}</p>;
    }

    if (dashboardData) {
      const { tracked_cities, primary_forecast, system_alerts } = dashboardData;
      
      return (
        <div className={styles.dashboardGrid}>
          {/* Section 1: Weather Cards */}
          <div className={styles.sectionTitle}>Tracked Locations</div>
          <div className={styles.weatherCardGrid}>
            {tracked_cities.map((cityData) => (
              <WeatherCard key={cityData.id} data={cityData} />
            ))}
          </div>
          
          {/* Section 2: Forecast Chart */}
          <div className={styles.sectionTitle}>Forecast</div>
          <div className={styles.forecastSection}>
             <ForecastChart 
                data={primary_forecast.forecast} 
                city={primary_forecast.city} 
              />
          </div>

          {/* Section 3: Alerts */}
          {system_alerts.length > 0 && (
             <div className={styles.alertSection}>
              <div className={styles.sectionTitle}>Alerts</div>
                {system_alerts.map((alert) => (
                  <div key={alert.id} className={`${styles.alert} ${styles[alert.severity]}`}>
                    <strong>{alert.severity === 'warning' ? 'Warning: ' : 'Info: '}</strong>
                    {alert.message}
                  </div>
                ))}
             </div>
          )}
        </div>
      );
    }
    
    return null; // Should not be reached
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <button onClick={fetchDashboardData} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default DashboardPage;