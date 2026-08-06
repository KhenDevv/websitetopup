import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './axios';

// Login mutation
export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (credentials) => {
            const response = await api.post('/login', credentials);
            return response.data;
        },
        onSuccess: (data) => {
            if (data.token) {
                localStorage.setItem('auth_token', data.token);
            }
            queryClient.setQueryData(['user'], data.user);
            queryClient.invalidateQueries({ queryKey: ['dbCheck'] });
        },
    });
};

// Register mutation
export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userData) => {
            const response = await api.post('/register', userData);
            return response.data;
        },
        onSuccess: (data) => {
            if (data.token) {
                localStorage.setItem('auth_token', data.token);
            }
            queryClient.setQueryData(['user'], data.user);
            queryClient.invalidateQueries({ queryKey: ['dbCheck'] });
        },
    });
};

// Logout mutation
export const useLogoutMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const response = await api.post('/logout');
            return response.data;
        },
        onSettled: () => {
            localStorage.removeItem('auth_token');
            queryClient.setQueryData(['user'], null);
            queryClient.invalidateQueries({ queryKey: ['dbCheck'] });
        },
    });
};

// Fetch current user
export const useUserQuery = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const token = localStorage.getItem('auth_token');
            if (!token) return null;
            try {
                const response = await api.get('/user');
                return response.data.user;
            } catch (err) {
                localStorage.removeItem('auth_token');
                return null;
            }
        },
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
};

// Database check query
export const useDbCheckQuery = () => {
    return useQuery({
        queryKey: ['dbCheck'],
        queryFn: async () => {
            const response = await api.get('/db-check');
            return response.data;
        },
        refetchInterval: 10000,
    });
};
