import { useState, useEffect } from "react";
import { services } from "../constants";
import { ChevronDown, ChevronUp } from "lucide-react";

const Services = () => {
    const [activeCard, setActiveCard] = useState(null);
    const [expandedServices, setExpandedServices] = useState({});
    const [isMobile, setIsMobile] = useState(false);

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
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const toggleService = (index) => {
        if (isMobile) {
            setExpandedServices((prev) => ({
                ...prev,
                [index]: !prev[index],
            }));
        }
    };

    return (
        <div
            id="services"
            className="mt-20 tracking-wide relative overflow-hidden py-8"
        >
            {/* Background decorations */}
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-red-800/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tr from-orange-500/10 to-red-800/10 rounded-full blur-3xl"></div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-16 font-semibold">
                <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
                    Services
                </span>{" "}
                we provide
            </h2>

            <div className="flex flex-wrap justify-center max-w-7xl mx-auto">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="w-full sm:w-1/2 lg:w-1/3 px-4 py-3 transition-transform duration-300 hover:-translate-y-1"
                        style={{
                            opacity: 0,
                            animation: `fadeIn 0.5s ease-out ${
                                index * 150
                            }ms forwards`,
                        }}
                        onMouseEnter={() => setActiveCard(index)}
                        onMouseLeave={() => setActiveCard(null)}
                        onClick={() => toggleService(index)}
                    >
                        <div
                            className={`relative rounded-xl p-6 text-md h-full 
                                transition-all duration-500 
                                ${
                                    activeCard === index
                                        ? "bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-lg border border-orange-700/30"
                                        : "bg-neutral-900 border border-neutral-800"
                                }
                                ${isMobile ? "cursor-pointer" : ""}
                            `}
                        >
                            {/* Subtle gradient overlay that appears on hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-tr from-orange-600/5 to-red-800/5 rounded-xl transition-opacity duration-300 ${
                                    activeCard === index
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
                            ></div>

                            <div className="flex items-start mb-3">
                                <div
                                    className={`flex-shrink-0 h-12 w-12 rounded-full 
                                    flex justify-center items-center mr-4 
                                    bg-gradient-to-br from-orange-500/10 to-red-800/10
                                    text-orange-500 transition-all duration-300
                                    ${
                                        activeCard === index
                                            ? "from-orange-500/20 to-red-800/20 scale-110"
                                            : ""
                                    }
                                    `}
                                >
                                    <div className="relative z-10">
                                        {service.icon}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h5 className="text-lg font-medium text-white">
                                            {service.text}
                                        </h5>
                                        {isMobile && (
                                            <span className="text-orange-500 ml-2">
                                                {expandedServices[index] ? (
                                                    <ChevronUp size={20} />
                                                ) : (
                                                    <ChevronDown size={20} />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`relative z-10 text-neutral-400 pl-16 transition-all duration-300
                                    ${
                                        isMobile && !expandedServices[index]
                                            ? "max-h-0 opacity-0 overflow-hidden"
                                            : isMobile &&
                                              expandedServices[index]
                                            ? "max-h-96 opacity-100 pt-2"
                                            : "opacity-100"
                                    }
                                `}
                            >
                                {service.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Animation keyframes */}
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Services;
