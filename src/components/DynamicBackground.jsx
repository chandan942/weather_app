import React, { useMemo } from 'react';
import './DynamicBackground.css';

const DynamicBackground = ({ theme }) => {
    // Default theme if not provided
    const activeTheme = theme || {
        gradient: ['#0f172a', '#1e1b4b', '#581c87'],
        glowColor: '#06b6d4',
        glowPosition: '20%',
        particleColor: 'rgba(255, 255, 255, 0.8)',
        atmosphericHaze: 'rgba(30, 27, 75, 0.3)',
        stars: true,
        cloudOpacity: 0.2,
        clouds: 0,
        particles: 0,
        particleType: null,
        timeOfDay: 'night',
        weatherCategory: 'clear',
    };

    // Generate stars with random positions (only for night)
    const stars = useMemo(() => {
        if (!activeTheme.stars) return [];
        return Array.from({ length: 100 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 3,
            duration: Math.random() * 2 + 3,
            size: Math.random() * 2 + 1,
        }));
    }, [activeTheme.stars]);

    // Generate clouds
    const clouds = useMemo(() => {
        if (activeTheme.clouds === 0) return [];
        return Array.from({ length: activeTheme.clouds }, (_, i) => ({
            id: i,
            left: (i * 15 + Math.random() * 10) % 100,
            top: Math.random() * 60 + 10,
            width: Math.random() * 200 + 150,
            height: Math.random() * 50 + 40,
            delay: i * 2,
            duration: Math.random() * 20 + 30,
        }));
    }, [activeTheme.clouds]);

    // Generate weather particles (rain/snow)
    const weatherParticles = useMemo(() => {
        if (activeTheme.particles === 0) return [];
        return Array.from({ length: activeTheme.particles }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: activeTheme.particleType === 'snow'
                ? Math.random() * 3 + 5  // Slower for snow
                : Math.random() * 0.5 + 0.5, // Faster for rain
        }));
    }, [activeTheme.particles, activeTheme.particleType]);

    // Create gradient string
    const gradientStyle = {
        background: `linear-gradient(135deg, ${activeTheme.gradient.join(', ')})`,
    };

    // Glow position style
    const glowStyle = {
        background: `radial-gradient(circle, ${activeTheme.glowColor}, transparent)`,
        top: activeTheme.glowPosition,
    };

    return (
        <div className="dynamic-background">
            {/* Base gradient */}
            <div className="bg-gradient" style={gradientStyle}></div>

            {/* Sun/Moon glow */}
            <div className="celestial-glow" style={glowStyle}></div>

            {/* Atmospheric haze */}
            <div
                className="atmospheric-haze"
                style={{ background: activeTheme.atmosphericHaze }}
            ></div>

            {/* Stars (night only) */}
            {activeTheme.stars && (
                <div className="stars">
                    {stars.map(star => (
                        <div
                            key={star.id}
                            className="star"
                            style={{
                                left: `${star.left}%`,
                                top: `${star.top}%`,
                                width: `${star.size}px`,
                                height: `${star.size}px`,
                                animationDelay: `${star.delay}s`,
                                animationDuration: `${star.duration}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Clouds */}
            {activeTheme.clouds > 0 && (
                <div className="clouds-container">
                    {clouds.map(cloud => (
                        <div
                            key={cloud.id}
                            className="cloud"
                            style={{
                                left: `${cloud.left}%`,
                                top: `${cloud.top}%`,
                                width: `${cloud.width}px`,
                                height: `${cloud.height}px`,
                                opacity: activeTheme.cloudOpacity,
                                animationDelay: `${cloud.delay}s`,
                                animationDuration: `${cloud.duration}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Weather particles (rain/snow) */}
            {activeTheme.particles > 0 && (
                <div className={`weather-particles ${activeTheme.particleType}`}>
                    {weatherParticles.map(particle => (
                        <div
                            key={particle.id}
                            className={`weather-particle ${activeTheme.particleType}-particle`}
                            style={{
                                left: `${particle.left}%`,
                                animationDelay: `${particle.delay}s`,
                                animationDuration: `${particle.duration}s`,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DynamicBackground;
