import React, { useState, useEffect, useMemo } from 'react';
import DynamicBackground from './components/DynamicBackground';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import Forecast from './components/Forecast';
import { fetchWeather, fetchForecast } from './services/weatherApi';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTimeOfDay, getWeatherCategory } from './utils/timeDetection';
import { getAdaptiveTheme } from './utils/weatherThemes';

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

  // Calculate adaptive theme based on weather data and time
  const currentTheme = useMemo(() => {
    if (!weather) return null;

    // Get current timestamp and sunrise/sunset from weather data
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const sunrise = weather.sys?.sunrise || currentTime;
    const sunset = weather.sys?.sunset || currentTime + 43200; // Default: 12 hours later

    // Determine time of day
    const timeOfDay = getTimeOfDay(currentTime, sunrise, sunset);

    // Determine weather category
    const weatherCategory = getWeatherCategory(weather.weather?.[0]?.main);

    // Get complete theme configuration
    return getAdaptiveTheme(timeOfDay, weatherCategory);
  }, [weather]);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      <DynamicBackground theme={currentTheme} />

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-2xl">
            Weather Forecast
          </h1>
          <p className="text-slate-300 text-lg">Your cosmic weather companion</p>
        </header>
        <main>
          <SearchBar onSearch={handleSearch} />

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-cyan-400" />
              <p className="text-slate-300">Loading weather data...</p>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-400/50 p-4 rounded-xl flex items-center gap-3 mb-8 backdrop-blur-md"
            >
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-200">{error}</p>
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
        <footer className="mt-12 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Weather App. Built with React & Tailwind.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
