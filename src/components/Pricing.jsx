import { CheckCircle2 } from "lucide-react";
import { pricingOptions } from "../constants";
import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Pricing = () => {
    const [activeCard, setActiveCard] = useState(null);
    const [isIndianUser, setIsIndianUser] = useState(true);
    const { ref, isVisible } = useScrollAnimation({ once: true, amount: 0.2 });

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);

        if (element) {
            const navbarHeight = document.querySelector("nav").offsetHeight;
            const additionalOffset = 32; // Add extra padding from the navbar
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition +
                window.scrollY -
                navbarHeight -
                additionalOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    // Detect user's country based on their locale
    useEffect(() => {
        try {
            // Get user's time zone region
            const userTimeZone =
                Intl.DateTimeFormat().resolvedOptions().timeZone;
            // If the time zone is in India, show rupee prices, otherwise euros
            setIsIndianUser(
                userTimeZone.includes("Asia") ||
                    userTimeZone.includes("Calcutta")
            );
        } catch (error) {
            // Default to euros if detection fails
            console.log("Yes");
            setIsIndianUser(false);
        }
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
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2 + i * 0.15,
            },
        }),
        hover: {
            y: -10,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
            },
        },
    };

    const priceVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                delay: 0.4,
                type: "spring",
                stiffness: 200,
                damping: 15,
            },
        },
        active: {
            scale: 1.05,
            transition: {
                duration: 0.3,
            },
        },
    };

    const featureItemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.5 + i * 0.07,
                duration: 0.3,
            },
        }),
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.8,
                type: "spring",
                stiffness: 150,
                damping: 15,
            },
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2,
            },
        },
        tap: {
            scale: 0.98,
        },
    };

    return (
        <motion.div
            id="pricing"
            className="mt-20 px-4"
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <motion.h2
                className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide"
                variants={titleVariants}
            >
                Pricing
            </motion.h2>

            {/* Cards container - ensure all 3 cards appear in one line on desktop */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-7xl mx-auto">
                {pricingOptions.map((option, index) => (
                    <motion.div
                        key={index}
                        className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:flex-1 p-2 md:p-4 transition-all duration-300"
                        onMouseEnter={() => setActiveCard(index)}
                        onMouseLeave={() => setActiveCard(null)}
                        custom={index}
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <motion.div
                            className={`p-6 md:p-8 border rounded-xl text-center h-full transition-all duration-500 relative overflow-hidden
                                ${
                                    activeCard === index
                                        ? "border-orange-500/50 shadow-lg shadow-orange-500/10 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"
                                        : "border-neutral-700 bg-neutral-900"
                                }
                            `}
                            animate={
                                activeCard === index
                                    ? {
                                          borderColor:
                                              "rgba(249, 115, 22, 0.5)", // border-orange-500/50
                                          boxShadow:
                                              "0 10px 25px -5px rgba(249, 115, 22, 0.1)", // shadow-lg shadow-orange-500/10
                                          backgroundImage:
                                              "linear-gradient(to bottom right, rgba(23, 23, 23, 1), rgba(38, 38, 38, 1), rgba(23, 23, 23, 1))",
                                      }
                                    : {
                                          borderColor: "rgba(64, 64, 64, 1)", // border-neutral-700
                                          boxShadow: "none",
                                          backgroundImage: "none",
                                          backgroundColor:
                                              "rgba(23, 23, 23, 1)", // bg-neutral-900
                                      }
                            }
                            transition={{ duration: 0.3 }}
                        >
                            {/* Top orange accent line that animates on hover */}
                            <motion.div
                                className="absolute top-0 left-0 right-0 h-1"
                                initial={{ width: "0%" }}
                                animate={
                                    activeCard === index
                                        ? {
                                              width: "100%",
                                              background:
                                                  "linear-gradient(to right, #f97316, #991b1b)",
                                          }
                                        : {
                                              width: "0%",
                                              background: "transparent",
                                          }
                                }
                                transition={{ duration: 0.4 }}
                            />

                            <motion.p
                                className="text-3xl md:text-4xl mb-2 font-semibold relative z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: 0.3 + index * 0.1,
                                    duration: 0.4,
                                }}
                            >
                                {option.title}
                                {option.title === "Intermediate" && (
                                    <motion.span
                                        className="bg-gradient-to-r from-orange-500 to-red-400 text-transparent bg-clip-text text-sm md:text-xl ml-2 block sm:inline"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.5 + index * 0.1,
                                            duration: 0.4,
                                        }}
                                    >
                                        (Most Popular)
                                    </motion.span>
                                )}
                            </motion.p>

                            <motion.p
                                className="text-4xl md:text-5xl font-bold mb-4 transition-all duration-300 relative z-10"
                                variants={priceVariants}
                                animate={
                                    activeCard === index
                                        ? ["visible", "active"]
                                        : "visible"
                                }
                                style={{
                                    backgroundClip:
                                        activeCard === index ? "text" : "none",
                                    WebkitBackgroundClip:
                                        activeCard === index ? "text" : "none",
                                    backgroundImage:
                                        activeCard === index
                                            ? "linear-gradient(to right, #f97316, #991b1b)"
                                            : "none",
                                    color:
                                        activeCard === index
                                            ? "transparent"
                                            : "white",
                                }}
                            >
                                {isIndianUser
                                    ? option.priceInr
                                    : option.priceEur}
                            </motion.p>

                            <motion.p
                                className="text-neutral-400 mb-6 relative z-10 text-sm md:text-base"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: 0.4 + index * 0.1,
                                    duration: 0.4,
                                }}
                            >
                                {option.description}
                            </motion.p>

                            <ul className="text-left mx-auto w-fit relative z-10">
                                {option.features.map((feature, idx) => (
                                    <motion.li
                                        key={idx}
                                        className="mt-3 md:mt-4 flex items-start text-sm md:text-base"
                                        custom={idx}
                                        variants={featureItemVariants}
                                        whileHover={{
                                            x: activeCard === index ? 5 : 0,
                                            transition: { duration: 0.2 },
                                        }}
                                    >
                                        <motion.div
                                            animate={
                                                activeCard === index
                                                    ? {
                                                          color: "rgb(249, 115, 22)", // text-orange-500
                                                          transition: {
                                                              duration: 0.3,
                                                          },
                                                      }
                                                    : {
                                                          color: "rgb(74, 222, 128)", // text-green-400
                                                          transition: {
                                                              duration: 0.3,
                                                          },
                                                      }
                                            }
                                            whileHover={{ scale: 1.2 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <CheckCircle2
                                                className="mr-2 flex-shrink-0"
                                                size={18}
                                            />
                                        </motion.div>
                                        <span className="text-neutral-300">
                                            {feature}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Single CTA button */}
            <div className="flex justify-center mt-12 mb-8 hover:scale-105 transition-all duration-300">
                <motion.button
                    onClick={() => scrollToSection("bookingform")}
                    className="relative px-16 py-4 rounded-lg text-white text-lg font-medium transition-all duration-300 hover:scale-105 group overflow-hidden"
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-800 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></span>
                    <span className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500 rounded-lg transition-all duration-300"></span>
                    <span className="relative z-10">Book a Free Call</span>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Pricing;
