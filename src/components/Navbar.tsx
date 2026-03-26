"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Battery, MapPin, Calendar, Clock, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Find Stations', href: '/stations', icon: MapPin },
        { name: 'My Bookings', href: '/bookings', icon: Calendar },
        { name: 'Dashboard', href: '/dashboard', icon: Clock },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="p-2 bg-emerald-600 rounded-lg group-hover:bg-emerald-500 transition-colors">
                                <Battery className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                                EcoCharge
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                className="text-gray-600 hover:text-emerald-600 font-medium transition-colors flex items-center space-x-1"
                            >
                                <link.icon className="w-4 h-4" />
                                <span>{link.name}</span>
                            </Link>
                        ))}
                        
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link href="/profile" className="flex items-center space-x-2 p-1 pl-3 bg-gray-50 rounded-full border border-gray-100 hover:border-emerald-200 transition-colors">
                                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <User className="w-4 h-4 text-emerald-600" />
                                    </div>
                                </Link>
                                <button 
                                    onClick={logout}
                                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
                                    Sign In
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 font-medium p-2"
                                >
                                    <link.icon className="w-5 h-5" />
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                            <hr className="border-gray-100" />
                            {user ? (
                                <button 
                                    onClick={logout}
                                    className="flex items-center space-x-3 text-red-500 font-medium p-2 w-full"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <div className="space-y-4 pt-2">
                                    <Link 
                                        href="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-center w-full py-3 text-gray-600 font-medium"
                                    >
                                        Log In
                                    </Link>
                                    <Link 
                                        href="/register"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-center w-full py-3 bg-emerald-600 text-white rounded-xl font-medium"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
