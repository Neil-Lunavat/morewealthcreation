"use client";

import { useState } from "react";
import { Twitter, Linkedin, Instagram, Info } from "lucide-react";
import DisclaimerDialog from "@/components/sections/disclaimer-dialog";

const Footer = () => {
    const [disclaimerOpen, setDisclaimerOpen] = useState(false);

    const openDisclaimer = () => setDisclaimerOpen(true);
    const closeDisclaimer = () => setDisclaimerOpen(false);

    return (
        <footer className="bg-neutral-900 text-white py-3 mt-10 border-t border-neutral-800">
            <div className="container mx-auto flex flex-col items-center px-6">
                <div className="w-full flex flex-col md:flex-row justify-between items-center mb-3">
                    <p className="text-sm text-neutral-500 mb-3 md:mb-0">
                        &copy; {new Date().getFullYear()} More Wealth Creation.
                        All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <a
                            href="https://x.com/moreofaayu"
                            className="text-neutral-500 hover:text-orange-500 transition-colors"
                            aria-label="Twitter"
                            target="_blank"
                        >
                            <Twitter size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/aayush-more-"
                            className="text-neutral-500 hover:text-orange-500 transition-colors"
                            aria-label="LinkedIn"
                            target="_blank"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="https://www.instagram.com/morewealthcreation"
                            className="text-neutral-500 hover:text-orange-500 transition-colors"
                            aria-label="Instagram"
                            target="_blank"
                        >
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>

                <button
                    onClick={openDisclaimer}
                    className="text-xs flex items-center text-neutral-500 hover:text-orange-500 transition-colors underline decoration-neutral-600 hover:decoration-orange-500"
                >
                    <Info size={12} className="mr-1" />
                    Financial Disclaimer
                </button>
            </div>

            {/* Financial Disclaimer Dialog */}
            <DisclaimerDialog
                isOpen={disclaimerOpen}
                onClose={closeDisclaimer}
            />
        </footer>
    );
};

export default Footer;
