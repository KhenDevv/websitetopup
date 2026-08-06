import React from 'react';

const AuthCard = ({ title, subtitle, children }) => {
    return (
        <div className="w-full max-w-md bg-[#181b20] border border-[#2a2e37] rounded-2xl p-8 shadow-2xl shadow-black/60 backdrop-blur-sm">
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
