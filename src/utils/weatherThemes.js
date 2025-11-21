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
