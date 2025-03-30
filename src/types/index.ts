import { ReactNode } from "react";

/**
 * Common navigation item interface
 */
export interface NavItem {
    label: string;
    id: string;
}

/**
 * Testimonial item interface
 */
export interface Testimonial {
    user: string;
    company: string;
    image: string;
    text: string;
    stars: number;
}

/**
 * Service item interface
 */
export interface Service {
    icon: ReactNode;
    text: string;
    description: string;
}

/**
 * Checklist item interface for the Benefits/Workflow section
 */
export interface ChecklistItem {
    title: string;
    description: string;
}

/**
 * Pricing option interface
 */
export interface PricingOption {
    title: string;
    priceInr: string;
    priceEur: string;
    description: string;
    features: string[];
}

/**
 * Teaching option interface
 */
export interface TeachingOption {
    title: string;
    price: string;
    priceEur: string;
    description: string;
    features: string[];
    buttonText: string;
    buttonAction?: () => void;
    tierGradient?: string;
}

/**
 * Consulting option interface
 */
export interface ConsultingOption {
    title: string;
    price: string;
    priceEur: string;
    description: string;
    features: string[];
}

/**
 * Footer link interface
 */
export interface FooterLink {
    href: string;
    text: string;
}

/**
 * Form data interface for the booking form
 */
export interface FormData {
    name: string;
    email: string;
    date: string;
    time: string;
    hour: string;
    minute: string;
    period: string;
    message: string;
}

/**
 * Email parameters interface for sending emails
 */
export interface EmailParams {
    name: string;
    email: string;
    date: string;
    time: string;
    message?: string;
    timezone: string;
}

/**
 * Form submission status interface
 */
export interface SubmitStatus {
    type: "success" | "error" | "";
    message: string;
}

/**
 * Animation variants interface for Framer Motion
 */
export interface AnimationVariants {
    hidden: object;
    visible: object | ((i: number) => object);
    hover?: object;
    tap?: object;
    [key: string]: object | ((i: number) => object) | undefined;
}
/**
 * Scroll animation options interface
 */
export interface ScrollAnimationOptions {
    once?: boolean;
    amount?: number;
    threshold?: number[];
}
