import React, { createContext, useContext, useState } from 'react';
import { useUserQuery, useLoginMutation, useRegisterMutation, useLogoutMutation } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const { data: user, isLoading: isUserLoading, refetch: refetchUser } = useUserQuery();
    const loginMutation = useLoginMutation();
    const registerMutation = useRegisterMutation();
    const logoutMutation = useLogoutMutation();

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isUserLoading,
                loginMutation,
                registerMutation,
                logoutMutation,
                refetchUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
