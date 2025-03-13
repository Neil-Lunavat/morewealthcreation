import { features } from "../constants";
import { MoveDown, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

const Services = () => {
    const [expandedFeatures, setExpandedFeatures] = useState({});
    const [screenSize, setScreenSize] = useState("desktop");

    // Check screen size for responsive behavior
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setScreenSize("mobile");
            } else if (width >= 640 && width < 1024) {
                setScreenSize("tablet");
            } else {
                setScreenSize("desktop");
            }
        };

        // Run once on component mount
        checkScreenSize();

        // Add event listener
        window.addEventListener("resize", checkScreenSize);

        // Clean up
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const isMobile = screenSize === "mobile";
    const isTablet = screenSize === "tablet";

    const toggleFeature = (index) => {
        if (screenSize === "desktop") return; // Only toggle on mobile and tablet

        setExpandedFeatures((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div
            id="features"
            className="relative mt-20 border-b border-neutral-800 min-h-[800px] px-4 sm:px-6 lg:px-10"
        >
            <div className="text-center">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
                        Services
                    </span>{" "}
                    we provide
                </h2>
            </div>

            <div className="container mx-auto max-w-7xl">
                <div
                    className={`
                    mt-10 lg:mt-20
                    ${
                        isMobile
                            ? "grid grid-cols-1 gap-4"
                            : isTablet
                            ? "grid grid-cols-2 gap-6"
                            : "grid grid-cols-3 gap-8"
                    }
                `}
                >
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`
                                relative
                                ${isMobile || isTablet ? "cursor-pointer" : ""}
                                border border-neutral-800 rounded-lg 
                                p-4 sm:p-5 lg:p-6
                                transition-all duration-300 
                                hover:bg-neutral-800/50
                                ${
                                    expandedFeatures[index]
                                        ? "shadow-lg shadow-orange-900/10"
                                        : ""
                                }
                            `}
                            onClick={() => toggleFeature(index)}
                        >
                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-10 w-10 p-2 bg-neutral-900 text-orange-700 flex justify-center items-center rounded-full mr-4">
                                    {feature.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h5 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">
                                            {feature.text}
                                        </h5>
                                        {(isMobile || isTablet) && (
                                            <div className="text-orange-500 ml-2">
                                                {expandedFeatures[index] ? (
                                                    <ChevronUp size={20} />
                                                ) : (
                                                    <ChevronDown size={20} />
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div
                                        className={`
                                        text-neutral-400 text-sm sm:text-base
                                        transition-all duration-300 ease-in-out
                                        ${
                                            (isMobile || isTablet) &&
                                            !expandedFeatures[index]
                                                ? "max-h-0 opacity-0 overflow-hidden"
                                                : (isMobile || isTablet) &&
                                                  expandedFeatures[index]
                                                ? "max-h-96 opacity-100 pt-2"
                                                : "pt-2"
                                        }
                                    `}
                                    >
                                        {feature.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
