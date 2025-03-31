"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

// Loading fallback component
function PaymentSuccessLoading() {
    return (
        <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-neutral-800 rounded-xl border border-neutral-700 p-8 text-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/30"></div>
                    <div className="h-8 w-3/4 bg-neutral-700 rounded"></div>
                    <div className="h-4 w-1/2 bg-neutral-700 rounded"></div>
                    <div className="mt-6 space-y-3">
                        <div className="h-32 w-full bg-neutral-700 rounded"></div>
                        <div className="h-40 w-full bg-neutral-700 rounded"></div>
                    </div>
                    <div className="h-10 w-full bg-orange-500/30 rounded-lg mt-4"></div>
                </div>
            </div>
        </div>
    );
}

// Main component that uses search params
function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const [sessionType, setSessionType] = useState<string>("session");

    // Get the session type from URL parameters
    useEffect(() => {
        const type = searchParams.get("type");
        if (type) {
            setSessionType(type);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
                {/* Top success banner */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 flex items-center gap-3">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2,
                        }}
                    >
                        <CheckCircle className="text-white h-8 w-8" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                    >
                        <h1 className="text-white text-xl font-semibold">
                            Payment Successful!
                        </h1>
                        <p className="text-green-100 text-sm">
                            Your booking has been confirmed
                        </p>
                    </motion.div>
                </div>

                {/* Content section */}
                <div className="p-6 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-center"
                    >
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Thank You for Your Purchase!
                        </h2>
                        <p className="text-neutral-400">
                            You&apos;ve successfully booked a {sessionType}.
                        </p>
                    </motion.div>

                    {/* Meeting details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="bg-neutral-700 rounded-lg p-4"
                    >
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Your Meeting Details
                        </h3>

                        <div className="space-y-3">
                            <div>
                                <p className="text-neutral-400 text-sm">
                                    Google Meet Link:
                                </p>
                                <a
                                    href="https://meet.google.com/abc-defg-hij"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-orange-500 hover:text-orange-400 underline break-all transition-colors font-medium"
                                >
                                    https://meet.google.com/abc-defg-hij
                                </a>
                            </div>

                            <div>
                                <p className="text-neutral-400 text-sm">
                                    Please note:
                                </p>
                                <p className="text-white text-sm">
                                    Our team will contact you shortly to confirm
                                    the exact date and time for your session.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Financial tips teaser */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="border border-orange-500/30 rounded-lg p-4 bg-gradient-to-br from-orange-950/30 to-transparent"
                    >
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Prepare for Your Session
                        </h3>
                        <p className="text-neutral-300 text-sm mb-3">
                            To make the most of your upcoming session, we
                            recommend preparing:
                        </p>
                        <ul className="text-sm text-neutral-400 space-y-2 mb-3">
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">
                                    <CheckCircle size={14} />
                                </span>
                                <span>A list of your financial goals</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">
                                    <CheckCircle size={14} />
                                </span>
                                <span>
                                    Questions about investment strategies
                                    you&apos;re curious about
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">
                                    <CheckCircle size={14} />
                                </span>
                                <span>
                                    Overview of your current financial situation
                                    (optional)
                                </span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Back to home button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="pt-2"
                    >
                        <Link
                            href="/"
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 
                       text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 
                       font-medium shadow-lg shadow-orange-800/30 hover:shadow-orange-800/50"
                        >
                            <span>Return to Home</span>
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// Main exported component with Suspense boundary
export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<PaymentSuccessLoading />}>
            <PaymentSuccessContent />
        </Suspense>
    );
}
