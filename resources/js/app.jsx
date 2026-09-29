import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import DashboardView from './components/dashboard/DashboardView';
import LandingView from './components/landing/LandingView';
import { Loader2 } from 'lucide-react';
import '../css/app.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isUserLoading } = useAuth();
    
    if (isUserLoading) return null;
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

const AuthLayout = ({ children }) => {
    const { isAuthenticated, isUserLoading } = useAuth();
    const navigate = useNavigate();
    
    if (isUserLoading) return null;
    
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }
    
    return (
        <div className="relative min-h-screen">
            {/* Landing page displays first in background */}
            <LandingView />

            {/* Auth Modal Backdrop */}
            <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-all animate-in fade-in duration-200"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        navigate('/');
                    }
                }}
            >
                <div className="relative w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
};

const AppContent = () => {
    const { isUserLoading, isAuthenticated } = useAuth();

    if (isUserLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B0F14]">
                <div className="flex flex-col items-center gap-3 text-[#9AA5B1]">
                    <Loader2 className="w-8 h-8 animate-spin text-[#14B8A6]" />
                    <span className="text-xs font-semibold tracking-wide">Loading application...</span>
                </div>
            </div>
        );
    }

    return (
        <Routes>
            {/* Landing Page (Logged out state) */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingView />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<AuthLayout><LoginForm /></AuthLayout>} />
            <Route path="/register" element={<AuthLayout><RegisterForm /></AuthLayout>} />
            <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordForm /></AuthLayout>} />
            
            {/* Dashboard Page (Logged in state) */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <DashboardView />
                </ProtectedRoute>
            } />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
