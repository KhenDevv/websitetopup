import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from './AuthCard';

const RegisterForm = () => {
    const { registerMutation } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!username || !email || !password || !passwordConfirmation) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        if (password !== passwordConfirmation) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            return;
        }

        registerMutation.mutate(
            {
                username,
                email,
                password,
                password_confirmation: passwordConfirmation,
            },
            {
                onSuccess: () => {
                    navigate('/dashboard');
                },
                onError: (error) => {
                    const errors = error.response?.data?.errors;
                    if (errors) {
                        const firstKey = Object.keys(errors)[0];
                        setErrorMessage(errors[firstKey][0]);
                    } else {
                        setErrorMessage(
                            error.response?.data?.message || 'Registration failed. Please try again.'
                        );
                    }
                },
            }
        );
    };

    return (
        <AuthCard subtitle="Create your account to start leveling up.">
            {errorMessage && (
                <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium text-center">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div>
                    <label className="block text-xs font-semibold text-[#98a2b3] mb-1.5">
                        Username
                    </label>
                    <div className="relative flex items-center">
                        <User className="absolute left-3.5 w-4 h-4 text-[#667085]" />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full bg-[#222630] border border-[#333947] focus:border-[#00f2c3] text-white text-sm rounded-xl pl-10 pr-4 py-3 placeholder-[#667085] outline-none transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-xs font-semibold text-[#98a2b3] mb-1.5">
                        Email
                    </label>
                    <div className="relative flex items-center">
                        <Mail className="absolute left-3.5 w-4 h-4 text-[#667085]" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full bg-[#222630] border border-[#333947] focus:border-[#00f2c3] text-white text-sm rounded-xl pl-10 pr-4 py-3 placeholder-[#667085] outline-none transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-xs font-semibold text-[#98a2b3] mb-1.5">
                        Password
                    </label>
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

                {/* Confirm Password */}
                <div>
                    <label className="block text-xs font-semibold text-[#98a2b3] mb-1.5">
                        Confirm Password
                    </label>
                    <div className="relative flex items-center">
                        <Lock className="absolute left-3.5 w-4 h-4 text-[#667085]" />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-[#222630] border border-[#333947] focus:border-[#00f2c3] text-white text-sm rounded-xl pl-10 pr-10 py-3 placeholder-[#667085] outline-none transition-all duration-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3.5 text-[#667085] hover:text-white transition-colors"
                        >
                            {showConfirmPassword ? (
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
                    disabled={registerMutation.isPending}
                    className="w-full bg-[#00f2c3] hover:bg-[#00d8ad] active:scale-[0.99] text-[#0a0c10] font-bold text-sm rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 shadow-lg shadow-[#00f2c3]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-3 cursor-pointer"
                >
                    {registerMutation.isPending ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Creating Account...
                        </>
                    ) : (
                        <>
                            Sign Up <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </>
                    )}
                </button>
            </form>

            {/* Toggle Footer */}
            <div className="mt-6 text-center text-xs text-[#98a2b3]">
                Already have an account?{' '}
                <Link
                    to="/login"
                    className="font-bold text-white hover:text-[#00f2c3] transition-colors ml-1 cursor-pointer"
                >
                    Log in
                </Link>
            </div>
        </AuthCard>
    );
};

export default RegisterForm;
