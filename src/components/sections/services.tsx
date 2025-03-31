"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { services } from "@/constants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ChevronUp, ChevronDown } from "lucide-react";

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

export default Services;
