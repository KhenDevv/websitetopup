import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import DashboardView from './components/dashboard/DashboardView';
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
    
    if (isUserLoading) return null; // Let the main app loader handle this
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

const AuthLayout = ({ children }) => {
    const { isAuthenticated, isUserLoading } = useAuth();
    
    if (isUserLoading) return null;
    
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }
    
    return children;
};

const AppContent = () => {
    const { isUserLoading } = useAuth();

    if (isUserLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f1115]">
                <div className="flex flex-col items-center gap-3 text-[#98a2b3]">
                    <Loader2 className="w-8 h-8 animate-spin text-[#00f2c3]" />
                    <span className="text-xs font-semibold tracking-wide">Loading application...</span>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-[#0f1115] relative overflow-hidden">
            {/* Background Glow Accents */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00f2c3]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 w-full flex justify-center">
                <Routes>
                    <Route path="/login" element={<AuthLayout><LoginForm /></AuthLayout>} />
                    <Route path="/register" element={<AuthLayout><RegisterForm /></AuthLayout>} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardView />
                        </ProtectedRoute>
                    } />
                    {/* Default redirect based on auth status */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </div>
        </main>
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
