import React from 'react';
import { LayoutDashboard, Settings, CreditCard, History, ArrowUpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeTab = 'Dashboard', setActiveTab }) => {
    const { user, logoutMutation } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => navigate('/'),
            onError: () => navigate('/') // fallback if mock
        });
    };

    const mainMenuItems = [
        { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'Settings', label: 'Settings', icon: Settings },
        { id: 'Credits', label: 'Credits', icon: CreditCard },
    ];

    const historyMenuItems = [
        { id: 'Transaction', label: 'Transaction', icon: History },
        { id: 'Top Up', label: 'Top Up', icon: ArrowUpCircle },
    ];

    return (
        <>
            {/* Desktop Sidebar (240px width) */}
            <aside className="hidden md:flex flex-col w-[240px] bg-[#0D1218] border-r border-[#232B36] p-4 min-h-[calc(100vh-64px)] shrink-0 select-none">
                {/* User Block */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#141A22] border border-[#232B36] mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#14B8A6] text-white flex items-center justify-center font-bold text-sm shadow-md">
                        {user?.username ? user.username.slice(0, 2).toUpperCase() : 'FL'}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-[15px] font-semibold text-[#F5F7FA] truncate">
                            {user?.username || 'Flappy'}
                        </span>
                        <span className="text-[11px] text-[#9AA5B1] font-medium">Member</span>
                    </div>
                </div>

                {/* Main Menu Section */}
                <div className="mb-6">
                    <div className="text-[11px] font-medium text-[#6B7684] uppercase tracking-[0.08em] px-3 mb-2">
                        MAIN MENU
                    </div>
                    <div className="space-y-1">
                        {mainMenuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab && setActiveTab(item.id)}
                                    className={`w-full h-[40px] px-3 rounded-[10px] flex items-center gap-3 text-xs font-semibold transition-all cursor-pointer ${
                                        isActive
                                            ? 'bg-[#171D26] text-[#F5F7FA] border-l-4 border-[#14B8A6]'
                                            : 'text-[#9AA5B1] hover:text-[#F5F7FA] hover:bg-[#141A22]'
                                    }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#14B8A6]' : 'text-[#9AA5B1]'}`} />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* History Section */}
                <div className="mb-6">
                    <div className="text-[11px] font-medium text-[#6B7684] uppercase tracking-[0.08em] px-3 mb-2">
                        HISTORY
                    </div>
                    <div className="space-y-1">
                        {historyMenuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab && setActiveTab(item.id)}
                                    className={`w-full h-[40px] px-3 rounded-[10px] flex items-center gap-3 text-xs font-semibold transition-all cursor-pointer ${
                                        isActive
                                            ? 'bg-[#171D26] text-[#F5F7FA] border-l-4 border-[#14B8A6]'
                                            : 'text-[#9AA5B1] hover:text-[#F5F7FA] hover:bg-[#141A22]'
                                    }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#14B8A6]' : 'text-[#9AA5B1]'}`} />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Logout Button at bottom */}
                <div className="mt-auto pt-4 border-t border-[#232B36]">
                    <button
                        onClick={handleLogout}
                        disabled={logoutMutation?.isPending}
                        className="w-full h-[40px] px-3 rounded-[10px] flex items-center gap-3 text-xs font-semibold text-[#F43F5E] hover:bg-[#3A1220]/50 transition-colors cursor-pointer"
                    >
                        <LogOut className="w-4 h-4 text-[#F43F5E]" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Bottom Navigation Bar (under 768px) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-[#0D1218] border-t border-[#232B36] z-50 flex items-center justify-around px-2">
                {[...mainMenuItems, ...historyMenuItems].slice(0, 4).map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab && setActiveTab(item.id)}
                            className={`flex flex-col items-center justify-center gap-1 text-[10px] font-medium py-1 px-3 rounded-lg transition-all ${
                                isActive ? 'text-[#14B8A6]' : 'text-[#9AA5B1]'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
                <button
                    onClick={handleLogout}
                    className="flex flex-col items-center justify-center gap-1 text-[10px] font-medium text-[#F43F5E] py-1 px-3 rounded-lg"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </nav>
        </>
    );
};

export default Sidebar;
