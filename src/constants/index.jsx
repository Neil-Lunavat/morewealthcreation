import {
    BarChart2,
    Bitcoin,
    Laptop,
    PieChart,
    TrendingUp,
    Users,
} from "lucide-react";
import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
    { label: "Services", id: "services" },
    { label: "Benefits", id: "workflow" },
    { label: "Pricing", id: "pricing" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact Us", id: "bookingform" },
];

export const testimonials = [
    {
        user: "John Doe",
        company: "WealthFront Advisors",
        image: user1,
        text: "The financial guidance I received was top-notch. The team helped me build a diversified investment portfolio, and now I feel more confident about my future.",
        stars: 4.5,
    },
    {
        user: "Jane Smith",
        company: "Blue Horizon Capital",
        image: user2,
        text: "I couldn't be happier with the financial planning services. The team's insights and strategic advice have significantly improved my savings and investments.",
        stars: 4,
    },
    {
        user: "David Johnson",
        company: "Quantum Wealth Management",
        image: user3,
        text: "Working with this firm was a game-changer for my financial goals. Their tailored investment strategies helped me maximize returns while minimizing risks.",
        stars: 5,
    },
    {
        user: "Ronee Brown",
        company: "Fusion Finance Solutions",
        image: user4,
        text: "The financial planning service was outstanding! They provided me with a clear roadmap for wealth accumulation and retirement planning.",
        stars: 3,
    },
    {
        user: "Michael Wilson",
        company: "Visionary Asset Management",
        image: user5,
        text: "Their financial expertise helped me navigate complex investment options with ease. I’ve seen a significant increase in my portfolio’s performance.",
        stars: 4.5,
    },
    {
        user: "Emily Davis",
        company: "Synergy Financial Group",
        image: user6,
        text: "Thanks to their financial coaching, I finally have a solid budget and investment plan. I’m now on track to achieving my long-term wealth goals!",
        stars: 4,
    },
];

export const services = [
    {
        icon: <TrendingUp />,
        text: "One-on-One Financial Coaching",
        description:
            "Customised financial planning sessions tailored to individual financial goals. Learn how to trade and invest in stocks, forex markets, bonds, and cryptocurrencies, understand market trends, and develop a strategy for long-term wealth building.",
    },
    {
        icon: <PieChart />,
        text: "Investment Portfolio Analysis",
        description:
            "Detailed review of existing investments and personalised recommendations to optimise returns and mitigate risks.",
    },
    {
        icon: <Users />,
        text: "Free Workshops & Webinars",
        description:
            "Weekly and Monthly financial literacy sessions covering key topics such as budgeting, investing, and retirement planning.",
    },
    {
        icon: <Laptop />,
        text: "Online Courses (Coming Soon)",
        description:
            "Comprehensive self-paced courses on trading and investing in the stock market, forex market, and cryptocurrency market. Learn technical and fundamental analysis, risk management, and trading strategies to navigate financial markets effectively.",
    },
    {
        icon: <BarChart2 />,
        text: "Personalised Investment Strategies",
        description:
            "Asset allocation and portfolio diversification based on risk appetite and long-term financial goals.",
    },
    {
        icon: <Bitcoin />,
        text: "Crypto Investment & Strategy Consulting",
        description:
            "Understand the fundamentals of cryptocurrency investing, blockchain technology, and how digital assets can fit into a diversified investment portfolio. Get guidance on risk management and long-term crypto strategies.",
    },
];

export const checklistItems = [
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

export const pricingOptions = [
    {
        title: "Book a Free Demo Class",
        price: "$0",
        features: [
            "One-on-one consultation",
            "Introductory finance concepts",
            "Personalized learning plan preview",
            "Q&A session with an expert",
        ],
    },
    {
        title: "Start Coaching",
        price: "$49",
        features: [
            "Weekly live tutoring sessions",
            "Personalized financial learning path",
            "Real-world case studies & exercises",
            "Investment & wealth-building strategies",
            "24/7 doubt resolution via chat",
            "Access to premium finance resources",
        ],
    },
];

export const resourcesLinks = [
    { href: "#", text: "Getting Started" },
    { href: "#", text: "Documentation" },
    { href: "#", text: "Tutorials" },
    { href: "#", text: "API Reference" },
    { href: "#", text: "Community Forums" },
];

export const platformLinks = [
    { href: "#", text: "Services" },
    { href: "#", text: "Supported Devices" },
    { href: "#", text: "System Requirements" },
    { href: "#", text: "Downloads" },
    { href: "#", text: "Release Notes" },
];

export const communityLinks = [
    { href: "#", text: "Events" },
    { href: "#", text: "Meetups" },
    { href: "#", text: "Conferences" },
    { href: "#", text: "Hackathons" },
    { href: "#", text: "Jobs" },
];
