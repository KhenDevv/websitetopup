import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import GameCard from '../games/GameCard';

const LandingView = () => {
    const [activeFilter, setActiveFilter] = useState('Popular');

    // Filter pill labels specified in design-games-grid.md
    const filterPills = [
        'Popular',
        'New games',
        'Gacha games',
        'Other games',
        'Gift Cards',
        'Other Regions',
        'Entertainment',
    ];

    // Seed data array with 14 games matching design spec (image set to null for placeholder fallback)
    const seedGames = [
        {
            slug: 'valorant',
            title: 'Valorant',
            image: null,
            discountPercent: 8,
            rating: 0,
            reviewCount: 0,
            category: 'Popular',
        },
        {
            slug: 'mobile-legends',
            title: 'Mobile Legends',
            image: null,
            discountPercent: null,
            rating: 0,
            reviewCount: 0,
            category: 'Popular',
        },
        {
            slug: 'mlbb-philippines',
            title: 'MLBB Philippines',
            image: null,
            discountPercent: null,
            rating: 0,
            reviewCount: 0,
            category: 'Popular',
        },
        {
            slug: 'mlbb-verified-squad-rental',
            title: 'MLBB Verified Squad Rental',
            image: null,
            discountPercent: null,
            rating: 0,
            reviewCount: 0,
            category: 'Popular',
        },
        {
            slug: 'genshin-impact',
            title: 'Genshin Impact',
            image: null,
            discountPercent: null,
            rating: 0,
            reviewCount: 0,
            category: 'Gacha games',
        },
        {
            slug: 'league-of-legends-pc',
            title: 'League of Legends: PC',
            image: null,
            discountPercent: null,
            rating: 0,
            reviewCount: 0,
            category: 'Popular',
        },
        {
            slug: 'wild-rift',
            title: 'Wild Rift',
            image: null,
            discountPercent: null,
            rating: 0,
            reviewCount: 0,
            category: 'Popular',
        },
        {
            slug: 'blood-strike',
            title: 'Blood Strike',
            image: null,
            discountPercent: null,
            rating: 0,
            reviewCount: 0,
            category: 'New games',
        },
        {
            slug: 'blood-strike-sale',
            title: 'Blood Strike Sale',
            image: null,
            discountPercent: 38,
            rating: 0,
            reviewCount: 0,
            category: 'Popular',
        },
        {
            slug: 'steam-wallet-code-philippines',
            title: 'Steam Wallet Code Philippines',
            image: null,
            discountPercent: null,
            rating: 0,
            reviewCount: 0,
            category: 'Gift Cards',
        },
        {
            slug: 'crossfire-ecoin',
            title: 'Crossfire eCoin',
            image: null,
            discountPercent: null,
            rating: 0,
            reviewCount: 0,
            category: 'Popular',
        },
        {
            slug: 'call-of-duty-mobile',
            title: 'Call of Duty: MOBILE',
            image: null,
            discountPercent: null,
            rating: 0,
            reviewCount: 0,
            category: 'Popular',
        },
        {
            slug: 'poppo-live-coins',
            title: 'Poppo Live Coins',
            image: null,
            discountPercent: null,
            rating: 0,
            reviewCount: 0,
            category: 'Entertainment',
        },
        {
            slug: 'rblx-gift-card',
            title: 'RBLX Gift Card',
            image: null,
            discountPercent: null,
            rating: 0,
            reviewCount: 0,
            category: 'Gift Cards',
        },
    ];

    // Filter games list when pill is clicked
    const filteredGames =
        activeFilter === 'Popular'
            ? seedGames
            : seedGames.filter((g) => g.category === activeFilter);

    return (
        <div className="min-h-screen bg-[#0B0F14] text-[#F5F7FA] flex flex-col font-sans">
            {/* Navbar (Logged-out state) */}
            <Navbar activeNav="Popular" />

            {/* Main Page Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-0">
                {/* 1. Filter Pill Row */}
                <div className="flex items-center gap-[10px] overflow-x-auto scrollbar-none py-1 border-b border-[#232B36]/40 pb-4">
                    {filterPills.map((label) => {
                        const isActive = activeFilter === label;
                        return (
                            <button
                                key={label}
                                onClick={() => setActiveFilter(label)}
                                className={`h-8 px-3.5 rounded-full text-[13px] font-medium flex items-center shrink-0 border transition-all cursor-pointer select-none ${
                                    isActive
                                        ? 'bg-[#1B222C] text-[#F5F7FA] border-[#2E3844] shadow-sm'
                                        : 'bg-[#171D26] text-[#9AA5B1] border-[#232B36] hover:text-[#F5F7FA] hover:bg-[#1B222C]/70'
                                }`}
                            >
                                {/* Dot Prefix for active state */}
                                {isActive && (
                                    <span className="w-[6px] h-[6px] rounded-full bg-[#14B8A6] mr-[6px] shrink-0" />
                                )}
                                <span>{label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* 2. Section Header */}
                <div className="mt-6 mb-4">
                    <h1 className="text-[22px] font-bold text-[#F5F7FA] tracking-tight">
                        {activeFilter}
                    </h1>
                </div>

                {/* 4. Grid Layout per responsive breakpoints (2 / 3 / 5 / 7 cols) */}
                <section className="grid grid-cols-2 min-[600px]:grid-cols-3 min-[900px]:grid-cols-5 min-[1200px]:grid-cols-7 gap-2.5 min-[600px]:gap-3 min-[900px]:gap-3.5 min-[1200px]:gap-4 pb-8">
                    {filteredGames.length > 0 ? (
                        filteredGames.map((game) => (
                            <GameCard
                                key={game.slug}
                                slug={game.slug}
                                title={game.title}
                                image={game.image}
                                discountPercent={game.discountPercent}
                                rating={game.rating}
                                reviewCount={game.reviewCount}
                                category={game.category}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center text-[#6B7684]">
                            <p className="text-sm font-semibold text-[#9AA5B1]">
                                No games found in this category.
                            </p>
                            <p className="text-xs mt-1">
                                Try selecting "Popular" to view all available titles.
                            </p>
                        </div>
                    )}
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LandingView;
