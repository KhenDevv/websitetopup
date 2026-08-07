import React from 'react';
import { Search, Wallet, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ activeNav = 'Popular' }) => {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="h-[64px] bg-[#11161D] border-b border-[#232B36] sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between gap-4">
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-6">
                <Link to="/" className="text-xl font-extrabold text-[#F5F7FA] tracking-wider hover:text-[#14B8A6] transition-colors">
                    DGC
                </Link>
            </div>

            {/* Center: Search Pill & Nav Links */}
            <div className="flex items-center gap-6 flex-1 max-w-2xl justify-center">
                <div className="relative w-full max-w-xs md:max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7684]" />
                    <input
                        type="text"
                        placeholder="Search for other Games"
                        className="w-full bg-[#171D26] border border-[#232B36] focus:border-[#14B8A6] text-[#F5F7FA] placeholder-[#6B7684] text-xs rounded-full pl-9 pr-4 py-2 outline-none transition-all"
                    />
                </div>

                {/* Nav Links */}
                <nav className="hidden lg:flex items-center gap-5 text-xs font-medium">
                    {['Popular', 'New Games', 'Gift Cards'].map((link) => (
                        <a
                            key={link}
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className={`transition-colors ${
                                activeNav === link ? 'text-[#F5F7FA] font-semibold' : 'text-[#9AA5B1] hover:text-[#F5F7FA]'
                            }`}
                        >
                            {link}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Right: Auth State Actions */}
            <div className="flex items-center gap-3">
                {isAuthenticated ? (
                    <div className="flex items-center gap-3">
                        {/* User Avatar + Wallet */}
                        <div className="flex items-center gap-2.5 bg-[#171D26] border border-[#232B36] rounded-full py-1 px-3">
                            <div className="w-7 h-7 rounded-full bg-[#14B8A6] text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-[#14B8A6]/30">
                                {user?.username ? user.username.slice(0, 2).toUpperCase() : 'FL'}
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[11px] font-semibold text-[#F5F7FA] leading-none">
                                    {user?.username || 'Flappy'}
                                </span>
                                <div className="flex items-center gap-1 mt-0.5">
                                    <Wallet className="w-3 h-3 text-[#14B8A6]" />
                                    <span className="text-[11px] font-bold text-[#F5F7FA] leading-none">₱{user?.balance ?? '0.00'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-[#1B222C] hover:bg-[#232B36] text-[#F5F7FA] border border-[#2E3844] hover:border-[#14B8A6] text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                    >
                        <LogIn className="w-3.5 h-3.5 text-[#14B8A6]" />
                        Sign in
                    </button>
                )}
            </div>
        </header>
    );
};

export default Navbar;
