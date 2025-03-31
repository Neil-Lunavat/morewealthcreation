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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/ui/loading";
import { SectionErrorBoundary } from "@/components/ui/error-boundary";

// Form validation schema
const formSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name is too long"),
    email: z.string().email("Please enter a valid email address"),
    date: z.string().min(1, "Please select a date"),
    hour: z.string().min(1, "Please select an hour"),
    minute: z.string().min(1, "Please select a minute"),
    period: z.string().min(1, "Please select AM or PM"),
    message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface SubmitStatus {
    type: "success" | "error" | "";
    message: string;
}

const BookingForm = () => {
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
        type: "",
        message: "",
    });
    const { ref, isVisible } = useScrollAnimation({ once: true, amount: 0.2 });

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            date: "",
            hour: "",
            minute: "",
            period: "",
            message: "",
        },
    });

    // Watch form values for time combination
    const hour = watch("hour");
    const minute = watch("minute");
    const period = watch("period");

    // Get current timezone for display
    const timeZone = getCurrentTimezone();

    // Update combined time whenever individual time components change
    const updateCombinedTime = () => {
        if (hour && minute && period) {
            // Validate inputs
            const hourNum = parseInt(hour, 10);
            if (hourNum < 1 || hourNum > 12) {
                return false;
            }

            if (minute !== "00" && minute !== "30") {
                return false;
            }

            if (period !== "AM" && period !== "PM") {
                return false;
            }

            // Format time string
            return `${hour}:${minute} ${period}`;
        }
        return false;
    };

    // Form submission handler
    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        setSubmitStatus({ type: "", message: "" });

        // Get the combined time
        const timeString = updateCombinedTime();
        if (!timeString) {
            setSubmitStatus({
                type: "error",
                message:
                    "Invalid time selection. Please check your time inputs.",
            });
            setLoading(false);
            return;
        }

        try {
            await sendBookingEmail({
                name: data.name,
                email: data.email,
                date: data.date,
                time: timeString,
                message: data.message || "No additional message",
                timezone: timeZone,
            });

            setSubmitStatus({
                type: "success",
                message:
                    "Booking request sent successfully! We will contact you shortly.",
            });

            reset();
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

    // Generate the maxDate (e.g., 1 month from now)
    const maxDateStr = getFutureDateISOString(1);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.05, // Optimized: reduced from 0.1
                delayChildren: 0.1, // Optimized: reduced from 0.2
            },
        },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5, // Optimized: reduced from 0.6
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
                duration: 0.5, // Optimized: reduced from 0.6
                ease: "easeOut",
                delay: 0.1, // Optimized: reduced from 0.2
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
                delay: i * 0.05, // Optimized: reduced from 0.1
            },
        }),
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.4, // Optimized: reduced from 0.8
                duration: 0.3, // Optimized: reduced from 0.4
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
        <SectionErrorBoundary section="Booking Form">
            <motion.div
                id="bookingform"
                className="flex flex-col items-center mt-6 lg:mt-10 px-4"
                ref={ref}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <motion.h2
                    className="text-4xl sm:text-4xl lg:text-5xl text-center tracking-wide"
                    variants={titleVariants}
                >
                    Book a
                    <motion.span
                        className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text"
                        initial={{ backgroundPosition: "0% 50%" }}
                        animate={{
                            backgroundPosition: [
                                "0% 50%",
                                "100% 50%",
                                "0% 50%",
                            ],
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
                    className="mt-6 text-lg text-center text-neutral-300 max-w-2xl"
                    variants={descriptionVariants}
                >
                    Take the first step towards your financial goals. Schedule a
                    one-on-one consultation to discuss your unique situation and
                    learning objectives.
                </motion.p>

                {/* Status message with improved accessibility */}
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
                        role="status"
                        aria-live="polite"
                    >
                        {submitStatus.message}
                    </motion.div>
                )}

                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-10 w-full max-w-2xl"
                    variants={containerVariants}
                    noValidate
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
                                id="name"
                                type="text"
                                className={`w-full bg-neutral-900 border-2 ${
                                    errors.name
                                        ? "border-red-500"
                                        : "border-neutral-700 focus:border-orange-500"
                                } rounded-lg px-3 py-2 text-white 
                                focus:outline-none transition-colors duration-300
                                group-hover:border-orange-600`}
                                placeholder=" "
                                aria-required="true"
                                aria-invalid={errors.name ? "true" : "false"}
                                {...register("name")}
                            />
                            <label
                                htmlFor="name"
                                className={`absolute left-4 -top-3 bg-neutral-900 px-2 text-sm ${
                                    errors.name
                                        ? "text-red-400"
                                        : "text-neutral-400 group-hover:text-orange-500"
                                } transition-colors duration-300`}
                            >
                                Your Name
                            </label>
                            {errors.name && (
                                <p className="mt-1 text-red-500 text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </motion.div>

                        {/* Email Input */}
                        <motion.div
                            className="relative group"
                            custom={1}
                            variants={formItemVariants}
                            whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                            <motion.input
                                id="email"
                                type="email"
                                className={`w-full bg-neutral-900 border-2 ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-neutral-700 focus:border-orange-500"
                                } rounded-lg px-4 py-3 text-white 
                                focus:outline-none transition-colors duration-300
                                group-hover:border-orange-600`}
                                placeholder=" "
                                aria-required="true"
                                aria-invalid={errors.email ? "true" : "false"}
                                {...register("email")}
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-4 -top-3 bg-neutral-900 px-2 text-sm ${
                                    errors.email
                                        ? "text-red-400"
                                        : "text-neutral-400 group-hover:text-orange-500"
                                } transition-colors duration-300`}
                            >
                                Email Address
                            </label>
                            {errors.email && (
                                <p className="mt-1 text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </motion.div>

                        {/* Date and Time Selection */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            custom={2}
                            variants={formItemVariants}
                        >
                            <motion.div
                                className="relative group"
                                whileHover={{
                                    x: 5,
                                    transition: { duration: 0.2 },
                                }}
                            >
                                <motion.input
                                    id="date"
                                    type="date"
                                    min={today}
                                    max={maxDateStr}
                                    className={`w-full bg-neutral-900 border-2 ${
                                        errors.date
                                            ? "border-red-500"
                                            : "border-neutral-700 focus:border-orange-500"
                                    } rounded-lg px-4 py-3 text-white 
                                    focus:outline-none transition-colors duration-300
                                    group-hover:border-orange-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                                    aria-required="true"
                                    aria-invalid={
                                        errors.date ? "true" : "false"
                                    }
                                    onKeyDown={(e) => e.preventDefault()}
                                    {...register("date")}
                                />
                                <label
                                    htmlFor="date"
                                    className={`absolute left-4 -top-3 bg-neutral-900 px-2 text-sm ${
                                        errors.date
                                            ? "text-red-400"
                                            : "text-neutral-400 group-hover:text-orange-500"
                                    } transition-colors duration-300`}
                                >
                                    Preferred Date
                                </label>
                                {errors.date && (
                                    <p className="mt-1 text-red-500 text-sm">
                                        {errors.date.message}
                                    </p>
                                )}
                            </motion.div>

                            <motion.div
                                className="relative group col-span-2"
                                whileHover={{
                                    x: 5,
                                    transition: { duration: 0.2 },
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-1/3">
                                        <select
                                            id="hour"
                                            className={`w-full bg-neutral-900 border-2 ${
                                                errors.hour
                                                    ? "border-red-500"
                                                    : "border-neutral-700 focus:border-orange-500"
                                            } rounded-lg px-4 py-3 text-white 
                                            focus:outline-none transition-colors duration-300
                                            group-hover:border-orange-600`}
                                            aria-required="true"
                                            aria-invalid={
                                                errors.hour ? "true" : "false"
                                            }
                                            aria-label="Hour"
                                            {...register("hour")}
                                        >
                                            <option value="" disabled>
                                                Hour
                                            </option>
                                            {[...Array(12)].map((_, i) => (
                                                <option
                                                    key={i + 1}
                                                    value={i + 1}
                                                >
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.hour && (
                                            <p className="mt-1 text-red-500 text-sm">
                                                {errors.hour.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="w-1/3">
                                        <select
                                            id="minute"
                                            className={`w-full bg-neutral-900 border-2 ${
                                                errors.minute
                                                    ? "border-red-500"
                                                    : "border-neutral-700 focus:border-orange-500"
                                            } rounded-lg px-4 py-3 text-white 
                                            focus:outline-none transition-colors duration-300
                                            group-hover:border-orange-600`}
                                            aria-required="true"
                                            aria-invalid={
                                                errors.minute ? "true" : "false"
                                            }
                                            aria-label="Minute"
                                            {...register("minute")}
                                        >
                                            <option value="" disabled>
                                                Minute
                                            </option>
                                            <option value="00">00</option>
                                            <option value="30">30</option>
                                        </select>
                                        {errors.minute && (
                                            <p className="mt-1 text-red-500 text-sm">
                                                {errors.minute.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="w-1/3">
                                        <select
                                            id="period"
                                            className={`w-full bg-neutral-900 border-2 ${
                                                errors.period
                                                    ? "border-red-500"
                                                    : "border-neutral-700 focus:border-orange-500"
                                            } rounded-lg px-4 py-3 text-white 
                                            focus:outline-none transition-colors duration-300
                                            group-hover:border-orange-600`}
                                            aria-required="true"
                                            aria-invalid={
                                                errors.period ? "true" : "false"
                                            }
                                            aria-label="AM or PM"
                                            {...register("period")}
                                        >
                                            <option value="" disabled>
                                                AM/PM
                                            </option>
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                        {errors.period && (
                                            <p className="mt-1 text-red-500 text-sm">
                                                {errors.period.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <label
                                    htmlFor="hour"
                                    className={`absolute left-4 -top-3 bg-neutral-900 px-2 text-sm ${
                                        errors.hour ||
                                        errors.minute ||
                                        errors.period
                                            ? "text-red-400"
                                            : "text-neutral-400 group-hover:text-orange-500"
                                    } transition-colors duration-300`}
                                >
                                    Preferred Time
                                </label>
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
                                id="message"
                                rows={4}
                                className={`w-full bg-neutral-900 border-2 ${
                                    errors.message
                                        ? "border-red-500"
                                        : "border-neutral-700 focus:border-orange-500"
                                } rounded-lg px-4 py-3 text-white 
                                focus:outline-none transition-colors duration-300
                                group-hover:border-orange-600`}
                                placeholder=" "
                                aria-invalid={errors.message ? "true" : "false"}
                                {...register("message")}
                            />
                            <label
                                htmlFor="message"
                                className={`absolute left-4 -top-3 bg-neutral-900 px-2 text-sm ${
                                    errors.message
                                        ? "text-red-400"
                                        : "text-neutral-400 group-hover:text-orange-500"
                                } transition-colors duration-300`}
                            >
                                Message (Optional)
                            </label>
                            {errors.message && (
                                <p className="mt-1 text-red-500 text-sm">
                                    {errors.message.message}
                                </p>
                            )}
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <LoadingButton
                                type="submit"
                                isLoading={loading}
                                loadingText="Sending..."
                                className="relative w-full group overflow-hidden rounded-lg h-14"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-800 opacity-100 group-hover:opacity-0 transition-all duration-300" />
                                <span className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500 rounded-lg transition-all duration-300" />
                                <span className="relative z-10">
                                    Schedule Consultation
                                </span>
                            </LoadingButton>
                        </motion.div>
                    </div>
                </motion.form>
            </motion.div>
        </SectionErrorBoundary>
    );
};

export default BookingForm;
