import React from 'react';
import styles from './WeatherCard.module.css';

// Simple icons (you could replace these with an icon library)
const ICONS = {
  Sunny: '☀️',
  Clear: '☀️',
  Cloudy: '☁️',
  Rainy: '🌧️',
  Showers: '🌦️',
  'Partly Cloudy': '⛅',
};

const WeatherCard = ({ data }) => {
  const { city, temp, condition, humidity, wind, feels_like } = data;
  const icon = ICONS[condition] || '🌡️';

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.city}>{city}</span>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.main}>
        <span className={styles.temp}>{temp}°C</span>
        <span className={styles.condition}>{condition}</span>
      </div>
      <div className={styles.footer}>
        <div className={styles.detail}>
          <span className={styles.label}>Feels Like</span>
          <span className={styles.value}>{feels_like}°C</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.label}>Humidity</span>
          <span className={styles.value}>{humidity}%</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.label}>Wind</span>
          <span className={styles.value}>{wind} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;