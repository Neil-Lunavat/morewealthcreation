"use client";

import { CheckCircle2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { scrollToSection, detectIndianUser } from "@/lib/utils";

const Pricing = () => {
    const [isIndianUser, setIsIndianUser] = useState(true);
    const [selectedSection, setSelectedSection] = useState<
        "teaching" | "consulting"
    >("teaching");
    const [selectedTier, setSelectedTier] = useState<
        "bronze" | "silver" | "gold"
    >("bronze");
    const { ref, isVisible } = useScrollAnimation({ once: true, amount: 0.2 });

    // Detect user's country based on their locale
    useEffect(() => {
        setIsIndianUser(detectIndianUser());
    }, []);

    // Tier accent colors
    const tierColors = useMemo(
        () => ({
            bronze: "from-amber-700/20 to-yellow-900/20",
            silver: "from-gray-400/20 to-slate-500/20",
            gold: "from-yellow-400/20 to-amber-500/20",
        }),
        []
    );

    // Handle tier change
    const handleTierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTier(e.target.value as "bronze" | "silver" | "gold");
    };

    // Teaching options - memoized to prevent unnecessary recalculations
    const teachingOptions = useMemo(
        () => [
            {
                title: "One-on-One Teaching",
                price: "₹2,000",
                priceEur: "€21.99",
                description: "Personalized 1:1 teaching session",
                features: [
                    "Custom learning plan",
                    "Direct instructor access",
                    "Personalized feedback",
                    "Homework review",
                    "Session recording",
                ],
                buttonText: "Book a Session",
                buttonAction: () => {}, // Do nothing for now
            },
            {
                title:
                    selectedTier === "bronze"
                        ? "Bronze Tier"
                        : selectedTier === "silver"
                        ? "Silver Tier"
                        : "Gold Tier",
                price:
                    selectedTier === "bronze"
                        ? "₹3,000"
                        : selectedTier === "silver"
                        ? "₹5,000"
                        : "₹8,000",
                priceEur:
                    selectedTier === "bronze"
                        ? "€32.99"
                        : selectedTier === "silver"
                        ? "€54.99"
                        : "€87.99",
                description: "Online video course access",
                tierGradient: tierColors[selectedTier],
                features:
                    selectedTier === "bronze"
                        ? [
                              "Monthly Q&A for 6 months",
                              "Access to course videos",
                              "Community forum access",
                              "Basic learning materials",
                          ]
                        : selectedTier === "silver"
                        ? [
                              "Monthly Q&A for 6 months",
                              "Free community access",
                              "10% discount on future courses",
                              "Priority support",
                              "Advanced learning materials",
                          ]
                        : [
                              "Monthly Q&A for 6 months",
                              "Free community access",
                              "20% discount on future courses",
                              "Free portfolio consulting",
                              "VIP support channel",
                              "All learning materials",
                          ],
                buttonText: "Enroll Now",
                buttonAction: () => {
                    // Redirect to different URLs based on tier
                    if (selectedTier === "bronze") {
                        window.location.href = "#bronze-tier";
                    } else if (selectedTier === "silver") {
                        window.location.href = "#silver-tier";
                    } else {
                        window.location.href = "#gold-tier";
                    }
                },
            },
        ],
        [selectedTier, tierColors]
    );

    // Consulting options - memoized
    const consultingOptions = useMemo(
        () => [
            {
                title: "Monthly Consulting",
                price: "₹5,000",
                priceEur: "€54.99",
                description: "Recurring monthly session",
                features: [
                    "One session per month",
                    "Portfolio review",
                    "Investment strategy",
                    "Financial goal setting",
                    "Progress tracking",
                ],
                buttonText: "Book Monthly", // Add this
                buttonAction: () => scrollToSection("bookingform"), // Add this
                // Add tierGradient if needed, even if empty
                tierGradient: "",
            },
            {
                title: "Per Session",
                price: "₹2,000",
                priceEur: "€21.99",
                description: "Hourly consultation",
                features: [
                    "One-time session",
                    "Focused problem solving",
                    "Specific financial advice",
                    "Email follow-up",
                    "Flexible scheduling",
                ],
                buttonText: "Book Session", // Add this
                buttonAction: () => scrollToSection("bookingform"), // Add this
                // Add tierGradient if needed, even if empty
                tierGradient: "",
            },
        ],
        []
    );

    // Animation variants - using memoization to avoid recreating on every render
    const animationVariants = useMemo(
        () => ({
            container: {
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.08, // Reduced from 0.15
                        delayChildren: 0.05, // Reduced from 0.1
                    },
                },
            },
            title: {
                hidden: { opacity: 0, y: -15 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.4, // Reduced from 0.6
                        ease: [0.25, 0.1, 0.25, 1.0], // Custom easing
                    },
                },
            },
            card: {
                hidden: { opacity: 0, y: 15, scale: 0.98 },
                visible: (i: number) => ({
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        type: "spring",
                        stiffness: 120,
                        damping: 14,
                        delay: 0.1 + i * 0.08, // Reduced delay
                        duration: 0.35,
                    },
                }),
                hover: {
                    y: -5,
                    transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                    },
                },
            },
            cardContent: {
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.06,
                        delayChildren: 0.1,
                    },
                },
            },
            cardTitle: {
                hidden: { opacity: 0, x: -10 },
                visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                        duration: 0.3,
                        ease: "easeOut",
                    },
                },
            },
            tier: {
                hidden: { opacity: 0, x: -10 },
                visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                        duration: 0.3,
                        delay: 0.1,
                        ease: "easeOut",
                    },
                },
            },
            price: {
                hidden: { opacity: 0, x: -10, scale: 0.95 },
                visible: {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: {
                        delay: 0.15,
                        duration: 0.3,
                        ease: [0.215, 0.61, 0.355, 1],
                    },
                },
            },
            description: {
                hidden: { opacity: 0, x: -10 },
                visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                        delay: 0.2,
                        duration: 0.25,
                        ease: "easeOut",
                    },
                },
            },
            featureList: {
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.04,
                        delayChildren: 0.25,
                    },
                },
            },
            featureItem: {
                hidden: { opacity: 0, x: -10 },
                visible: () => ({
                    opacity: 1,
                    x: 0,
                    transition: {
                        duration: 0.25,
                        ease: "easeOut",
                    },
                }),
            },
            button: {
                hidden: { opacity: 0, y: 8, scale: 0.95 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        delay: 0.3,
                        duration: 0.25,
                        ease: [0.215, 0.61, 0.355, 1],
                    },
                },
                hover: {
                    scale: 1.03,
                    y: -2,
                    transition: {
                        duration: 0.2,
                        ease: "easeOut",
                    },
                },
                tap: {
                    scale: 0.98,
                    transition: {
                        duration: 0.1,
                    },
                },
            },
            sectionToggle: {
                hidden: { opacity: 0, y: 5 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.3,
                        ease: "easeOut",
                    },
                },
            },
            ctaButton: {
                hidden: { opacity: 0, y: 10 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        delay: 0.3,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 120,
                        damping: 12,
                    },
                },
                hover: {
                    scale: 1.05,
                    y: -3,
                    transition: {
                        duration: 0.2,
                        ease: "easeOut",
                    },
                },
                tap: {
                    scale: 0.97,
                },
            },
        }),
        []
    );

    const optionsToRender =
        selectedSection === "teaching" ? teachingOptions : consultingOptions;

    return (
        <motion.div
            id="pricing"
            className="mt-16 px-4"
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={animationVariants.container}
        >
            <motion.h2
                className="text-3xl sm:text-5xl lg:text-6xl text-center mb-8 tracking-wide"
                variants={animationVariants.title}
            >
                Pricing
            </motion.h2>

            {/* Section Toggle */}
            <motion.div
                className="flex justify-center mb-8"
                variants={animationVariants.sectionToggle}
            >
                <div className="inline-flex p-1 rounded-lg bg-neutral-800 shadow-inner">
                    <motion.button
                        className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                            selectedSection === "teaching"
                                ? "bg-orange-500 text-white shadow-md"
                                : "text-neutral-300 hover:text-white"
                        }`}
                        onClick={() => setSelectedSection("teaching")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Teaching
                    </motion.button>
                    <motion.button
                        className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                            selectedSection === "consulting"
                                ? "bg-orange-500 text-white shadow-md"
                                : "text-neutral-300 hover:text-white"
                        }`}
                        onClick={() => setSelectedSection("consulting")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Consulting
                    </motion.button>
                </div>
            </motion.div>

            {/* Cards container */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-6xl mx-auto">
                {optionsToRender.map((option, index) => (
                    <motion.div
                        key={index}
                        className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 p-2"
                        custom={index}
                        variants={animationVariants.card}
                        whileHover="hover"
                    >
                        <div
                            className={`p-5 border rounded-xl text-center h-full relative overflow-hidden group
                                border-neutral-700 bg-neutral-900
                                hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10
                                hover:bg-gradient-to-br hover:from-neutral-900 hover:via-neutral-800 hover:to-neutral-900
                                transition-all duration-300 ease-out
                            `}
                        >
                            {/* Tier-specific accent background for the card - always visible */}
                            {selectedSection === "teaching" && index === 1 && (
                                <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${option.tierGradient} opacity-30`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.3 }}
                                    transition={{ duration: 0.5 }}
                                    aria-hidden="true"
                                />
                            )}

                            {/* Top orange accent line */}
                            <motion.div
                                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-800"
                                initial={{ scaleX: 0, transformOrigin: "left" }}
                                animate={{ scaleX: 1 }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.1 + index * 0.1,
                                }}
                            ></motion.div>

                            {/* Card content with sequential animations */}
                            <motion.div
                                variants={animationVariants.cardContent}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.p
                                    className="text-2xl md:text-3xl mb-2 font-semibold relative z-10"
                                    variants={animationVariants.cardTitle}
                                >
                                    {option.title}
                                    {selectedSection === "teaching" &&
                                        index === 1 &&
                                        selectedTier === "gold" && (
                                            <motion.span
                                                className="bg-gradient-to-r from-orange-500 to-red-400 text-transparent bg-clip-text text-sm ml-2 block sm:inline"
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: 0.2,
                                                    duration: 0.3,
                                                }}
                                            >
                                                (Best Value)
                                            </motion.span>
                                        )}
                                </motion.p>

                                {/* Tier dropdown inside the second card for teaching section */}
                                {selectedSection === "teaching" &&
                                    index === 1 && (
                                        <motion.div
                                            className="mb-4 mt-1 relative z-10"
                                            variants={animationVariants.tier}
                                        >
                                            <div className="bg-neutral-800/60 p-1.5 rounded-lg inline-flex items-center">
                                                <span className="text-neutral-300 mr-2 text-sm">
                                                    Select Tier:
                                                </span>
                                                <motion.select
                                                    value={selectedTier}
                                                    onChange={handleTierChange}
                                                    className="bg-neutral-900 text-white border border-neutral-700 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                >
                                                    <option value="bronze">
                                                        Bronze
                                                    </option>
                                                    <option value="silver">
                                                        Silver
                                                    </option>
                                                    <option value="gold">
                                                        Gold
                                                    </option>
                                                </motion.select>
                                            </div>
                                        </motion.div>
                                    )}

                                <motion.p
                                    className="text-3xl md:text-4xl font-bold mb-3 relative z-10 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text"
                                    variants={animationVariants.price}
                                >
                                    {isIndianUser
                                        ? option.price
                                        : option.priceEur}
                                </motion.p>

                                <motion.p
                                    className="text-neutral-400 mb-4 relative z-10 text-sm"
                                    variants={animationVariants.description}
                                >
                                    {option.description}
                                </motion.p>

                                <motion.ul
                                    className="text-left mx-auto w-fit relative z-10 min-h-[160px]"
                                    variants={animationVariants.featureList}
                                >
                                    {option.features.map((feature, idx) => (
                                        <motion.li
                                            key={idx}
                                            className="mt-2 flex items-start text-sm group-hover:translate-x-1 transition-transform duration-200"
                                            custom={idx}
                                            variants={
                                                animationVariants.featureItem
                                            }
                                        >
                                            <motion.span
                                                className="mr-2 flex-shrink-0 text-green-400 group-hover:text-orange-500 transition-colors duration-200"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{
                                                    delay: 0.3 + idx * 0.05,
                                                    type: "spring",
                                                    stiffness: 260,
                                                    damping: 20,
                                                }}
                                            >
                                                <CheckCircle2 size={16} />
                                            </motion.span>
                                            <span className="text-neutral-300">
                                                {feature}
                                            </span>
                                        </motion.li>
                                    ))}
                                </motion.ul>

                                {/* Card-specific buttons for teaching section */}
                                {/* Only render buttons for teaching section */}
                                {selectedSection === "teaching" && (
                                    <motion.button
                                        onClick={() =>
                                            option.buttonAction &&
                                            option.buttonAction()
                                        }
                                        className="mt-5 relative w-full overflow-hidden rounded-lg py-2.5 text-white font-medium text-sm group"
                                        variants={animationVariants.button}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-800 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></span>
                                        <span className="absolute inset-0 border border-transparent group-hover:border-orange-500 rounded-lg transition-all duration-300"></span>
                                        <span className="relative z-10">
                                            {option.buttonText}
                                        </span>
                                    </motion.button>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Centered CTA button for consulting section */}
            {selectedSection === "consulting" && (
                <div className="flex justify-center mt-8 mb-4">
                    <motion.button
                        onClick={() => scrollToSection("bookingform")}
                        className="relative px-12 py-3 rounded-lg text-white text-base font-medium overflow-hidden group"
                        variants={animationVariants.ctaButton}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-800 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></span>
                        <span className="absolute inset-0 border border-transparent group-hover:border-orange-500 rounded-lg transition-all duration-300"></span>
                        <span className="relative z-10">
                            Book a Free Consultation
                        </span>
                    </motion.button>
                </div>
            )}
        </motion.div>
    );
};

export default Pricing;
