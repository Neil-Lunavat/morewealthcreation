import { z } from "zod";

/**
 * Schema for booking form validation
 */
export const bookingFormSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name is too long"),
    email: z.string().email("Please enter a valid email address"),
    date: z.string().min(1, "Please select a date"),
    hour: z
        .string()
        .min(1, "Please select an hour")
        .refine(
            (val) => {
                const hourNum = parseInt(val, 10);
                return !isNaN(hourNum) && hourNum >= 1 && hourNum <= 12;
            },
            { message: "Hour must be between 1 and 12" }
        ),
    minute: z
        .string()
        .min(1, "Please select a minute")
        .refine((val) => val === "00" || val === "30", {
            message: "Minute must be 00 or 30",
        }),
    period: z
        .string()
        .min(1, "Please select AM or PM")
        .refine((val) => val === "AM" || val === "PM", {
            message: "Period must be AM or PM",
        }),
    message: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

/**
 * Validates time components and returns a formatted time string
 * @param hour Hour (1-12)
 * @param minute Minute (00 or 30)
 * @param period Period (AM or PM)
 * @returns Formatted time string or null if invalid
 */
export function validateAndFormatTime(
    hour: string,
    minute: string,
    period: string
): string | null {
    // Basic existence check
    if (!hour || !minute || !period) {
        return null;
    }

    // Validate hour (1-12)
    const hourNum = parseInt(hour, 10);
    if (isNaN(hourNum) || hourNum < 1 || hourNum > 12) {
        return null;
    }

    // Validate minute (00 or 30)
    if (minute !== "00" && minute !== "30") {
        return null;
    }

    // Validate period (AM or PM)
    if (period !== "AM" && period !== "PM") {
        return null;
    }

    // Format time string
    return `${hourNum}:${minute} ${period}`;
}

/**
 * Email validation regex
 */
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Validates an email address
 * @param email Email address to validate
 * @returns True if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
    return emailRegex.test(email);
}
