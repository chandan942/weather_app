import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import Forecast from './components/Forecast';
import { fetchWeather, fetchForecast } from './services/weatherApi';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getWeatherTheme } from './utils/weatherThemes';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      console.error(err);
      // Fallback to mock data on 401 (Invalid API Key) or 404 (City not found - though usually we want to show error for that, for now let's keep it simple or just handle 401)
      if (err.response && err.response.status === 401) {
        const { fetchMockWeather, fetchMockForecast } = await import('./services/weatherApi');
        const [weatherData, forecastData] = await Promise.all([
          fetchMockWeather(),
          fetchMockForecast()
        ]);
        setWeather(weatherData);
        setForecast(forecastData);
        setError('API Key not yet active. Showing demo data.');
      } else {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch weather data. Please try again.';
        setError(errorMessage);
        setWeather(null);
        setForecast(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    handleSearch('London');
  }, []);

  const bgTheme = getWeatherTheme(weather);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgTheme} transition-all duration-1000 ease-in-out text-white font-sans selection:bg-sky-500 selection:text-white`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold drop-shadow-md">
            Weather Forecast
          </h1>
          <p className="opacity-80 mt-2">Your daily weather companion</p>
        </header>
        <main>
          <SearchBar onSearch={handleSearch} />

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin mb-4 opacity-80" />
              <p className="opacity-80">Loading weather data...</p>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 mb-8 backdrop-blur-sm"
            >
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </motion.div>
          )}

          {!loading && !error && weather && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CurrentWeather data={weather} />
              <WeatherDetails data={weather} />
              <Forecast data={forecast} />
            </motion.div>
          )}
        </main>
        <footer className="mt-12 text-center opacity-60 text-sm">
          <p>© {new Date().getFullYear()} Weather App. Built with React & Tailwind.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
