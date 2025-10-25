import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from './ForecastChart.module.css';

const ForecastChart = ({ data, city }) => {
  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>5-Day Forecast: {city}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: -20, // Move axis labels closer
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="day" stroke="var(--color-text-secondary)" />
          <YAxis stroke="var(--color-text-secondary)" unit="°C" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-surface-secondary)',
              borderColor: 'var(--color-border)',
              borderRadius: 'var(--border-radius)',
            }}
            labelStyle={{ color: 'var(--color-light)' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="max_temp"
            name="Max Temp"
            stroke="var(--color-primary)"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="min_temp"
            name="Min Temp"
            stroke="var(--color-accent)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;