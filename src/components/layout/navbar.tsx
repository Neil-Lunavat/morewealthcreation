"use client";

import React, { useState, useEffect, memo } from "react";
import { ArrowUp, Menu, X } from "lucide-react";
import Image from "next/image";
import { navItems } from "@/constants";
import { scrollToSection, scrollToTop } from "@/lib/utils";

// Memoized desktop navigation item component
const NavItem = memo(
    ({
        item,
        isActive,
        onClick,
    }: {
        item: { id: string; label: string };
        isActive: boolean;
        onClick: (id: string) => void;
    }) => {
        return (
            <li className="relative group">
                <button
                    onClick={() => onClick(item.id)}
                    className={`py-2 px-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded transition-all duration-300 ${
                        isActive
                            ? "text-orange-500"
                            : "text-white hover:text-orange-500"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                >
                    {item.label}
                </button>
                <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-800 transition-all duration-300 ${
                        isActive
                            ? "w-full left-0"
                            : "w-0 group-hover:w-full group-hover:left-0"
                    }`}
                />
            </li>
        );
    }
);

NavItem.displayName = "NavItem";

// Memoized mobile navigation item component
const MobileNavItem = memo(
    ({
        item,
        isActive,
        onClick,
    }: {
        item: { id: string; label: string };
        isActive: boolean;
        onClick: (id: string) => void;
    }) => {
        return (
            <button
                onClick={() => onClick(item.id)}
                className={`w-full text-left py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-md transition-all duration-300 ${
                    isActive
                        ? "border-orange-500 bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text border-2"
                        : "text-white hover:border-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-800 hover:text-transparent hover:bg-clip-text border-2 border-transparent"
                }`}
                aria-current={isActive ? "page" : undefined}
            >
                {item.label}
            </button>
        );
    }
);

MobileNavItem.displayName = "MobileNavItem";

// Memoized scroll to top button component
const ScrollToTopButton = memo(
    ({ visible, onClick }: { visible: boolean; onClick: () => void }) => {
        return (
            <button
                onClick={onClick}
                className={`z-40 fixed bottom-8 right-8 p-4 rounded-full shadow-xl transition-all duration-300 backdrop-blur-md bg-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${
                    visible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-20 opacity-0"
                } before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-br before:from-orange-400 before:to-red-700 before:blur-sm`}
                aria-label="Scroll to top"
            >
                <ArrowUp className="w-6 h-6 text-white" />
            </button>
        );
    }
);

ScrollToTopButton.displayName = "ScrollToTopButton";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("#home");

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Set active link based on scroll position
        const handleActiveLink = () => {
            const sections = document.querySelectorAll("section[id]");
            const scrollY = window.pageYOffset;

            sections.forEach((section) => {
                // Type assertion to HTMLElement which has offsetHeight and offsetTop properties
                const htmlSection = section as HTMLElement;
                const sectionHeight = htmlSection.offsetHeight;
                const sectionTop = htmlSection.offsetTop - 100;
                const sectionId = section.getAttribute("id");

                if (
                    scrollY > sectionTop &&
                    scrollY <= sectionTop + sectionHeight
                ) {
                    setActiveLink(`#${sectionId}`);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("scroll", handleActiveLink);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("scroll", handleActiveLink);
        };
    }, []);

    // Disable body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMobileMenuOpen]);

    const handleNavClick = (sectionId: string) => {
        scrollToSection(sectionId);
        setIsMobileMenuOpen(false);
    };

    const handleScrollToTop = () => {
        scrollToTop();
    };

    return (
        <>
            {/* Floating Navbar with glassy effect */}
            <nav
                className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 py-3 px-4 w-11/12 max-w-7xl rounded-xl transition-all duration-300 ${
                    isScrolled
                        ? "backdrop-blur-lg bg-neutral-900/80 shadow-lg border border-neutral-700/80"
                        : "backdrop-blur-md bg-neutral-900/50 border border-neutral-700/50"
                }`}
                aria-label="Main navigation"
            >
                <div className="container mx-auto relative lg:text-sm">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center flex-shrink-0">
                            <div className="h-10 w-10 mr-2 relative">
                                <Image
                                    src="/images/logo.webp"
                                    alt="More Wealth Creation Logo"
                                    fill
                                    sizes="(max-width: 640px) 40px, 40px"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <button
                                onClick={handleScrollToTop}
                                className="text-xl tracking-tight text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-800 hover:text-transparent hover:bg-clip-text transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded"
                                aria-label="Go to homepage"
                            >
                                More Wealth Creation
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <ul className="hidden lg:flex ml-14 space-x-12">
                            {navItems.map((item) => (
                                <NavItem
                                    key={item.id}
                                    item={item}
                                    isActive={`#${item.id}` === activeLink}
                                    onClick={handleNavClick}
                                />
                            ))}
                        </ul>

                        {/* Hamburger Menu for Mobile */}
                        <button
                            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors hover:bg-neutral-800"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label={
                                isMobileMenuOpen ? "Close menu" : "Open menu"
                            }
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-white" />
                            ) : (
                                <Menu className="w-6 h-6 text-white" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            <div
                id="mobile-menu"
                className={`lg:hidden fixed top-[calc(4rem+1.5rem)] left-1/2 transform -translate-x-1/2 w-11/12 z-40 bg-neutral-900/95 backdrop-blur-lg border border-neutral-700/80 rounded-xl shadow-xl transition-all duration-300 overflow-hidden ${
                    isMobileMenuOpen
                        ? "max-h-[400px] opacity-100"
                        : "max-h-0 opacity-0 pointer-events-none"
                }`}
                aria-hidden={!isMobileMenuOpen}
            >
                <div className="flex flex-col p-4 space-y-2">
                    {navItems.map((item) => (
                        <MobileNavItem
                            key={item.id}
                            item={item}
                            isActive={`#${item.id}` === activeLink}
                            onClick={handleNavClick}
                        />
                    ))}
                </div>
            </div>

            {/* Overlay for Mobile Menu */}
            <div
                className={`fixed inset-0 z-30 lg:hidden transition-opacity duration-300 bg-black/50 ${
                    isMobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
            />

            {/* Scroll to Top Button */}
            <ScrollToTopButton
                visible={isScrolled}
                onClick={handleScrollToTop}
            />
        </>
    );
};

export default Navbar;
