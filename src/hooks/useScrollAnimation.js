import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

/**
 * Custom hook for scroll-triggered animations
 * @param {Object} options - Options for the useInView hook
 * @param {boolean} options.once - Whether to trigger the animation only once
 * @param {number} options.amount - Amount of the element that needs to be visible (0-1)
 * @param {number} options.threshold - Alternative to amount, array of thresholds
 * @returns {Object} - { ref, isVisible }
 */
export function useScrollAnimation(options = { once: true, amount: 0.2 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, options);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isInView) {
            setIsVisible(true);
        }
    }, [isInView]);

    return { ref, isVisible };
}
