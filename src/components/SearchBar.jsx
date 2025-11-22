import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto mb-8">
            <div className="relative">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search for a city..."
                    className="w-full px-4 py-3 pl-12 bg-slate-900/40 backdrop-blur-md border border-violet-500/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 rounded-xl transition-all shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
            </div>
        </form>
    );
};

export default SearchBar;
