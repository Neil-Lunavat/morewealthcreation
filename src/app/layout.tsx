import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "More Wealth Creation | Personal Finance Tutor",
    description:
        "Personalized financial coaching and investment strategies crafted to help you take control of your financial future. Book a free consultation today.",
    keywords:
        "finance tutor, financial coaching, investment strategies, wealth creation, personal finance, financial literacy, investment portfolio, financial independence",
    authors: [{ name: "Aayush More" }],
    openGraph: {
        title: "More Wealth Creation | Personal Finance Tutor",
        description:
            "Personalized financial coaching and investment strategies crafted to help you take control of your financial future.",
        url: "https://morewealthcreation.com",
        images: [
            {
                url: "https://morewealthcreation.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "More Wealth Creation",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "More Wealth Creation | Personal Finance Tutor",
        description:
            "Personalized financial coaching and investment strategies crafted to help you take control of your financial future.",
        images: ["https://morewealthcreation.com/og-image.jpg"],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ProfessionalService",
                            name: "More Wealth Creation",
                            description:
                                "Personalized financial coaching and investment strategies crafted to help you take control of your financial future.",
                            image: "https://morewealthcreation.com/og-image.jpg",
                            url: "https://morewealthcreation.com",
                            telephone: "",
                            address: {
                                "@type": "PostalAddress",
                                addressCountry: "IN",
                            },
                            geo: {
                                "@type": "GeoCoordinates",
                            },
                            openingHoursSpecification: {
                                "@type": "OpeningHoursSpecification",
                                dayOfWeek: [
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                ],
                                opens: "09:00",
                                closes: "18:00",
                            },
                            sameAs: [
                                "https://www.facebook.com/morewealthcreation",
                                "https://twitter.com/morewealthcreation",
                                "https://www.linkedin.com/in/morewealthcreation",
                                "https://www.instagram.com/morewealthcreation",
                            ],
                            priceRange: "₹₹",
                        }),
                    }}
                />
            </head>
            <body suppressHydrationWarning={true}>{children}</body>
        </html>
    );
}
