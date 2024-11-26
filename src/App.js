import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setWeatherData(null);
      setError('City not found. Please try again.');
    }
  };

  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <h1>Weather App</h1>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={fetchWeather} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <WeatherCard weatherData={weatherData} />
                {weatherData && (
                  <Link
                    to="/forecast"
                    style={{
                      display: 'block',
                      marginTop: '20px',
                      textDecoration: 'none',
                      color: '#007BFF',
                    }}
                  >
                    View 5-Day Forecast
                  </Link>
                )}
              </>
            }
          />
          {/* Forecast Page */}
          <Route
            path="/forecast"
            element={weatherData ? <Forecast city={weatherData.name} /> : <p>No city selected.</p>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
