"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<User> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
            const { token, user: userData } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(userData);
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const register = async (name: string, email: string, password: string): Promise<User> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/register`, { name, email, password });
            const { token, user: userData } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(userData);
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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
