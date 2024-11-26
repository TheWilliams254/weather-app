import React from 'react';
import axios from 'axios';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) {
    return null; // Don't render anything if no data
  }

  const { name, main, weather, wind } = weatherData;

  return (
    <div style={{
      margin: '20px',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      width: '300px',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
    }}>
      <h2>{name}</h2>
      <p>
        <strong>Temperature:</strong> {Math.round(main.temp)}°C
      </p>
      <p>
        <strong>Condition:</strong> {weather[0].description}
      </p>
      <p>
        <strong>Humidity:</strong> {main.humidity}%
      </p>
      <p>
        <strong>Wind Speed:</strong> {wind.speed} m/s
      </p>
    </div>
  );
};

export default WeatherCard;
