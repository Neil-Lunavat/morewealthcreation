import { useState } from "react";
import { testimonials } from "../constants";
import { Star } from "lucide-react";

const Testimonials = () => {
    const [activeCard, setActiveCard] = useState(null);

    // Render star ratings
    const renderStars = (rating) => {
        return (
            <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={`${
                            i < Math.floor(rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : i < rating
                                ? "text-yellow-400 fill-yellow-400 opacity-60"
                                : "text-gray-600"
                        } mr-0.5`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div
            id="testimonials"
            className="mt-20 tracking-wide relative overflow-hidden py-8"
        >
            {/* Background decorations */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-red-800/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-500/10 to-red-800/10 rounded-full blur-3xl"></div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-16 font-semibold">
                What People are{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
                    Saying
                </span>
            </h2>

            <div className="flex flex-wrap justify-center max-w-7xl mx-auto">
                {testimonials.map((testimonial, index) => (
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
                    >
                        <div
                            className={`relative rounded-xl p-6 text-md h-full 
                                transition-all duration-500 
                                ${
                                    activeCard === index
                                        ? "bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-lg border border-orange-700/30"
                                        : "bg-neutral-900 border border-neutral-800"
                                }
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

                            {/* Animated decorative quotes */}
                            <div
                                className="text-orange-500 text-3xl opacity-80 mb-2 transition-transform duration-300 transform translate-y-0"
                                style={{
                                    transform:
                                        activeCard === index
                                            ? "translateY(-2px) scale(1.05)"
                                            : "translateY(0) scale(1)",
                                }}
                            >
                                "
                            </div>

                            <p className="text-gray-200 relative z-10 transition-colors duration-300">
                                {testimonial.text}
                            </p>

                            <div
                                className="text-orange-500 text-3xl opacity-80 text-right transition-transform duration-300"
                                style={{
                                    transform:
                                        activeCard === index
                                            ? "translateY(2px) scale(1.05)"
                                            : "translateY(0) scale(1)",
                                }}
                            >
                                "
                            </div>

                            <div className="relative z-10 mt-6 pt-4 border-t border-neutral-800 flex items-start">
                                <div className="relative">
                                    <img
                                        className={`w-12 h-12 mr-4 rounded-full object-cover transition-all duration-300 ${
                                            activeCard === index
                                                ? "border-2 border-orange-500 transform scale-105"
                                                : "border border-neutral-700"
                                        }`}
                                        src={testimonial.image}
                                        alt={testimonial.user}
                                    />
                                </div>
                                <div>
                                    <h6 className="font-medium text-white">
                                        {testimonial.user}
                                    </h6>
                                    <span className="text-sm font-normal text-neutral-500">
                                        {testimonial.company}
                                    </span>
                                    {renderStars(testimonial.stars)}
                                </div>
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

export default Testimonials;
