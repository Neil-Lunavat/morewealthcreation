import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind's class merging
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Scrolls to a specific section of the page
 */
export function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);

    if (element) {
        const navbarHeight = document.querySelector("nav")?.offsetHeight || 80;
        const additionalOffset = 32;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
            elementPosition + window.scrollY - navbarHeight - additionalOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });

        return true;
    }

    return false;
}

/**
 * Scrolls to the top of the page
 */
export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Detects if the user is likely from India based on timezone
 */
export function detectIndianUser(): boolean {
    try {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return (
            userTimeZone.includes("Asia") || userTimeZone.includes("Calcutta")
        );
    } catch (error) {
        return false;
    }
}

/**
 * Gets the current timezone for display
 */
export function getCurrentTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Formats a date object to a string for form submission
 */
export function formatDateForSubmission(date: Date): string {
    return date.toISOString().split("T")[0];
}

/**
 * Get today's date as an ISO string
 */
export function getTodayISOString(): string {
    return new Date().toISOString().split("T")[0];
}

/**
 * Get a future date (e.g., 1 month from now) as an ISO string
 */
export function getFutureDateISOString(months: number = 1): string {
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + months);
    return futureDate.toISOString().split("T")[0];
}
