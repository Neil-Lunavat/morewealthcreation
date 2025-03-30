"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { sendBookingEmail } from "@/lib/email";
import {
    getCurrentTimezone,
    getTodayISOString,
    getFutureDateISOString,
} from "@/lib/utils";

interface FormData {
    name: string;
    email: string;
    date: string;
    time: string;
    hour: string;
    minute: string;
    period: string;
    message: string;
}

interface SubmitStatus {
    type: "success" | "error" | "";
    message: string;
}

const BookingForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        date: "",
        time: "",
        hour: "",
        minute: "",
        period: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
        type: "",
        message: "",
    });
    const { ref, isVisible } = useScrollAnimation({ once: true, amount: 0.2 });

    // Get current timezone for display
    const timeZone = getCurrentTimezone();

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // If this is one of the time components, also update the combined time value
        if (name === "hour" || name === "minute" || name === "period") {
            const hour = name === "hour" ? value : formData.hour || "";
            const minute = name === "minute" ? value : formData.minute || "";
            const period = name === "period" ? value : formData.period || "";

            // Only update the combined time if all components are present
            if (hour && minute && period) {
                const timeString = `${hour}:${minute} ${period}`;
                setFormData((prev) => ({ ...prev, time: timeString }));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSubmitStatus({ type: "", message: "" });

        try {
            await sendBookingEmail({
                name: formData.name,
                email: formData.email,
                date: formData.date,
                time: formData.time,
                message: formData.message || "No additional message",
                timezone: timeZone,
            });

            setSubmitStatus({
                type: "success",
                message:
                    "Booking request sent successfully! We will contact you shortly.",
            });

            setFormData({
                name: "",
                email: "",
                date: "",
                time: "",
                hour: "",
                minute: "",
                period: "",
                message: "",
            });
        } catch (error) {
            setSubmitStatus({
                type: "error",
                message:
                    "There was an error sending your booking request. Please try again.",
            });
            console.error("Email Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Get today's date and format it for min date attribute
    const today = getTodayISOString();

    // Generate the maxDate (e.g., 1 months from now)
    const maxDateStr = getFutureDateISOString(1);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const descriptionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2,
            },
        },
    };

    const formItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: i * 0.1,
            },
        }),
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.8,
                duration: 0.4,
            },
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2,
            },
        },
        tap: {
            scale: 0.98,
        },
    };

    const statusVariants = {
        hidden: { opacity: 0, height: 0, y: -10 },
        visible: {
            opacity: 1,
            height: "auto",
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
        exit: {
            opacity: 0,
            height: 0,
            y: -10,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            id="bookingform"
            className="flex flex-col items-center mt-6 lg:mt-20 px-4"
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <motion.h2
                className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide"
                variants={titleVariants}
            >
                Book a
                <motion.span
                    className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                        duration: 6,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {" "}
                    Free Consultation{" "}
                </motion.span>
                Call
            </motion.h2>

            <motion.p
                className="mt-6 text-lg text-center text-neutral-500 max-w-2xl"
                variants={descriptionVariants}
            >
                Take the first step towards your financial goals. Schedule a
                one-on-one consultation to discuss your unique situation and
                learning objectives.
            </motion.p>

            {submitStatus.message && (
                <motion.div
                    className={`mt-4 p-4 rounded-lg w-full max-w-2xl ${
                        submitStatus.type === "success"
                            ? "bg-green-900/50 text-green-300"
                            : "bg-red-900/50 text-red-300"
                    }`}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={statusVariants}
                >
                    {submitStatus.message}
                </motion.div>
            )}

            <motion.form
                onSubmit={handleSubmit}
                className="mt-10 w-full max-w-2xl"
                variants={containerVariants}
            >
                <div className="space-y-6">
                    {/* Name Input */}
                    <motion.div
                        className="relative group"
                        custom={0}
                        variants={formItemVariants}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                        <motion.input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-neutral-900 border-2 border-neutral-700 rounded-lg px-4 py-3 text-white 
                                     focus:outline-none focus:border-orange-500 transition-colors duration-300
                                     group-hover:border-orange-600"
                            placeholder=" "
                            required
                            whileFocus={{
                                borderColor: "rgb(249, 115, 22)",
                                transition: { duration: 0.3 },
                            }}
                        />
                        <motion.label
                            className="absolute left-4 -top-3 bg-neutral-900 px-2 text-sm text-neutral-400 
                                        group-hover:text-orange-500 transition-colors duration-300"
                            whileHover={{ color: "rgb(249, 115, 22)" }}
                        >
                            Your Name
                        </motion.label>
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                        className="relative group"
                        custom={1}
                        variants={formItemVariants}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                        <motion.input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-neutral-900 border-2 border-neutral-700 rounded-lg px-4 py-3 text-white 
                                     focus:outline-none focus:border-orange-500 transition-colors duration-300
                                     group-hover:border-orange-600"
                            placeholder=" "
                            required
                            whileFocus={{
                                borderColor: "rgb(249, 115, 22)",
                                transition: { duration: 0.3 },
                            }}
                        />
                        <motion.label
                            className="absolute left-4 -top-3 bg-neutral-900 px-2 text-sm text-neutral-400 
                                        group-hover:text-orange-500 transition-colors duration-300"
                            whileHover={{ color: "rgb(249, 115, 22)" }}
                        >
                            Email Address
                        </motion.label>
                    </motion.div>

                    {/* Date and Time Selection */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        custom={2}
                        variants={formItemVariants}
                    >
                        <motion.div
                            className="relative group"
                            whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                            <motion.input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                min={today}
                                max={maxDateStr}
                                className="w-full bg-neutral-900 border-2 border-neutral-700 rounded-lg px-4 py-3 text-white 
                     focus:outline-none focus:border-orange-500 transition-colors duration-300
                     group-hover:border-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                required
                                onKeyDown={(e) => e.preventDefault()}
                                whileFocus={{
                                    borderColor: "rgb(249, 115, 22)",
                                    transition: { duration: 0.3 },
                                }}
                            />
                            <motion.label
                                className="absolute left-4 -top-3 bg-neutral-900 px-2 text-sm text-neutral-400 
                        group-hover:text-orange-500 transition-colors duration-300"
                                whileHover={{ color: "rgb(249, 115, 22)" }}
                            >
                                Preferred Date
                            </motion.label>
                        </motion.div>

                        <motion.div
                            className="relative group col-span-2"
                            whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                            <div className="flex items-center gap-4">
                                <motion.select
                                    name="hour"
                                    value={formData.hour}
                                    onChange={handleChange}
                                    className="w-1/3 bg-neutral-900 border-2 border-neutral-700 rounded-lg px-4 py-3 text-white 
                         focus:outline-none focus:border-orange-500 transition-colors duration-300
                         group-hover:border-orange-600"
                                    required
                                    whileFocus={{
                                        borderColor: "rgb(249, 115, 22)",
                                        transition: { duration: 0.3 },
                                    }}
                                >
                                    <option value="" disabled>
                                        Hour
                                    </option>
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </motion.select>

                                <motion.select
                                    name="minute"
                                    value={formData.minute}
                                    onChange={handleChange}
                                    className="w-1/3 bg-neutral-900 border-2 border-neutral-700 rounded-lg px-4 py-3 text-white 
                         focus:outline-none focus:border-orange-500 transition-colors duration-300
                         group-hover:border-orange-600"
                                    required
                                    whileFocus={{
                                        borderColor: "rgb(249, 115, 22)",
                                        transition: { duration: 0.3 },
                                    }}
                                >
                                    <option value="" disabled>
                                        Minute
                                    </option>
                                    <option value="00">00</option>
                                    <option value="30">30</option>
                                </motion.select>

                                <motion.select
                                    name="period"
                                    value={formData.period}
                                    onChange={handleChange}
                                    className="w-1/3 bg-neutral-900 border-2 border-neutral-700 rounded-lg px-4 py-3 text-white 
                         focus:outline-none focus:border-orange-500 transition-colors duration-300
                         group-hover:border-orange-600"
                                    required
                                    whileFocus={{
                                        borderColor: "rgb(249, 115, 22)",
                                        transition: { duration: 0.3 },
                                    }}
                                >
                                    <option value="" disabled>
                                        AM/PM
                                    </option>
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </motion.select>
                            </div>
                            <motion.label
                                className="absolute left-4 -top-3 bg-neutral-900 px-2 text-sm text-neutral-400 
                        group-hover:text-orange-500 transition-colors duration-300"
                                whileHover={{ color: "rgb(249, 115, 22)" }}
                            >
                                Preferred Time
                            </motion.label>
                        </motion.div>
                    </motion.div>

                    {/* Message Input */}
                    <motion.div
                        className="relative group"
                        custom={3}
                        variants={formItemVariants}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                        <motion.textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-neutral-900 border-2 border-neutral-700 rounded-lg px-4 py-3 text-white 
                                     focus:outline-none focus:border-orange-500 transition-colors duration-300
                                     group-hover:border-orange-600"
                            placeholder=" "
                            whileFocus={{
                                borderColor: "rgb(249, 115, 22)",
                                transition: { duration: 0.3 },
                            }}
                        />
                        <motion.label
                            className="absolute left-4 -top-3 bg-neutral-900 px-2 text-sm text-neutral-400 
                                        group-hover:text-orange-500 transition-colors duration-300"
                            whileHover={{ color: "rgb(249, 115, 22)" }}
                        >
                            Message (Optional)
                        </motion.label>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        className="relative w-full group overflow-hidden rounded-lg h-14 disabled:opacity-50 disabled:cursor-not-allowed"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-800 opacity-100 group-hover:opacity-0"
                            initial={{ opacity: 1 }}
                            whileHover={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.span
                            className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500 rounded-lg transition-all duration-300"
                            initial={{ borderColor: "transparent" }}
                            whileHover={{ borderColor: "rgb(249, 115, 22)" }}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 text-white text-lg font-medium">
                            {loading ? (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Sending...
                                </motion.span>
                            ) : (
                                <motion.span
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Schedule Consultation
                                </motion.span>
                            )}
                        </span>
                    </motion.button>
                </div>
            </motion.form>
        </motion.div>
    );
};

export default BookingForm;
