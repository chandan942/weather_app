import React from 'react';
import { Droplets, Wind, Eye, Gauge, Thermometer, Sunrise, Sunset } from 'lucide-react';
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
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
};

const DetailItem = ({ icon: Icon, label, value, unit }) => (
    <motion.div
        variants={item}
        whileHover={{ scale: 1.05 }}
        className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center gap-2 hover:bg-slate-800/50 transition-colors"
    >
        <Icon className="w-6 h-6 text-sky-400" />
        <span className="text-slate-400 text-sm">{label}</span>
        <span className="text-white font-semibold text-lg">{value}{unit}</span>
    </motion.div>
);

const WeatherDetails = ({ data }) => {
    if (!data) return null;

    const { main, wind, visibility, sys } = data;

    const details = [
        { icon: Droplets, label: 'Humidity', value: main.humidity, unit: '%' },
        { icon: Wind, label: 'Wind Speed', value: Math.round(wind.speed * 3.6), unit: ' km/h' }, // m/s to km/h
        { icon: Gauge, label: 'Pressure', value: main.pressure, unit: ' hPa' },
        { icon: Eye, label: 'Visibility', value: (visibility / 1000).toFixed(1), unit: ' km' },
        { icon: Thermometer, label: 'Feels Like', value: Math.round(main.feels_like), unit: '°' },
        { icon: Sunrise, label: 'Sunrise', value: format(new Date(sys.sunrise * 1000), 'HH:mm'), unit: '' },
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
            {details.map((item, index) => (
                <DetailItem key={index} {...item} />
            ))}
        </motion.div>
    );
};

export default WeatherDetails;
