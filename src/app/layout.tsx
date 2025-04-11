import type { Metadata } from "next";
import "./globals.css";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import Script from "next/script";

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
        <html lang="en" className="dark">
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
                                "https://x.com/moreofaayu",
                                "https://www.linkedin.com/in/aayush-more-",
                                "https://www.instagram.com/morewealthcreation",
                            ],
                            priceRange: "₹₹",
                        }),
                    }}
                />
            </head>
            <body
                suppressHydrationWarning={true}
                className="bg-neutral-900 text-white"
            >
                <ErrorBoundary>{children}</ErrorBoundary>

                {/* Google Analytics with Next.js Script component */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-QZJJDRLV2S"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-QZJJDRLV2S');
                    `}
                </Script>
            </body>
        </html>
    );
}
