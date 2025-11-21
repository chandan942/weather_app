import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const CurrentWeather = ({ data }) => {
    if (!data) return null;

    const { name, main, weather, wind, sys, dt } = data;
    const date = new Date(dt * 1000);

    return (
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-8 mb-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-lg">{name}, {sys.country}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 text-sm mb-6">
                        <Calendar className="w-4 h-4" />
                        <span>{format(date, 'EEEE, d MMMM')}</span>
                    </div>
                    <div className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        {Math.round(main.temp)}°
                    </div>
                    <p className="text-xl text-sky-400 font-medium capitalize mt-2">
                        {weather[0].description}
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <img
                        src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
                        alt={weather[0].description}
                        className="w-40 h-40 drop-shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
