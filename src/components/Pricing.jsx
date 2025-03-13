import { CheckCircle2 } from "lucide-react";
import { pricingOptions } from "../constants";
import { useState, useEffect } from "react";

const Pricing = () => {
    const [activeCard, setActiveCard] = useState(null);
    const [isIndianUser, setIsIndianUser] = useState(true);

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
            // Default to rupees if detection fails
            setIsIndianUser(true);
        }
    }, []);

    return (
        <div id="pricing" className="mt-20 px-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
                Pricing
            </h2>

            {/* Cards container - ensure all 3 cards appear in one line on desktop */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-7xl mx-auto">
                {pricingOptions.map((option, index) => (
                    <div
                        key={index}
                        className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:flex-1 p-2 md:p-4 transition-all duration-300"
                        onMouseEnter={() => setActiveCard(index)}
                        onMouseLeave={() => setActiveCard(null)}
                    >
                        <div
                            className={`p-6 md:p-8 border rounded-xl text-center h-full transition-all duration-500 relative overflow-hidden
                                ${
                                    activeCard === index
                                        ? "border-orange-500/50 shadow-lg shadow-orange-500/10 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 transform -translate-y-2"
                                        : "border-neutral-700 bg-neutral-900"
                                }
                            `}
                        >
                            {/* Subtle gradient overlay that appears on hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-tr from-orange-600/5 to-red-800/5 rounded-xl transition-opacity duration-300
                                    ${
                                        activeCard === index
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }
                                `}
                            ></div>

                            {/* Top orange accent line that animates on hover */}
                            <div
                                className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300
                                    ${
                                        activeCard === index
                                            ? "bg-gradient-to-r from-orange-500 to-red-800"
                                            : "bg-transparent"
                                    }
                                `}
                            ></div>

                            <p className="text-3xl md:text-4xl mb-2 font-semibold relative z-10">
                                {option.title}
                                {option.title === "Intermediate" && (
                                    <span className="bg-gradient-to-r from-orange-500 to-red-400 text-transparent bg-clip-text text-sm md:text-xl ml-2 block sm:inline">
                                        (Most Popular)
                                    </span>
                                )}
                            </p>

                            <p
                                className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-300 relative z-10
                                ${
                                    activeCard === index
                                        ? "bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text scale-105"
                                        : "text-white"
                                }
                            `}
                            >
                                {isIndianUser
                                    ? option.priceInr
                                    : option.priceEur}
                            </p>

                            <p className="text-neutral-400 mb-6 relative z-10 text-sm md:text-base">
                                {option.description}
                            </p>

                            <ul className="text-left mx-auto w-fit relative z-10">
                                {option.features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        className={`mt-3 md:mt-4 flex items-start transition-transform duration-300 text-sm md:text-base
                                            ${
                                                activeCard === index &&
                                                idx % 2 === 0
                                                    ? "transform translate-x-1"
                                                    : ""
                                            }
                                            ${
                                                activeCard === index &&
                                                idx % 2 === 1
                                                    ? "transform -translate-x-1"
                                                    : ""
                                            }
                                        `}
                                    >
                                        <CheckCircle2
                                            className={`mr-2 flex-shrink-0 transition-colors duration-300
                                                ${
                                                    activeCard === index
                                                        ? "text-orange-500"
                                                        : "text-green-400"
                                                }
                                            `}
                                            size={18}
                                        />
                                        <span className="text-neutral-300">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            {/* Single CTA button */}
            <div className="flex justify-center mt-12 mb-8">
                <button
                    onClick={() =>
                        document
                            .getElementById("bookingform")
                            .scrollIntoView({ behavior: "smooth" })
                    }
                    className="relative px-8 py-4 rounded-lg text-white text-lg font-medium transition-all duration-300 hover:scale-105 group overflow-hidden"
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-800 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></span>
                    <span className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500 rounded-lg transition-all duration-300"></span>
                    <span className="relative z-10">
                        Book a Free Call for Your Course
                    </span>
                </button>
            </div>
        </div>
    );
};
export default Pricing;
