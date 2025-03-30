"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/utils";

const HeroSection = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Set loaded state after component mounts for animations
        setIsLoaded(true);
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const buttonVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.05,
            transition: { duration: 0.2, ease: "easeInOut" },
        },
        tap: { scale: 0.98 },
    };

    const gradientVariants = {
        initial: {
            backgroundPosition: "0% 50%",
        },
        animate: {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            transition: {
                duration: 15,
                ease: "linear",
                repeat: Infinity,
            },
        },
    };

    const decorativeCircle = (
        size: number,
        position: string,
        delay: number
    ) => ({
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                delay,
                duration: 0.8,
                ease: "easeOut",
            },
        },
    });

    return (
        <motion.div
            className="relative pt-10 pb-20 lg:pt-20 lg:pb-32 px-6 overflow-hidden"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={containerVariants}
        >
            {/* Decorative elements */}
            <motion.div
                className="absolute top-24 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-orange-500/10 to-red-800/5 blur-3xl"
                variants={decorativeCircle(64, "-left-32", 0.3)}
            />
            <motion.div
                className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-tr from-orange-600/10 to-red-700/5 blur-3xl"
                variants={decorativeCircle(48, "-right-12", 0.5)}
            />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    {/* Left content column */}
                    <motion.div
                        className="w-full lg:w-7/12 lg:pr-12 mb-12 lg:mb-0"
                        variants={itemVariants}
                    >
                        <motion.h1
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
                            variants={itemVariants}
                        >
                            Hi, I'm Aayush More.
                            <br />
                            Your personal
                            <motion.span
                                className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-800 bg-clip-text text-transparent inline-block"
                                initial="initial"
                                animate="animate"
                                variants={gradientVariants}
                                style={{
                                    backgroundSize: "200% 100%",
                                }}
                            >
                                {" Finance Tutor"}
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="mt-6 text-xl text-neutral-400 max-w-2xl"
                            variants={itemVariants}
                        >
                            Personalized financial coaching and investment
                            strategies crafted to help you take control of your
                            financial future.
                        </motion.p>

                        <motion.div
                            className="mt-10 flex flex-wrap gap-4"
                            variants={itemVariants}
                        >
                            <motion.button
                                onClick={() => scrollToSection("pricing")}
                                className="relative px-8 py-4 rounded-lg text-white text-lg font-medium transition-all duration-300 hover:scale-105 group overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-800 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></span>
                                <span className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500 rounded-lg transition-all duration-300"></span>
                                <span className="relative z-10">
                                    Check Pricing
                                </span>
                            </motion.button>

                            <motion.button
                                onClick={() => scrollToSection("services")}
                                className="relative group px-8 py-4 rounded-lg text-white font-medium text-lg overflow-hidden bg-transparent border border-neutral-700 hover:border-orange-500 transition-colors duration-300"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <span className="relative z-10">
                                    Explore services
                                </span>
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className="mt-10 flex items-center gap-3"
                            variants={itemVariants}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        ></motion.div>
                    </motion.div>

                    {/* Right decorative element */}
                    <motion.div
                        className="w-full lg:w-5/12 h-full relative"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="relative z-10 w-full aspect-square max-w-md mx-auto"
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                                delay: 0.3,
                                duration: 0.8,
                                type: "spring",
                                stiffness: 100,
                            }}
                        >
                            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 p-1">
                                <div className="w-full h-full rounded-xl bg-neutral-900 p-6 flex flex-col">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="text-sm font-medium text-white">
                                            Investment Growth
                                        </div>
                                        <div className="text-xs text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">
                                            +28.5%
                                        </div>
                                    </div>

                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="relative w-full h-full pt-4">
                                            {/* Grid lines */}
                                            <div className="absolute inset-x-0 h-full flex flex-col justify-between">
                                                {[0, 1, 2, 3, 4].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="w-full h-px bg-neutral-800"
                                                    />
                                                ))}
                                            </div>

                                            {/* Y-axis labels */}
                                            <div className="absolute left-0 h-full flex flex-col justify-between text-xs text-neutral-500">
                                                {[
                                                    "100k",
                                                    "75k",
                                                    "50k",
                                                    "25k",
                                                    "0",
                                                ].map((label, i) => (
                                                    <div
                                                        key={i}
                                                        className="transform -translate-y-2"
                                                    >
                                                        {label}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Animated Line Graph */}
                                            <svg
                                                className="absolute inset-0 w-full h-full overflow-visible"
                                                preserveAspectRatio="none"
                                            >
                                                <motion.path
                                                    d="M 0 120 C 40 100, 80 110, 120 90 C 160 70, 200 80, 240 50 C 280 30, 320 40, 360 10"
                                                    fill="none"
                                                    stroke="url(#lineGradient)"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    initial={{
                                                        pathLength: 0,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        pathLength: 1,
                                                        opacity: 1,
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        ease: "easeInOut",
                                                        delay: 0.5,
                                                    }}
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="lineGradient"
                                                        x1="0%"
                                                        y1="0%"
                                                        x2="100%"
                                                        y2="0%"
                                                    >
                                                        <stop
                                                            offset="0%"
                                                            stopColor="#f97316"
                                                        />
                                                        <stop
                                                            offset="100%"
                                                            stopColor="#991b1b"
                                                        />
                                                    </linearGradient>
                                                </defs>
                                            </svg>

                                            {/* Data points */}
                                            {[
                                                { x: 0, y: 120 },
                                                { x: 60, y: 100 },
                                                { x: 120, y: 90 },
                                                { x: 180, y: 70 },
                                                { x: 240, y: 50 },
                                                { x: 300, y: 40 },
                                                { x: 360, y: 10 },
                                            ].map((point, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute w-3 h-3 bg-orange-500 rounded-full shadow-lg shadow-orange-500/20"
                                                    style={{
                                                        left: point.x,
                                                        top: point.y,
                                                    }}
                                                    initial={{
                                                        scale: 0,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        scale: 1,
                                                        opacity: 1,
                                                    }}
                                                    transition={{
                                                        delay: 0.8 + i * 0.2,
                                                        duration: 0.5,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 text-center">
                                        <div className="text-sm text-neutral-400">
                                            Your financial growth potential
                                        </div>
                                        <motion.div
                                            className="font-medium text-orange-500"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                delay: 1.6,
                                                duration: 0.5,
                                            }}
                                        >
                                            Start investing today →
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Background shape */}
                        <motion.div
                            className="absolute inset-0 -z-10 translate-x-6 translate-y-6 scale-90 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-800/20 blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default HeroSection;
