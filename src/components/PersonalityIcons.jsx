import React from 'react';

export const PersonalityIcon = ({ type }) => {
    switch (type) {
        case 'chaos':
            return (
                <svg viewBox="0 0 100 100" className="w-full h-full text-orange-500 fill-current">
                    <circle cx="50" cy="50" r="40" className="opacity-20" />
                    <path d="M30 30 L70 70 M70 30 L30 70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                    <path d="M20 50 L80 50 M50 20 L50 80" stroke="currentColor" strokeWidth="4" strokeDasharray="4 4" />
                </svg>
            );
        case 'princess':
            return (
                <svg viewBox="0 0 100 100" className="w-full h-full text-pink-400 fill-current">
                    <path d="M20 60 L35 30 L50 50 L65 30 L80 60 Z" />
                    <circle cx="20" cy="65" r="5" />
                    <circle cx="50" cy="55" r="5" />
                    <circle cx="80" cy="65" r="5" />
                    <rect x="20" y="70" width="60" height="10" rx="2" />
                </svg>
            );
        case 'sleep':
            return (
                <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
                    <path d="M30 40 C30 40 40 20 60 20 C80 20 90 40 90 40 L30 40" fill="currentColor" />
                    <text x="20" y="30" className="text-2xl font-bold font-mono">Z</text>
                    <text x="5" y="50" className="text-lg font-bold font-mono opacity-60">z</text>
                </svg>
            );
        case 'zoomie':
            return (
                <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-500">
                    <path d="M20 50 L50 20 L40 50 L80 50 L50 80 L60 50 Z" fill="currentColor" />
                </svg>
            );
        case 'intellectual':
            return (
                <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-500 fill-current">
                    <rect x="25" y="25" width="50" height="50" rx="5" />
                    <path d="M35 45 H65 M35 55 H65" stroke="white" strokeWidth="4" strokeLinecap="round" />
                </svg>
            );
        case 'drama':
            return (
                <svg viewBox="0 0 100 100" className="w-full h-full text-red-500 fill-current">
                    <path d="M50 20 C20 20 20 50 50 80 C80 50 80 20 50 20 Z" />
                    <circle cx="35" cy="40" r="3" fill="white" />
                </svg>
            );
        case 'social':
            return (
                <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-500 fill-current">
                    <circle cx="40" cy="50" r="20" />
                    <circle cx="60" cy="50" r="20" />
                    <circle cx="50" cy="30" r="10" />
                </svg>
            );
        default:
            return null;
    }
};
