"use client";

import { motion } from "framer-motion";

/**
 * Simple loading spinner component
 */
export const LoadingSpinner = ({
    size = "md",
    color = "orange",
    className = "",
}: {
    size?: "sm" | "md" | "lg";
    color?: "orange" | "white" | "green";
    className?: string;
}) => {
    // Size mappings
    const sizeMap = {
        sm: "w-5 h-5 border-2",
        md: "w-8 h-8 border-3",
        lg: "w-12 h-12 border-4",
    };

    // Color mappings
    const colorMap = {
        orange: "border-orange-500",
        white: "border-white",
        green: "border-green-500",
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <div
                className={`${sizeMap[size]} ${colorMap[color]} border-t-transparent rounded-full animate-spin`}
                role="status"
                aria-label="Loading"
            />
        </div>
    );
};

/**
 * Section loading skeleton
 */
export const SectionSkeleton = ({ rows = 3 }: { rows?: number }) => {
    return (
        <div className="w-full p-4 animate-pulse">
            <div className="h-7 bg-neutral-800 rounded-md w-1/3 mb-6"></div>
            {Array(rows)
                .fill(0)
                .map((_, i) => (
                    <div key={i} className="mb-4">
                        <div className="h-4 bg-neutral-800 rounded w-full mb-2.5"></div>
                        <div className="h-4 bg-neutral-800 rounded w-3/4"></div>
                    </div>
                ))}
        </div>
    );
};

/**
 * Enhanced loading button with animation
 */
export const LoadingButton = ({
    isLoading,
    children,
    className = "",
    loadingText = "Processing...",
    ...props
}: {
    isLoading: boolean;
    children: React.ReactNode;
    className?: string;
    loadingText?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            className={`relative px-4 py-4 rounded-lg text-white text-lg font-medium transition-all duration-300 ${
                isLoading ? "cursor-not-allowed" : "hover:scale-105"
            } ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>{loadingText}</span>
                </motion.div>
            ) : (
                children
            )}
        </button>
    );
};

/**
 * Form field skeleton
 */
export const FormFieldSkeleton = () => {
    return (
        <div className="w-full animate-pulse mb-4">
            <div className="h-3 bg-neutral-800 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-neutral-800 rounded w-full"></div>
        </div>
    );
};

/**
 * Image loading skeleton
 */
export const ImageSkeleton = ({ className = "" }: { className?: string }) => {
    return (
        <div
            className={`flex items-center justify-center bg-neutral-800 rounded-lg animate-pulse ${className}`}
        >
            <svg
                className="w-12 h-12 text-neutral-700"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
            >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 0 486.1 0 456.1L0 456.1z" />
            </svg>
        </div>
    );
};
