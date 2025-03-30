"use client";

import emailjs from "@emailjs/browser";
import { EmailParams } from "@/types";

/**
 * EmailJS configuration error
 */
class EmailConfigError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "EmailConfigError";
    }
}

/**
 * Email sending error
 */
class EmailSendError extends Error {
    constructor(message: string, public originalError?: Error) {
        super(message);
        this.name = "EmailSendError";
    }
}

/**
 * Initialize EmailJS with public key
 * This should be called once when the app loads
 */
export const initEmailJS = (): void => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!publicKey) {
        console.warn(
            "EmailJS public key not found in environment variables. Email functionality will not work."
        );
        return;
    }

    try {
        emailjs.init(publicKey);
        console.log("EmailJS initialized successfully");
    } catch (error) {
        console.error("Failed to initialize EmailJS:", error);
    }
};

/**
 * Validates email parameters
 * @param params Email parameters to validate
 * @throws Error if any required field is missing
 */
const validateEmailParams = (params: EmailParams): void => {
    const requiredFields = ["name", "email", "date", "time", "timezone"];

    for (const field of requiredFields) {
        if (!params[field as keyof EmailParams]) {
            throw new Error(`Missing required field: ${field}`);
        }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.email)) {
        throw new Error("Invalid email format");
    }
};

/**
 * Sends a booking request email using EmailJS
 * @param params The email parameters
 * @returns Promise that resolves when email is sent
 * @throws EmailConfigError if EmailJS is not configured properly
 * @throws EmailSendError if there's an error sending the email
 */
export const sendBookingEmail = async (params: EmailParams): Promise<void> => {
    try {
        // Validate parameters
        validateEmailParams(params);

        const {
            name,
            email,
            date,
            time,
            message = "No additional message",
            timezone,
        } = params;

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

        if (!serviceId || !templateId) {
            throw new EmailConfigError(
                "EmailJS service ID or template ID is missing. Check your environment variables."
            );
        }

        // Prepare template parameters for EmailJS
        const templateParams = {
            to_name: "Aayush", // Recipient name
            from_name: name,
            from_email: email,
            meeting_date: date,
            meeting_time: time,
            message: message,
            timezone: timezone,
        };

        // Send email
        await emailjs.send(serviceId, templateId, templateParams);

        // Log success (remove in production or add better logging)
        console.log("Email sent successfully");

        return Promise.resolve();
    } catch (error) {
        // Handle different error types
        if (error instanceof EmailConfigError) {
            console.error("EmailJS Configuration Error:", error.message);
            throw error;
        } else if (error instanceof Error) {
            console.error("Email Sending Error:", error.message);
            throw new EmailSendError("Failed to send email", error);
        } else {
            console.error("Unknown Email Error:", error);
            throw new EmailSendError(
                "An unknown error occurred while sending email"
            );
        }
    }
};

/**
 * Get status of EmailJS configuration
 * @returns Object with status of EmailJS configuration
 */
export const getEmailServiceStatus = (): {
    isConfigured: boolean;
    missingKeys: string[];
} => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    const missingKeys = [];

    if (!publicKey) missingKeys.push("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
    if (!serviceId) missingKeys.push("NEXT_PUBLIC_EMAILJS_SERVICE_ID");
    if (!templateId) missingKeys.push("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID");

    return {
        isConfigured: missingKeys.length === 0,
        missingKeys,
    };
};
