import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { Gamepad2, Sparkles, Flame, Gift, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingView = () => {
    const navigate = useNavigate();

    // Mock category chips
    const categories = [
        { label: 'Popular Games', icon: Flame, count: 12 },
        { label: 'New Releases', icon: Sparkles, count: 8 },
        { label: 'Gift Cards', icon: Gift, count: 5 },
    ];

    // Placeholder game items for empty games-grid placeholder
    const gamePlaceholders = Array.from({ length: 8 }).map((_, index) => ({
        id: index + 1,
        title: `Game Title ${index + 1}`,
        category: index % 2 === 0 ? 'Mobile Game' : 'PC Game',
    }));

    return (
        <div className="min-h-screen bg-[#0B0F14] text-[#F5F7FA] flex flex-col font-sans">
            {/* Navbar (Logged-out state) */}
            <Navbar activeNav="Popular" />

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-8">
                {/* Hero / Header Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#171D26] via-[#141A22] to-[#0F2E2A] border border-[#232B36] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-3 max-w-xl text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2E2A] border border-[#14B8A6]/30 text-[#14B8A6] text-xs font-semibold">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Instant Top-Up Platform</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
                            Level Up Your Gaming Experience
                        </h1>
                        <p className="text-xs md:text-sm text-[#9AA5B1] leading-relaxed">
                            Fast, reliable, and secure top-ups for your favorite online games and digital gift cards. Sign in to track your transactions and manage credits.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0D9488] hover:to-[#14B8A6] text-white font-bold text-xs md:text-sm px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-[#14B8A6]/20 transition-all cursor-pointer"
                        >
                            Sign In to Top Up <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Filter Categories */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                    {categories.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.label}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer shrink-0 ${
                                    idx === 0
                                        ? 'bg-[#0F2E2A] border-[#14B8A6]/50 text-[#14B8A6]'
                                        : 'bg-[#141A22] border-[#232B36] text-[#9AA5B1] hover:text-[#F5F7FA] hover:border-[#2E3844]'
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{cat.label}</span>
                                <span className="bg-[#171D26] text-[#6B7684] text-[10px] px-1.5 py-0.5 rounded-full ml-1">
                                    {cat.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Empty Games-Grid Placeholder */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-[#F5F7FA] flex items-center gap-2">
                            <Gamepad2 className="w-5 h-5 text-[#14B8A6]" />
                            Featured Games Catalog
                        </h2>
                        <span className="text-xs text-[#6B7684]">Showing catalog items</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {gamePlaceholders.map((game) => (
                            <div
                                key={game.id}
                                className="group relative bg-[#141A22] border border-[#232B36] hover:border-[#14B8A6]/50 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center space-y-3 cursor-pointer"
                            >
                                {/* Game Icon Placeholder */}
                                <div className="w-16 h-16 rounded-2xl bg-[#171D26] border border-[#232B36] group-hover:border-[#14B8A6]/30 flex items-center justify-center text-[#6B7684] group-hover:text-[#14B8A6] transition-colors shadow-inner">
                                    <Gamepad2 className="w-8 h-8" />
                                </div>
                                <div className="space-y-1 w-full">
                                    <h3 className="text-xs font-bold text-[#F5F7FA] group-hover:text-[#14B8A6] transition-colors truncate">
                                        {game.title}
                                    </h3>
                                    <p className="text-[11px] text-[#6B7684]">{game.category}</p>
                                </div>
                                <div className="w-full pt-2 border-t border-[#232B36]/60 flex items-center justify-between text-[10px] text-[#9AA5B1]">
                                    <span>Instant</span>
                                    <span className="text-[#14B8A6] font-semibold">Top-Up →</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LandingView;
