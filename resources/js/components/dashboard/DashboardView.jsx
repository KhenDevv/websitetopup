import React from 'react';
import { Database, LogOut, User, CheckCircle2, AlertCircle, ShieldCheck, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDbCheckQuery } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

const DashboardView = () => {
    const { user, logoutMutation } = useAuth();
    const { data: dbCheck, isLoading: isDbLoading, refetch: refetchDb } = useDbCheckQuery();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => navigate('/login')
        });
    };

    return (
        <div className="w-full max-w-2xl bg-[#181b20] border border-[#2a2e37] rounded-2xl p-8 shadow-2xl shadow-black/60">
            {/* Header */}
            <div className="flex justify-between items-center pb-6 mb-6 border-b border-[#2a2e37]">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#00f2c3]/10 border border-[#00f2c3]/30 flex items-center justify-center text-[#00f2c3]">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-wide">
                            Welcome, {user?.username || user?.name}!
                        </h2>
                        <p className="text-xs text-[#98a2b3] font-medium">{user?.email}</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="bg-[#222630] hover:bg-red-500/20 text-[#98a2b3] hover:text-red-400 border border-[#333947] hover:border-red-500/30 font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                >
                    <LogOut className="w-4 h-4" />
                    Log Out
                </button>
            </div>

            {/* Database Status Card */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-[#00f2c3]" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                            Local PostgreSQL Status
                        </h3>
                    </div>
                    <button
                        onClick={() => refetchDb()}
                        disabled={isDbLoading}
                        className="text-xs text-[#98a2b3] hover:text-[#00f2c3] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${isDbLoading ? 'animate-spin' : ''}`} />
                        Refresh Status
                    </button>
                </div>

                {isDbLoading ? (
                    <div className="p-5 rounded-xl bg-[#222630] border border-[#333947] flex items-center gap-3 text-sm text-[#98a2b3]">
                        <RefreshCw className="w-5 h-5 animate-spin text-[#00f2c3]" />
                        Testing PostgreSQL database connection...
                    </div>
                ) : dbCheck?.status === 'connected' ? (
                    <div className="p-5 rounded-xl bg-[#00f2c3]/10 border border-[#00f2c3]/30 space-y-3">
                        <div className="flex items-center gap-2 text-[#00f2c3] font-bold text-sm">
                            <CheckCircle2 className="w-5 h-5" />
                            Connected to Database Successfully!
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs text-[#98a2b3] pt-2 border-t border-[#00f2c3]/20">
                            <div>
                                <span className="block text-white/50 mb-0.5">Database Name</span>
                                <span className="font-mono text-white font-semibold">{dbCheck.database}</span>
                            </div>
                            <div>
                                <span className="block text-white/50 mb-0.5">Driver</span>
                                <span className="font-mono text-white font-semibold uppercase">{dbCheck.driver}</span>
                            </div>
                            <div>
                                <span className="block text-white/50 mb-0.5">Total Registered Users</span>
                                <span className="font-mono text-[#00f2c3] font-semibold">{dbCheck.user_count}</span>
                            </div>
                            <div>
                                <span className="block text-white/50 mb-0.5">Sanctum Protection</span>
                                <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
                                    <ShieldCheck className="w-3.5 h-3.5" /> Active
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 space-y-2 text-xs">
                        <div className="flex items-center gap-2 font-bold text-sm text-red-400">
                            <AlertCircle className="w-5 h-5" />
                            Database Connection Failed
                        </div>
                        <p>{dbCheck?.error || 'Unable to communicate with PostgreSQL server.'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardView;
