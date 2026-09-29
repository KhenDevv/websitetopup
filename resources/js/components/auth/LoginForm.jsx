import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from './AuthCard';

const LoginForm = () => {
    const { loginMutation } = useAuth();
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!login || !password) {
            setErrorMessage('Please enter your username/email and password.');
            return;
        }

        loginMutation.mutate(
            { login, password },
            {
                onSuccess: () => {
                    navigate('/dashboard');
                },
                onError: (error) => {
                    const msg =
                        error.response?.data?.errors?.login?.[0] ||
                        error.response?.data?.message ||
                        'Failed to log in. Please check your credentials.';
                    setErrorMessage(msg);
                },
            }
        );
    };

    return (
        <AuthCard subtitle="Sign in to level up your game.">
            {errorMessage && (
                <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium text-center">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username or Email */}
                <div>
                    <label className="block text-xs font-semibold text-[#98a2b3] mb-1.5">
                        Username or Email
                    </label>
                    <div className="relative flex items-center">
                        <User className="absolute left-3.5 w-4 h-4 text-[#667085]" />
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full bg-[#222630] border border-[#333947] focus:border-[#00f2c3] text-white text-sm rounded-xl pl-10 pr-4 py-3 placeholder-[#667085] outline-none transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-semibold text-[#98a2b3]">
                            Password
                        </label>
                        <Link
                            className="text-xs font-medium text-[#98a2b3] hover:text-[#00f2c3] transition-colors"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="relative flex items-center">
                        <Lock className="absolute left-3.5 w-4 h-4 text-[#667085]" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-[#222630] border border-[#333947] focus:border-[#00f2c3] text-white text-sm rounded-xl pl-10 pr-10 py-3 placeholder-[#667085] outline-none transition-all duration-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 text-[#667085] hover:text-white transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full bg-[#00f2c3] hover:bg-[#00d8ad] active:scale-[0.99] text-[#0a0c10] font-bold text-sm rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 shadow-lg shadow-[#00f2c3]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
                >
                    {loginMutation.isPending ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        <>
                            Log In <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </>
                    )}
                </button>
            </form>

            {/* Toggle Footer */}
            <div className="mt-8 text-center text-xs text-[#98a2b3]">
                Don't have an account?{' '}
                <Link
                    to="/register"
                    className="font-bold text-white hover:text-[#00f2c3] transition-colors ml-1 cursor-pointer"
                >
                    Sign up
                </Link>
            </div>
        </AuthCard>
    );
};

export default LoginForm;
