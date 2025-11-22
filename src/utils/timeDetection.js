/**
 * Time Detection Utility
 * Determines the current time period based on local time and sunrise/sunset data
 */

/**
 * Get time of day based on current time and sunrise/sunset times
 * @param {number} currentTimestamp - Current Unix timestamp (seconds)
 * @param {number} sunriseTimestamp - Sunrise Unix timestamp (seconds)
 * @param {number} sunsetTimestamp - Sunset Unix timestamp (seconds)
 * @returns {string} - 'sunrise' | 'day' | 'sunset' | 'night'
 */
export const getTimeOfDay = (currentTimestamp, sunriseTimestamp, sunsetTimestamp) => {
    const current = currentTimestamp;
    const sunrise = sunriseTimestamp;
    const sunset = sunsetTimestamp;

    // Define time windows (in seconds)
    const SUNRISE_WINDOW = 3600; // 1 hour window for sunrise
    const SUNSET_WINDOW = 3600; // 1 hour window for sunset

    // Sunrise period: sunrise - 30min to sunrise + 30min
    const sunriseStart = sunrise - (SUNRISE_WINDOW / 2);
    const sunriseEnd = sunrise + (SUNRISE_WINDOW / 2);

    // Sunset period: sunset - 30min to sunset + 30min
    const sunsetStart = sunset - (SUNSET_WINDOW / 2);
    const sunsetEnd = sunset + (SUNSET_WINDOW / 2);

    // Determine time of day
    if (current >= sunriseStart && current < sunriseEnd) {
        return 'sunrise';
    } else if (current >= sunriseEnd && current < sunsetStart) {
        return 'day';
    } else if (current >= sunsetStart && current < sunsetEnd) {
        return 'sunset';
    } else {
        return 'night';
    }
};

/**
 * Get weather condition category for background effects
 * @param {string} weatherMain - Main weather condition from API
 * @returns {string} - 'clear' | 'clouds' | 'rain' | 'snow'
 */
export const getWeatherCategory = (weatherMain) => {
    if (!weatherMain) return 'clear';

    const condition = weatherMain.toLowerCase();

    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm')) {
        return 'rain';
    } else if (condition.includes('snow')) {
        return 'snow';
    } else if (condition.includes('cloud')) {
        return 'clouds';
    } else {
        return 'clear';
    }
};
