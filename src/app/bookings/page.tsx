"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Clock, MapPin, Zap, ChevronRight, AlertCircle, Loader2, Battery, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Link from 'next/link';

import { Station, Booking } from '@/types';

export default function BookingsPage() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`/api/bookings/user/${user?.id}`);
            setBookings(response.data);
        } catch (error) {
            toast.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyles = (status: Booking['status']) => {
        switch (status) {
            case 'Confirmed': return 'bg-blue-100 text-blue-700';
            case 'Ongoing': return 'bg-emerald-100 text-emerald-700 animate-pulse';
            case 'Completed': return 'bg-gray-100 text-gray-600';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            
            <main className="flex-1 pt-32 pb-20 px-4 max-w-5xl mx-auto w-full">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Bookings</h1>
                        <p className="text-gray-500">Track your charging history and upcoming sessions</p>
                    </div>
                </div>

                {!user ? (
                    <div className="bg-white p-12 rounded-[40px] text-center shadow-sm border border-gray-100">
                        <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please login to see your bookings</h2>
                        <Link href="/login" className="inline-block px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all">
                            Login Now
                        </Link>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="bg-white p-12 rounded-[40px] text-center shadow-sm border border-gray-100">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No bookings yet</h2>
                        <p className="text-gray-500 mb-8">Ready to hit the road? Find a station and book your first slot.</p>
                        <Link href="/stations" className="inline-block px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all">
                            Find Stations
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {bookings.map((booking, i) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-lg transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-100 transition-colors"></div>
                                
                                <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusStyles(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                            <span className="text-gray-300">•</span>
                                            <span className="text-sm text-gray-500 font-medium">#{booking._id.slice(-6).toUpperCase()}</span>
                                        </div>
                                        
                                        <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                                            {booking.stationId?.name || 'Unknown Station'}
                                        </h3>
                                        <p className="text-gray-500 flex items-center mb-6">
                                            <MapPin className="w-4 h-4 mr-1.5" />
                                            {booking.stationId?.address}
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                                                <Calendar className="w-5 h-5 text-emerald-600" />
                                                <div>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Date</p>
                                                    <p className="text-sm font-bold text-gray-700">
                                                        {new Date(booking.startTime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                                                <Clock className="w-5 h-5 text-emerald-600" />
                                                <div>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Time</p>
                                                    <p className="text-sm font-bold text-gray-700">
                                                        {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:w-64 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8 flex flex-col justify-between">
                                        {booking.status === 'Ongoing' ? (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <p className="text-[10px] text-gray-500 font-bold uppercase">Charging</p>
                                                        <p className="text-3xl font-black text-gray-900">74%</p>
                                                    </div>
                                                    <Battery className="w-8 h-8 text-emerald-500" />
                                                </div>
                                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: '74%' }}
                                                        className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-500 font-medium">12 mins remaining</p>
                                            </div>
                                        ) : (
                                            <div className="text-center md:text-right">
                                                <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Total Paid</p>
                                                <p className="text-4xl font-black text-gray-900">${booking.totalCost || '12.50'}</p>
                                                <div className="flex items-center justify-end gap-1 mt-2 text-emerald-600 font-bold text-xs uppercase">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Payment Success
                                                </div>
                                            </div>
                                        )}
                                        
                                        <button className="mt-8 w-full py-3 bg-gray-50 text-gray-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 hover:text-emerald-700 transition-all group/btn">
                                            View Receipt
                                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
