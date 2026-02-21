import React from 'react';
import { motion } from 'framer-motion';

const CatBase = ({ isAngry = false, children }) => {
    return (
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-2xl"
            >
                {/* Cat Ears */}
                <motion.path
                    d="M40 60 L60 20 L90 50 Z"
                    fill="#1A1A1A"
                    animate={{
                        rotate: isAngry ? -15 : 0,
                        x: isAngry ? -5 : 0,
                        y: isAngry ? 5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.path
                    d="M160 60 L140 20 L110 50 Z"
                    fill="#1A1A1A"
                    animate={{
                        rotate: isAngry ? 15 : 0,
                        x: isAngry ? 5 : 0,
                        y: isAngry ? 5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />

                {/* Interior Ears (Pink) */}
                <motion.path
                    d="M50 55 L60 35 L75 50 Z"
                    fill="#FFB6C1"
                    opacity="0.6"
                    animate={{
                        rotate: isAngry ? -15 : 0,
                        x: isAngry ? -5 : 0,
                        y: isAngry ? 5 : 0
                    }}
                />
                <motion.path
                    d="M150 55 L140 35 L125 50 Z"
                    fill="#FFB6C1"
                    opacity="0.6"
                    animate={{
                        rotate: isAngry ? 15 : 0,
                        x: isAngry ? 5 : 0,
                        y: isAngry ? 5 : 0
                    }}
                />

                {/* Main Face Shape */}
                <ellipse cx="100" cy="110" rx="80" ry="70" fill="#1A1A1A" />

                {/* Nose */}
                <path
                    d="M95 125 L105 125 L100 132 Z"
                    fill="#FFB6C1"
                    className="opacity-80"
                />

                {/* Mouth/Whiskers Area */}
                <motion.path
                    d={isAngry ? "M90 145 C90 145 95 140 100 140 M110 145 C110 145 105 140 100 140" : "M100 132 C95 132 90 135 90 140 M100 132 C105 132 110 135 110 140"}
                    stroke="#444"
                    strokeWidth="1.5"
                    fill="none"
                    animate={{ d: isAngry ? "M90 145 C90 145 95 140 100 140 M110 145 C110 145 105 140 100 140" : "M100 132 C95 132 90 135 90 140 M100 132 C105 132 110 135 110 140" }}
                />

                {/* Whiskers */}
                <line x1="60" y1="130" x2="30" y2="125" stroke="#444" strokeWidth="1" />
                <line x1="60" y1="140" x2="25" y2="145" stroke="#444" strokeWidth="1" />
                <line x1="140" y1="130" x2="170" y2="125" stroke="#444" strokeWidth="1" />
                <line x1="140" y1="140" x2="175" y2="145" stroke="#444" strokeWidth="1" />
            </svg>

            {/* Container for Eyes (Absolute positioning over the SVG) */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                {children}
            </div>
        </div>
    );
};

export default CatBase;
