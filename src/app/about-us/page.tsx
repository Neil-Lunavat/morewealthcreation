"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
// import Image from "next/image";
import { services } from "@/constants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
    ChevronUp,
    ChevronDown,
    Users,
    Calendar,
    GraduationCap,
    Target,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const AboutUsPage = () => {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto pt-20 px-6">
                <HeroSection />
                <Services />
                <StatsSection />
                <AboutSection />
                <Footer />
            </div>
        </>
    );
};

// Hero Section Component
const HeroSection = () => {
    const { ref, isVisible } = useScrollAnimation({ once: true, amount: 0.2 });

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

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="py-16 text-center relative"
        >
            {/* Background decorations */}
            <motion.div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-orange-500/10 to-red-800/5 blur-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 1.5 }}
            />

            <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                variants={itemVariants}
            >
                About{" "}
                <motion.span
                    className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                        duration: 8,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    More Wealth Creation
                </motion.span>
            </motion.h1>

            <motion.p
                className="max-w-3xl mx-auto text-xl text-neutral-400"
                variants={itemVariants}
            >
                Discover our journey, philosophy, and what makes our financial
                coaching approach unique.
            </motion.p>
        </motion.div>
    );
};

// Services Component (reused from services.tsx)
const Services = () => {
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const [expandedServices, setExpandedServices] = useState<
        Record<number, boolean>
    >({});
    const [isMobile, setIsMobile] = useState(false);
    const [contentHeights, setContentHeights] = useState<
        Record<number, number>
    >({});
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { ref, isVisible } = useScrollAnimation({ once: true, amount: 0.2 });

    // Check screen size for responsive behavior
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Run once on component mount
        checkScreenSize();

        // Add event listener
        window.addEventListener("resize", checkScreenSize);

        // Clean up
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    // Measure content heights
    useEffect(() => {
        if (isMobile && contentRefs.current.length > 0) {
            const heights: Record<number, number> = {};
            contentRefs.current.forEach((ref, index) => {
                if (ref) {
                    heights[index] = ref.scrollHeight;
                }
            });
            setContentHeights(heights);
        }
    }, [isMobile, services]);

    const toggleService = (index: number) => {
        if (isMobile) {
            setExpandedServices((prev) => ({
                ...prev,
                [index]: !prev[index],
            }));
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 0.0],
                delay: 0.4 + i * 0.1,
            },
        }),
    };

    const iconContainerVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
            },
        },
        hover: {
            scale: 1.1,
            backgroundColor: "rgba(249, 115, 22, 0.2)",
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
    };

    return (
        <motion.div
            id="services"
            className="mt-10 tracking-wide relative overflow-hidden py-8"
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
        >
            {/* Background decorations */}
            <motion.div
                className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-red-800/10 rounded-full blur-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            />
            <motion.div
                className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tr from-orange-500/10 to-red-800/10 rounded-full blur-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
            />

            <motion.h2
                className="text-3xl sm:text-3xl lg:text-4xl text-center my-10 lg:my-8 font-semibold"
                variants={titleVariants}
            >
                <motion.span
                    className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                        duration: 10,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    Services
                </motion.span>{" "}
                we provide
            </motion.h2>

            <div className="flex flex-wrap justify-center max-w-7xl mx-auto">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        className="w-full sm:w-1/2 lg:w-1/3 px-4 py-3 transition-transform duration-300 hover:-translate-y-1"
                        custom={index}
                        variants={cardVariants}
                        onMouseEnter={() => setActiveCard(index)}
                        onMouseLeave={() => setActiveCard(null)}
                        onClick={() => toggleService(index)}
                        whileHover={{ y: -5 }}
                    >
                        <motion.div
                            className={`relative rounded-lg p-4 text-md h-full 
                transition-all duration-500 
                ${
                    activeCard === index
                        ? "bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-lg border border-orange-700/30"
                        : "bg-neutral-900 border border-neutral-800"
                }
                ${isMobile ? "cursor-pointer" : ""}
              `}
                            animate={
                                activeCard === index
                                    ? { scale: 1.02 }
                                    : { scale: 1 }
                            }
                            transition={{ duration: 0.2 }}
                        >
                            {/* Subtle gradient overlay that appears on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-tr from-orange-600/5 to-red-800/5 rounded-lg"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                            />

                            <div className="flex items-start mb-3">
                                <motion.div
                                    className="flex-shrink-0 h-9 w-9 rounded-full 
                  flex justify-center items-center mr-4 
                  bg-gradient-to-br from-orange-500/10 to-red-800/10
                  text-orange-500"
                                    variants={iconContainerVariants}
                                    whileHover="hover"
                                >
                                    <motion.div
                                        className="relative z-10"
                                        initial={{ rotate: -5 }}
                                        animate={
                                            activeCard === index
                                                ? { rotate: 0, scale: 1.1 }
                                                : { rotate: 0, scale: 1 }
                                        }
                                        transition={{ duration: 0.3 }}
                                    >
                                        <service.icon />
                                    </motion.div>
                                </motion.div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <motion.h5
                                            className="text-lg font-medium text-white"
                                            animate={
                                                activeCard === index
                                                    ? {
                                                          color: "rgb(249, 115, 22)",
                                                          transition: {
                                                              duration: 0.3,
                                                          },
                                                      }
                                                    : {
                                                          color: "rgb(255, 255, 255)",
                                                          transition: {
                                                              duration: 0.3,
                                                          },
                                                      }
                                            }
                                        >
                                            {service.text}
                                        </motion.h5>
                                        {isMobile && (
                                            <motion.span
                                                className="text-orange-500 ml-2"
                                                animate={{
                                                    rotate: expandedServices[
                                                        index
                                                    ]
                                                        ? 180
                                                        : 0,
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {expandedServices[index] ? (
                                                    <ChevronUp size={20} />
                                                ) : (
                                                    <ChevronDown size={20} />
                                                )}
                                            </motion.span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Description content with improved height animation */}
                            <div className="relative z-10 pl-16 overflow-hidden">
                                {/* Hidden div to measure content height */}
                                <div
                                    ref={(el) => {
                                        contentRefs.current[index] = el;
                                    }}
                                    className="absolute invisible"
                                    style={{
                                        position: "absolute",
                                        visibility: "hidden",
                                        zIndex: -1,
                                    }}
                                >
                                    {service.description}
                                </div>

                                <motion.div
                                    className="text-neutral-400"
                                    initial={{
                                        height: isMobile ? 0 : "auto",
                                        opacity: isMobile ? 0 : 1,
                                    }}
                                    animate={{
                                        height: isMobile
                                            ? expandedServices[index]
                                                ? contentHeights[index] ||
                                                  "auto"
                                                : 0
                                            : "auto",
                                        opacity: isMobile
                                            ? expandedServices[index]
                                                ? 1
                                                : 0
                                            : 1,
                                    }}
                                    transition={{
                                        height: {
                                            duration: 0.3,
                                            ease: "easeInOut",
                                        },
                                        opacity: {
                                            duration: 0.2,
                                            delay: expandedServices[index]
                                                ? 0.1
                                                : 0,
                                        },
                                    }}
                                >
                                    {service.description}
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

// Stats Section Component
const StatsSection = () => {
    const { ref, isVisible } = useScrollAnimation({ once: true, amount: 0.2 });

    const stats = [
        { icon: Calendar, value: "5+", label: "Years Experience" },
        { icon: Users, value: "300+", label: "Students Taught" },
        { icon: GraduationCap, value: "10+", label: "College Lectures" },
        { icon: Target, value: "94%", label: "Satisfaction" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 0.1 * i,
            },
        }),
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="py-16 my-8 relative"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 opacity-50 rounded-xl -z-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        variants={itemVariants}
                        className="flex flex-col items-center p-6 bg-neutral-900/70 rounded-lg border border-neutral-800 backdrop-blur-sm hover:border-orange-500/30 transition-colors duration-300"
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <motion.div
                            className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-red-800/20 text-orange-500 mb-4"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                delay: 0.2 + index * 0.1,
                                duration: 0.5,
                            }}
                        >
                            <stat.icon size={28} />
                        </motion.div>
                        <motion.h3
                            className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-700 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.3 + index * 0.1,
                                duration: 0.5,
                            }}
                        >
                            {stat.value}
                        </motion.h3>
                        <motion.p
                            className="text-neutral-400 text-center mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                delay: 0.4 + index * 0.1,
                                duration: 0.5,
                            }}
                        >
                            {stat.label}
                        </motion.p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

// About Section Component
const AboutSection = () => {
    const { ref, isVisible } = useScrollAnimation({ once: true, amount: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const leftColVariants = {
        hidden: { x: -30, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const rightColVariants = {
        hidden: { x: 30, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const paragraphVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 0.1 * i,
            },
        }),
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="py-16 my-8"
        >
            <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Left column - Photo/Card */}
                <motion.div
                    className="w-full lg:w-2/5"
                    variants={leftColVariants}
                >
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-orange-500 to-red-800 rounded-xl blur opacity-30"></div>
                        <div className="relative bg-neutral-900 rounded-xl overflow-hidden shadow-xl border border-neutral-800">
                            <div className="h-64 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500/20 to-red-800/20 flex items-center justify-center">
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5,
                                            type: "spring",
                                        }}
                                        className="text-4xl font-bold text-orange-500"
                                    >
                                        A
                                    </motion.div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2">
                                    Aayush More
                                </h3>
                                <p className="text-neutral-400 mb-4">
                                    Founder, More Wealth Creation
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm">
                                        <span className="w-20 text-neutral-500">
                                            Qualified:
                                        </span>
                                        <span className="text-white">
                                            Mutual Funds Distributor
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <span className="w-20 text-neutral-500">
                                            Specialist:
                                        </span>
                                        <span className="text-white">
                                            Technical Analysis, Equity
                                            Derivatives
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <span className="w-20 text-neutral-500">
                                            Experience:
                                        </span>
                                        <span className="text-white">
                                            5+ Years
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right column - About Text */}
                <motion.div
                    className="w-full lg:w-3/5"
                    variants={rightColVariants}
                >
                    <motion.h2
                        className="text-3xl sm:text-4xl font-bold mb-6"
                        variants={paragraphVariants}
                        custom={0}
                    >
                        Our{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
                            Mission
                        </span>
                    </motion.h2>

                    <div className="space-y-6">
                        <motion.p
                            className="text-neutral-300 leading-relaxed"
                            variants={paragraphVariants}
                            custom={1}
                        >
                            {`At More Wealth Creation, we empower individuals to
                            achieve financial clarity and success. I'm Aayush, a
                            qualified Mutual Funds Distributor, Technical
                            Analyst, and Equity Derivatives specialist with 5+
                            years of experience. My passion is simplifying
                            complex financial concepts for young professionals,
                            working individuals, and business owners.`}
                        </motion.p>

                        <motion.p
                            className="text-neutral-300 leading-relaxed"
                            variants={paragraphVariants}
                            custom={2}
                        >
                            {`Having taught 300+ students and lectured at 10+
                            colleges, I understand the need for clear,
                            personalized guidance. Unlike typical advisors, I
                            offer lifetime support, ensuring you're never alone
                            on your financial journey. My approach is rooted in
                            simplifying finance, inspired by my own family's
                            financial challenges.`}
                        </motion.p>

                        <motion.p
                            className="text-neutral-300 leading-relaxed"
                            variants={paragraphVariants}
                            custom={3}
                        >
                            {`My expertise spans personal finance and portfolio
                            creation, and I'm committed to building lasting
                            relationships based on trust and understanding.
                            Let's work together to build your more wealthy
                            future.`}
                        </motion.p>

                        <motion.div
                            className="pt-4"
                            variants={paragraphVariants}
                            custom={4}
                        >
                            <div className="inline-block relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-800 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                <button
                                    onClick={() =>
                                        (window.location.href = "/#bookingform")
                                    }
                                    className="relative px-6 py-3 bg-neutral-900 rounded-lg leading-none flex items-center group hover:bg-neutral-800 transition-colors duration-200"
                                >
                                    <span className="text-orange-500 group-hover:text-orange-400 transition duration-200">
                                        Contact us
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 ml-2 text-orange-500 group-hover:text-orange-400 transition duration-200"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AboutUsPage;
