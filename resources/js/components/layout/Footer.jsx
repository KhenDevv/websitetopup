import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#080B0F] border-t border-[#232B36] py-6 px-4 md:px-8 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left: Brand logo chip */}
                <div className="flex items-center gap-2">
                    <span className="bg-[#0F2E2A] text-[#14B8A6] border border-[#14B8A6]/30 text-xs font-bold px-3 py-1 rounded-md tracking-wide">
                        Top-Up
                    </span>
                </div>

                {/* Center: Policy Links */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#9AA5B1]">
                    <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#F5F7FA] transition-colors">
                        Terms of Service
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#F5F7FA] transition-colors">
                        Privacy Policy
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#F5F7FA] transition-colors">
                        Refund Policy
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#F5F7FA] transition-colors">
                        Contact Us
                    </a>
                </div>

                {/* Right: Copyright */}
                <div className="text-xs text-[#6B7684]">
                    © 2026 RAWR Digital Services. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
