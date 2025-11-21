import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'YOUR_API_KEY'; // Fallback to mock if not set
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Mock data for demonstration if no API key is provided
const mockCurrentWeather = {
    name: 'New York',
    main: { temp: 20, humidity: 65, pressure: 1012, feels_like: 18 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 5.5 },
    sys: { country: 'US', sunrise: 1625216400, sunset: 1625270400 },
    dt: 1625245200,
};

const mockForecast = {
    list: Array(5).fill(null).map((_, i) => ({
        dt: 1625245200 + i * 86400,
        main: { temp: 22 + i, temp_min: 18 + i, temp_max: 25 + i },
        weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
    })),
};

export const fetchMockWeather = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCurrentWeather;
};

export const fetchMockForecast = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockForecast;
};

export const fetchWeather = async (city) => {
    if (API_KEY === 'YOUR_API_KEY') {
        console.warn('Using mock data. Please provide an OpenWeatherMap API key.');
        return fetchMockWeather();
    }
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                units: 'metric',
                appid: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
};

export const fetchForecast = async (city) => {
    if (API_KEY === 'YOUR_API_KEY') {
        return fetchMockForecast();
    }
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                units: 'metric',
                appid: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching forecast:', error);
        throw error;
    }
};
