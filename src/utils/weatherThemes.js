/**
 * Adaptive Weather Themes
 * Provides background theme configurations based on time of day and weather conditions
 */

/**
 * Theme configurations for each time of day period
 */
const timeThemes = {
    sunrise: {
        gradient: ['#FF6B6B', '#FFD93D', '#FF8C42', '#95E1D3'],
        glowColor: '#FFD93D',
        glowPosition: '20%', // Sun rises from bottom
        particleColor: 'rgba(255, 217, 61, 0.6)',
        atmosphericHaze: 'rgba(255, 139, 66, 0.2)',
        stars: false,
        cloudOpacity: 0.3,
    },
    day: {
        gradient: ['#4A90E2', '#87CEEB', '#B0E0E6', '#E0F6FF'],
        glowColor: '#FDB813',
        glowPosition: '10%', // Sun high in sky
        particleColor: 'rgba(255, 255, 255, 0.5)',
        atmosphericHaze: 'rgba(255, 255, 255, 0.15)',
        stars: false,
        cloudOpacity: 0.6,
    },
    sunset: {
        gradient: ['#FF6B35', '#F7B733', '#FC5C7D', '#6A2C70'],
        glowColor: '#FC5C7D',
        glowPosition: '80%', // Sun sets low
        particleColor: 'rgba(252, 92, 125, 0.5)',
        atmosphericHaze: 'rgba(247, 183, 51, 0.25)',
        stars: false,
        cloudOpacity: 0.4,
    },
    night: {
        gradient: ['#0B1026', '#1A1F3A', '#2E1F47', '#1e1b4b'],
        glowColor: '#E8E8E8',
        glowPosition: '15%', // Moon position
        particleColor: 'rgba(255, 255, 255, 0.8)',
        atmosphericHaze: 'rgba(30, 27, 75, 0.3)',
        stars: true,
        cloudOpacity: 0.2,
    },
};

/**
 * Weather effect modifiers
 */
const weatherEffects = {
    clear: {
        clouds: 0,
        particles: 0,
        saturation: 1.0,
        brightness: 1.0,
    },
    clouds: {
        clouds: 7,
        particles: 0,
        saturation: 0.85,
        brightness: 0.9,
    },
    rain: {
        clouds: 5,
        particles: 50,
        particleType: 'rain',
        saturation: 0.7,
        brightness: 0.7,
    },
    snow: {
        clouds: 3,
        particles: 30,
        particleType: 'snow',
        saturation: 0.9,
        brightness: 1.1,
    },
};

/**
 * Get the complete theme configuration for time + weather
 * @param {string} timeOfDay - 'sunrise' | 'day' | 'sunset' | 'night'
 * @param {string} weatherCategory - 'clear' | 'clouds' | 'rain' | 'snow'
 * @returns {object} Complete theme configuration
 */
export const getAdaptiveTheme = (timeOfDay = 'day', weatherCategory = 'clear') => {
    const baseTheme = timeThemes[timeOfDay] || timeThemes.day;
    const weatherMods = weatherEffects[weatherCategory] || weatherEffects.clear;

    // Merge and return complete theme
    return {
        ...baseTheme,
        ...weatherMods,
        timeOfDay,
        weatherCategory,
    };
};

/**
 * Legacy function for backward compatibility (not used with new system)
 */
export const getWeatherTheme = (weather) => {
    if (!weather) return 'from-slate-900 to-slate-800';

    const code = weather.weather[0].id;
    const icon = weather.weather[0].icon;
    const isNight = icon.includes('n');

    // Thunderstorm
    if (code >= 200 && code < 300) {
        return 'from-indigo-900 via-purple-900 to-slate-900';
    }
    // Drizzle
    if (code >= 300 && code < 400) {
        return 'from-slate-700 via-slate-600 to-slate-800';
    }
    // Rain
    if (code >= 500 && code < 600) {
        return 'from-blue-900 via-slate-800 to-slate-900';
    }
    // Snow
    if (code >= 600 && code < 700) {
        return isNight
            ? 'from-blue-900 via-blue-800 to-slate-900'
            : 'from-blue-100 via-blue-200 to-slate-100 text-slate-800';
    }
    // Atmosphere (Fog, Mist, etc.)
    if (code >= 700 && code < 800) {
        return 'from-slate-600 via-slate-500 to-slate-700';
    }
    // Clear
    if (code === 800) {
        return isNight
            ? 'from-slate-900 via-purple-900 to-slate-900'
            : 'from-blue-400 via-blue-500 to-blue-600';
    }
    // Clouds
    if (code > 800) {
        return isNight
            ? 'from-slate-800 via-slate-700 to-slate-900'
            : 'from-slate-300 via-slate-400 to-slate-500 text-slate-800';
    }

    return 'from-slate-900 to-slate-800';
};
