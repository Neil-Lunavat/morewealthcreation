"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { checklistItems } from "@/constants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Workflow = () => {
    const { ref, isVisible } = useScrollAnimation({ once: true, amount: 0.2 });

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
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95, x: -20 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
            },
        },
    };

    const listContainerVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const listItemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 15,
            },
        },
    };

    const checkIconVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
            },
        },
        hover: {
            scale: 1.2,
            color: "#4ade80", // text-green-400
            transition: { duration: 0.2 },
        },
    };

    return (
        <motion.div
            id="workflow"
            className="mt-16 px-4 sm:px-6 lg:px-10 py-10"
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mb-8 tracking-wide text-white"
                variants={titleVariants}
            >
                Accelerate your{" "}
                <motion.span
                    className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text"
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
                    financial expertise.
                </motion.span>
            </motion.h2>
            <div className="flex flex-col lg:flex-row justify-center items-center max-w-6xl mx-auto gap-8">
                <motion.div
                    className="w-full lg:w-1/2 p-3 rounded-lg shadow-md bg-gradient-to-br from-neutral-900"
                    variants={imageVariants}
                >
                    <div className="relative w-full aspect-video rounded-lg shadow-sm overflow-hidden">
                        <motion.div
                            className="w-full h-full"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src="/images/code.webp"
                                alt="Financial expertise visualization"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover rounded-lg"
                                priority
                            />
                        </motion.div>
                    </div>
                </motion.div>
                <motion.div
                    className="w-full lg:w-1/2 p-4 bg-neutral-900 rounded-lg shadow-md"
                    variants={listContainerVariants}
                >
                    {checklistItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex items-start mb-6 last:mb-0 hover:bg-neutral-800 p-3 rounded-md transition-colors duration-200 checklist-item"
                            variants={listItemVariants}
                            whileHover={{
                                x: 5,
                                backgroundColor: "rgba(38, 38, 38, 0.8)", // bg-neutral-800
                                transition: { duration: 0.2 },
                            }}
                        >
                            <motion.div
                                className="text-green-400 mt-1 mr-4 flex-shrink-0"
                                variants={checkIconVariants}
                                whileHover="hover"
                            >
                                <CheckCircle2 className="h-6 w-6" />
                            </motion.div>
                            <div>
                                <motion.h5
                                    className="text-xl font-medium text-white mb-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        delay: 0.2 + index * 0.1,
                                        duration: 0.3,
                                    }}
                                >
                                    {item.title}
                                </motion.h5>
                                <motion.p
                                    className="text-base text-neutral-400 leading-snug"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        delay: 0.3 + index * 0.1,
                                        duration: 0.3,
                                    }}
                                >
                                    {item.description}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Workflow;
