import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const Forecast = ({ data }) => {
    if (!data) return null;

    // Filter to get one forecast per day (e.g., at 12:00 PM)
    const dailyForecasts = data.list.filter((reading) => reading.dt_txt?.includes("12:00:00") || !reading.dt_txt).slice(0, 5);

    // Fallback if API returns daily data directly or different structure (mock data handling)
    const forecastsToDisplay = dailyForecasts.length > 0 ? dailyForecasts : data.list.slice(0, 5);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-slate-900/30 backdrop-blur-xl border border-violet-500/20 shadow-2xl shadow-violet-500/10 rounded-3xl p-6"
        >
            <h3 className="text-xl font-semibold text-white mb-6 pl-2 border-l-4 border-cyan-400">5-Day Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {forecastsToDisplay.map((day, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        whileHover={{ scale: 1.05 }}
                        className="bg-black/30 p-4 rounded-2xl flex flex-col items-center justify-center border border-violet-500/20 hover:bg-violet-500/10 hover:border-cyan-400/30 transition-all group"
                    >
                        <span className="text-slate-300 text-sm mb-2">
                            {format(new Date(day.dt * 1000), 'EEE')}
                        </span>
                        <img
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                            alt={day.weather[0].description}
                            className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform"
                        />
                        <span className="text-white font-bold text-lg">
                            {Math.round(day.main.temp)}°
                        </span>
                        <span className="text-slate-500 text-xs capitalize text-center mt-1">
                            {day.weather[0].main}
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Forecast;
