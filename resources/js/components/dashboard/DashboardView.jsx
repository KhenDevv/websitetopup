import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import Footer from '../layout/Footer';
import { useAuth } from '../../context/AuthContext';
import {
    CheckCircle2,
    X,
    Settings,
    Phone,
    Gamepad2,
    ArrowUpRight,
} from 'lucide-react';

const DashboardView = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [showSuccessBanner, setShowSuccessBanner] = useState(false);

    // Default empty transaction history
    const recentTransactions = [];

    // Status pill renderer based on design.md
    const renderStatusBadge = (status) => {
        if (status === 'Success') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#0E3B2E] text-[#10B981] border border-[#10B981]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    Success
                </span>
            );
        }
        if (status === 'Failed') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#3A1220] text-[#F43F5E] border border-[#F43F5E]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E]" />
                    Failed
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#3A2A0E] text-[#F59E0B] border border-[#F59E0B]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                Pending
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-[#0B0F14] text-[#F5F7FA] flex flex-col font-sans">
            {/* Top Navbar */}
            <Navbar />

            {/* Layout Wrapper with Sidebar + Main Content */}
            <div className="flex-1 flex max-w-7xl w-full mx-auto">
                {/* 240px Sidebar */}
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Main Content Area */}
                <main className="flex-1 p-4 md:p-8 space-y-6 overflow-x-hidden pb-24 md:pb-8">
                    {/* Success / Status Banner (Dismissible) */}
                    {showSuccessBanner && (
                        <div className="relative rounded-xl p-4 bg-gradient-to-r from-[#0E3B2E] via-[#0F2E2A] to-[#0D9488]/30 border border-[#10B981]/30 flex items-center justify-between gap-4 shadow-lg shadow-[#10B981]/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm font-semibold text-[#E9FFF7]">
                                        Top-Up Successful! Your credits have been updated.
                                    </p>
                                    <p className="text-[11px] text-[#9AA5B1]">
                                        Transaction confirmed instantly.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowSuccessBanner(false)}
                                className="text-[#9AA5B1] hover:text-[#F5F7FA] p-1 rounded-lg transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Info Profile Section (Profile Card + Balance Card) */}
                    <section className="space-y-3">
                        <h1 className="text-xl md:text-2xl font-bold text-[#F5F7FA] tracking-tight">
                            Info Profile
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Profile Card (2 Cols on md) */}
                            <div className="md:col-span-2 relative overflow-hidden rounded-[16px] p-5 md:p-6 bg-gradient-to-br from-[#3B2A5C] via-[#141A22] to-[#141A22] border border-[#232B36] flex flex-col justify-between space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        {/* Avatar: 48px circle, flat --accent-teal fill, white bold initials */}
                                        <div className="w-12 h-12 rounded-full bg-[#14B8A6] text-white flex items-center justify-center font-bold text-lg shadow-md ring-4 ring-[#14B8A6]/20">
                                            {user?.username
                                                ? user.username.slice(0, 2).toUpperCase()
                                                : 'FL'}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-lg font-bold text-[#F5F7FA]">
                                                    Hello, {user?.username || 'Flappy'}
                                                </h2>
                                                {/* Member Tag */}
                                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/30">
                                                    Member
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-[#9AA5B1] mt-1">
                                                <Phone className="w-3.5 h-3.5" />
                                                <span>+63 912 345 6789</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Settings Gear Icon Button */}
                                    <button className="w-9 h-9 rounded-full bg-[#171D26] hover:bg-[#1B222C] text-[#9AA5B1] hover:text-[#F5F7FA] flex items-center justify-center transition-colors cursor-pointer border border-[#232B36]">
                                        <Settings className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="text-[11px] text-[#6B7684]">
                                    Account Status: <span className="text-[#10B981] font-semibold">Active & Verified</span>
                                </div>
                            </div>

                            {/* Balance Card (1 Col) */}
                            <div className="rounded-[16px] p-5 md:p-6 bg-[#141A22] border border-[#232B36] flex flex-col justify-between space-y-4">
                                <div>
                                    <span className="text-xs font-semibold text-[#9AA5B1] uppercase tracking-wider">
                                        Your Balance
                                    </span>
                                    <div className="text-3xl font-extrabold text-[#F5F7FA] mt-1 tracking-tight">
                                        ₱{user?.balance ?? '0.00'}
                                    </div>
                                </div>

                                {/* Bottom Decorative Teal Progress Bar */}
                                <div className="space-y-1.5">
                                    <div className="w-full bg-[#171D26] h-2 rounded-full overflow-hidden">
                                        <div className="bg-[#14B8A6] h-full w-[0%] rounded-full shadow-sm" />
                                    </div>
                                    <span className="text-[10px] text-[#6B7684] block text-right">
                                        Available Credits
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Stat Cards (Transaction Overview) */}
                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-[#F5F7FA]">
                            Transaction Overview
                        </h2>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { number: '0', label: 'Total Order' },
                                { number: '0', label: 'Pending' },
                                { number: '0', label: 'Processing' },
                                { number: '0', label: 'Success' },
                            ].map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-[12px] p-5 bg-[#0F2E2A] border border-[#14B8A6]/20 flex flex-col justify-between space-y-1 hover:border-[#14B8A6]/40 transition-colors"
                                >
                                    <div className="text-3xl font-extrabold text-[#F5F7FA] tracking-tight">
                                        {stat.number}
                                    </div>
                                    <div className="text-xs font-medium text-[#9AA5B1]">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Recent Transactions Table */}
                    <section className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-[#F5F7FA]">
                                Recent Transactions
                            </h2>
                            <a
                                href="#"
                                onClick={(e) => e.preventDefault()}
                                className="text-xs font-semibold text-[#14B8A6] hover:underline flex items-center gap-1"
                            >
                                View All <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        {/* Table Container */}
                        <div className="rounded-[16px] bg-[#141A22] border border-[#232B36] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#232B36] text-[11px] font-semibold text-[#6B7684] uppercase tracking-wider bg-[#171D26]/50">
                                            <th className="py-3.5 px-4 md:px-6">Game / Item</th>
                                            <th className="py-3.5 px-4 md:px-6">Amount</th>
                                            <th className="py-3.5 px-4 md:px-6">Date</th>
                                            <th className="py-3.5 px-4 md:px-6 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#232B36] text-xs">
                                        {recentTransactions.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="py-12 px-4 text-center">
                                                    <div className="flex flex-col items-center justify-center gap-2">
                                                        <div className="w-10 h-10 rounded-full bg-[#171D26] border border-[#232B36] flex items-center justify-center text-[#6B7684]">
                                                            <Gamepad2 className="w-5 h-5" />
                                                        </div>
                                                        <p className="text-xs font-semibold text-[#9AA5B1]">
                                                            No recent transactions found
                                                        </p>
                                                        <p className="text-[11px] text-[#6B7684]">
                                                            Your top-up history will appear here once you place an order.
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            recentTransactions.map((txn) => (
                                                <tr
                                                    key={txn.id}
                                                    className="hover:bg-[#1B222C] transition-colors"
                                                >
                                                    <td className="py-4 px-4 md:px-6 flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-lg bg-[#171D26] border border-[#232B36] flex items-center justify-center text-[#14B8A6] shrink-0">
                                                            <Gamepad2 className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-[#F5F7FA]">
                                                                {txn.game}
                                                            </div>
                                                            <div className="text-[11px] text-[#6B7684]">
                                                                {txn.item} • {txn.id}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 md:px-6 font-semibold text-[#F5F7FA]">
                                                        {txn.amount}
                                                    </td>
                                                    <td className="py-4 px-4 md:px-6 text-[#9AA5B1]">
                                                        {txn.date}
                                                    </td>
                                                    <td className="py-4 px-4 md:px-6 text-right">
                                                        {renderStatusBadge(txn.status)}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default DashboardView;
