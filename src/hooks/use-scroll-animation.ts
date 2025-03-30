"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

interface ScrollAnimationOptions {
    once?: boolean;
    amount?: number;
    threshold?: number[];
}

/**
 * Custom hook for scroll-triggered animations
 * @param options - Configuration options for the useInView hook
 * @returns An object containing the ref and isVisible state
 */
export function useScrollAnimation(
    options: ScrollAnimationOptions = { once: true, amount: 0.2 }
) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, options);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isInView) {
            setIsVisible(true);
        }
    }, [isInView]);

    return { ref, isVisible };
}
