import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Forecast = ({ city }) => {
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState('');
  const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        setForecastData(response.data.list);
        setError('');
      } catch (err) {
        setError('Unable to fetch forecast data. Please try again.');
      }
    };

    if (city) {
      fetchForecast();
    }
  }, [city]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!forecastData.length) {
    return <p>Loading forecast...</p>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h2>5-Day Forecast for {city}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {forecastData.slice(0, 5).map((item, index) => (
          <div
            key={index}
            style={{
              margin: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              textAlign: 'center',
              width: '150px',
            }}
          >
            <p><strong>{new Date(item.dt_txt).toLocaleDateString()}</strong></p>
            <p>{item.weather[0].description}</p>
            <p>Temp: {Math.round(item.main.temp)}°C</p>
            <p>Humidity: {item.main.humidity}%</p>
          </div>
        ))}
      </div>
      <Link to="/" style={{ textDecoration: 'none', color: '#007BFF' }}>Go Back</Link>
    </div>
  );
};

export default Forecast;
