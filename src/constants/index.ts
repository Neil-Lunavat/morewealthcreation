import { LucideIcon } from "lucide-react";
import {
    BarChart2,
    Bitcoin,
    Laptop,
    PieChart,
    TrendingUp,
    Users,
} from "lucide-react";

// Types
export interface NavItem {
    label: string;
    href: string;
}

export interface Testimonial {
    user: string;
    company: string;
    image: string;
    text: string;
    stars: number;
}

export interface Service {
    icon: LucideIcon;
    text: string;
    description: string;
}

export interface ChecklistItem {
    title: string;
    description: string;
}

export interface PricingOption {
    title: string;
    priceInr: string;
    priceEur: string;
    description: string;
    features: string[];
}

export interface FooterLink {
    href: string;
    text: string;
}

// Navigation items
export const navItems: NavItem[] = [
    { label: "About", href: "/about-us" },
    { label: "Benefits", href: "#workflow" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact Us", href: "#bookingform" },
];

// Testimonials
export const testimonials: Testimonial[] = [
    {
        user: "Tanmay Bandal",
        company: "Working Professional",
        image: "/images/placeholder.jpg",
        text: "Mr Aayush's perspectives have tremendously transformed my savings and investment strategies to a greater extent. Because of his financial mastery, it was simple for me to deal with multi-faceted investment choices, resulting to a significant enhancement my portfolio's performance.",
        stars: 5,
    },
    {
        user: "Dhiraj R.",
        company: "Former Student",
        image: "/images/placeholder.jpg",
        text: "I've always been intimidated by financial planning, but Aayush made it approachable and even enjoyable. He's not just a teacher; he's a mentor. The way he simplifies complex concepts is incredible, and I appreciate his genuine care for my financial well-being.",
        stars: 4.5,
    },
    {
        user: "Rajendra T.",
        company: "V.P. (Business Owner)",
        image: "/images/placeholder.jpg",
        text: "As a Vice president of a company, my focus is always on strategic planning and execution. Financial planning, however, was something I consistently put on the back burner. Aayush's consulting was a game-changer. He didn't just give me generic advice; he created a tailored portfolio that aligned with my long-term goals. His ability to explain complex financial instruments in a clear, concise manner was invaluable. Now, I feel confident in my financial future, and that peace of mind is priceless.",
        stars: 5,
    },
    {
        user: "Daniel",
        company: "Young Professional",
        image: "/images/placeholder.jpg",
        text: "As a young professional, I felt completely overwhelmed by the world of investing. Aayush changed that. He broke down everything into simple, understandable terms, and now I feel confident managing my finances. The lifetime support is invaluable – knowing I can reach out with any question is a huge relief!",
        stars: 4,
    },
    {
        user: "Andrea",
        company: "Financial Beginner",
        image: "/images/placeholder.jpg",
        text: "I came to Aayush with zero knowledge of investing. He patiently walked me through everything, explaining each concept in detail. His personalized guidance and continuous support have given me the confidence to start my investment journey. Thank you!",
        stars: 4,
    },
];

// Services
export const services: Service[] = [
    {
        icon: TrendingUp,
        text: "One-on-One Financial Coaching",
        description:
            "Customised financial planning sessions tailored to individual financial goals. Learn how to trade and invest in stocks, forex markets, bonds, and cryptocurrencies, understand market trends, and develop a strategy for long-term wealth building.",
    },
    {
        icon: PieChart,
        text: "Investment Portfolio Analysis",
        description:
            "Detailed review of existing investments and personalised recommendations to optimise returns and mitigate risks.",
    },
    {
        icon: Users,
        text: "Free Workshops & Webinars",
        description:
            "Weekly and Monthly financial literacy sessions covering key topics such as budgeting, investing, and retirement planning.",
    },
    {
        icon: Laptop,
        text: "Online Courses (Coming Soon)",
        description:
            "Comprehensive self-paced courses on trading and investing in the stock market, forex market, and cryptocurrency market. Learn technical and fundamental analysis, risk management, and trading strategies to navigate financial markets effectively.",
    },
    {
        icon: BarChart2,
        text: "Personalised Investment Strategies",
        description:
            "Asset allocation and portfolio diversification based on risk appetite and long-term financial goals.",
    },
    {
        icon: Bitcoin,
        text: "Crypto Investment & Strategy Consulting",
        description:
            "Understand the fundamentals of cryptocurrency investing, blockchain technology, and how digital assets can fit into a diversified investment portfolio. Get guidance on risk management and long-term crypto strategies.",
    },
];

// Checklist Items
export const checklistItems: ChecklistItem[] = [
    {
        title: "Achieve Financial Independence",
        description:
            "Learn how to manage, grow, and multiply your wealth, setting yourself up for long-term financial freedom.",
    },
    {
        title: "Access to Expert Knowledge at Low Cost",
        description:
            "More affordable than hiring a financial advisor and get a structured course with 1-on-1 guidance at a fraction of the cost.",
    },
    {
        title: "No Conflicts of Interest",
        description:
            "Pure education, no sales pitch—I teach you how to manage money effectively instead of selling financial products.",
    },
    {
        title: "Make Smart Investment Decisions",
        description:
            "Gain the knowledge to confidently invest in stocks, real estate, and other assets while minimizing risks.",
    },
];

// Pricing options
export const pricingOptions: PricingOption[] = [
    {
        title: "Basic",
        priceInr: "₹1K - 3K",
        priceEur: "€11.99 - €34.99",
        description: "Hourly consulting for a specific problem",
        features: [
            "One-time consultation session",
            "Focused problem solving",
            "Specific financial advice",
            "Follow-up support via email",
        ],
    },
    {
        title: "Intermediate",
        priceInr: "₹5K",
        priceEur: "€54.99",
        description: "Monthly consulting services",
        features: [
            "Regular monthly sessions",
            "Ongoing financial guidance",
            "Portfolio review and optimization",
            "Priority email support",
            "Access to financial resources",
        ],
    },
    {
        title: "Premium",
        priceInr: "₹3K - 15K",
        priceEur: "€34.99 - €159.99",
        description: "Personal one-to-one finance courses",
        features: [
            "Comprehensive financial education",
            "Customized learning curriculum",
            "Practical exercises and assignments",
            "24/7 support via chat",
            "Lifetime access to course materials",
            "Certificate of completion",
        ],
    },
];

// Resources Links
export const resourcesLinks: FooterLink[] = [
    { href: "#", text: "Getting Started" },
    { href: "#", text: "Documentation" },
    { href: "#", text: "Tutorials" },
    { href: "#", text: "API Reference" },
    { href: "#", text: "Community Forums" },
];

// Platform Links
export const platformLinks: FooterLink[] = [
    { href: "#", text: "Services" },
    { href: "#", text: "Supported Devices" },
    { href: "#", text: "System Requirements" },
    { href: "#", text: "Downloads" },
    { href: "#", text: "Release Notes" },
];

// Community Links
export const communityLinks: FooterLink[] = [
    { href: "#", text: "Events" },
    { href: "#", text: "Meetups" },
    { href: "#", text: "Conferences" },
    { href: "#", text: "Hackathons" },
    { href: "#", text: "Jobs" },
];
