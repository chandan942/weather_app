import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white font-sans selection:bg-sky-500 selection:text-white">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                        Weather Forecast
                    </h1>
                    <p className="text-slate-400 mt-2">Your daily weather companion</p>
                </header>
                <main>
                    {children}
                </main>
                <footer className="mt-12 text-center text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} Weather App. Built with React & Tailwind.</p>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
