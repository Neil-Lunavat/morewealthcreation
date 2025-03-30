"use client";

import { useState } from "react";
import { testimonials } from "@/constants";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Testimonials = () => {
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const { ref, isVisible } = useScrollAnimation({ once: true, amount: 0.2 });

    // Render star ratings
    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 0.2 + i * 0.1,
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                    >
                        <Star
                            size={14}
                            className={`${
                                i < Math.floor(rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : i < rating
                                    ? "text-yellow-400 fill-yellow-400 opacity-60"
                                    : "text-gray-600"
                            } mr-0.5`}
                        />
                    </motion.div>
                ))}
            </div>
        );
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
                duration: 0.4,
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
                ease: [0.25, 0.1, 0.25, 1.0],
                delay: 0.1 + i * 0.1,
            },
        }),
        hover: {
            y: -8,
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
    };

    const quoteVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 0.8,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
        hover: {
            scale: 1.1,
            opacity: 1,
            y: -2,
            transition: { duration: 0.3 },
        },
    };

    const backgroundCircleVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.div
            id="testimonials"
            className="mt-20 tracking-wide relative overflow-hidden py-8"
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
        >
            {/* Background decorations */}
            <motion.div
                className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-red-800/10 rounded-full blur-3xl"
                variants={backgroundCircleVariants}
                custom={0}
            />
            <motion.div
                className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-500/10 to-red-800/10 rounded-full blur-3xl"
                variants={backgroundCircleVariants}
                custom={1}
            />

            <motion.h2
                className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-16 font-semibold"
                variants={titleVariants}
            >
                What People are{" "}
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
                    Saying
                </motion.span>
            </motion.h2>

            <div className="flex flex-wrap justify-center max-w-7xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        className="w-full sm:w-1/2 lg:w-1/3 px-4 py-3"
                        custom={index}
                        variants={cardVariants}
                        whileHover="hover"
                        onMouseEnter={() => setActiveCard(index)}
                        onMouseLeave={() => setActiveCard(null)}
                    >
                        <motion.div
                            className={`relative rounded-xl p-6 text-md h-full 
                                transition-all duration-500 
                                ${
                                    activeCard === index
                                        ? "bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-lg border border-orange-700/30"
                                        : "bg-neutral-900 border border-neutral-800"
                                }
                            `}
                            animate={
                                activeCard === index
                                    ? {
                                          scale: 1.02,
                                          borderColor: "rgba(194, 65, 12, 0.3)", // border-orange-700/30
                                          boxShadow:
                                              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                      }
                                    : {
                                          scale: 1,
                                          borderColor: "rgba(38, 38, 38, 1)", // border-neutral-800
                                          boxShadow: "none",
                                      }
                            }
                            transition={{ duration: 0.3 }}
                        >
                            {/* Subtle gradient overlay that appears on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-tr from-orange-600/5 to-red-800/5 rounded-xl"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                            />

                            {/* Animated decorative quotes */}
                            <motion.div
                                className="text-orange-500 text-3xl mb-2"
                                variants={quoteVariants}
                                animate={
                                    activeCard === index ? "hover" : "visible"
                                }
                            >
                                &ldquo;
                            </motion.div>

                            <motion.p
                                className="text-gray-200 relative z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: 0.3 + index * 0.05,
                                    duration: 0.4,
                                }}
                            >
                                {testimonial.text}
                            </motion.p>

                            <motion.div
                                className="text-orange-500 text-3xl text-right"
                                variants={quoteVariants}
                                animate={
                                    activeCard === index ? "hover" : "visible"
                                }
                                style={{ transformOrigin: "right bottom" }}
                            >
                                &rdquo;
                            </motion.div>

                            <motion.div
                                className="relative z-10 mt-6 pt-4 border-t border-neutral-800 flex items-start"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.5 + index * 0.05,
                                    duration: 0.4,
                                }}
                            >
                                <motion.div className="relative w-12 h-12 mr-4">
                                    <motion.div
                                        className={`w-12 h-12 relative overflow-hidden rounded-full ${
                                            activeCard === index
                                                ? "border-2 border-orange-500"
                                                : "border border-neutral-700"
                                        }`}
                                        initial={{ scale: 0.9 }}
                                        animate={
                                            activeCard === index
                                                ? {
                                                      scale: 1.05,
                                                      borderColor:
                                                          "rgb(249, 115, 22)", // border-orange-500
                                                      borderWidth: "2px",
                                                  }
                                                : {
                                                      scale: 1,
                                                      borderColor:
                                                          "rgb(64, 64, 64)", // border-neutral-700
                                                      borderWidth: "1px",
                                                  }
                                        }
                                        transition={{ duration: 0.3 }}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.user}
                                            fill
                                            sizes="48px"
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </motion.div>
                                <div>
                                    <motion.h6
                                        className="font-medium text-white"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            delay: 0.6 + index * 0.05,
                                            duration: 0.3,
                                        }}
                                    >
                                        {testimonial.user}
                                    </motion.h6>
                                    <motion.span
                                        className="text-sm font-normal text-neutral-500"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            delay: 0.7 + index * 0.05,
                                            duration: 0.3,
                                        }}
                                    >
                                        {testimonial.company}
                                    </motion.span>
                                    {renderStars(testimonial.stars)}
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Testimonials;
