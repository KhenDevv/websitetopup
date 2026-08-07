import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthCard = ({ title, subtitle, children }) => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full max-w-md bg-[#181b20] border border-[#2a2e37] rounded-2xl p-8 shadow-2xl shadow-black/80 backdrop-blur-md">
            {/* Close Button */}
            <button
                type="button"
                onClick={() => navigate('/')}
                className="absolute top-4 right-4 p-2 text-[#98a2b3] hover:text-white hover:bg-[#222630] rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
                title="Close"
            >
                <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold tracking-wider text-white mb-2 font-sans">
                    DGC
                </h1>
                <p className="text-[#98a2b3] text-sm font-medium">
                    {subtitle}
                </p>
            </div>

            {/* Form Content */}
            {children}
        </div>
    );
};

export default AuthCard;
