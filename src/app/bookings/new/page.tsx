"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Clock, Calendar, Zap, CreditCard, ChevronRight, CheckCircle2, Loader2, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

import { Station } from '@/types';

import { Suspense } from 'react';

function BookingForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useAuth();
    const stationId = searchParams.get('station');
    
    const [station, setStation] = useState<Station | null>(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [duration, setDuration] = useState(30); // minutes

    useEffect(() => {
        if (stationId) {
            fetchStation();
        } else {
            router.push('/stations');
        }
    }, [stationId]);

    const fetchStation = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/stations/${stationId}`);
            setStation(response.data);
        } catch (error) {
            toast.error('Station not found');
            router.push('/stations');
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async () => {
        if (!user) {
            toast.error('Please login to book');
            return router.push('/login');
        }

        setBookingLoading(true);
        try {
            if (!selectedTime || !station || !user) return;

            const startTime = new Date();
            const [hours, minutes] = selectedTime.split(':');
            startTime.setHours(parseInt(hours));
            startTime.setMinutes(parseInt(minutes));
            
            const endTime = new Date(startTime.getTime() + duration * 60000);

            await axios.post('http://localhost:5001/api/bookings', {
                userId: user.id,
                stationId: station._id,
                startTime,
                endTime
            });

            setStep(3); // Success step
            toast.success('Booking confirmed!');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Booking failed');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        </div>
    );

    const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    return (
        <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
            {/* Stepper */}
            <div className="flex items-center justify-center mb-12">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                            step >= s ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                            {s < step ? <CheckCircle2 className="w-6 h-6" /> : s}
                        </div>
                        {s < 3 && <div className={`w-20 h-1 transition-all ${step > s ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100"
                    >
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Select Time & Duration</h2>
                        
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Available Slots</label>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                {timeSlots.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-3 rounded-2xl font-bold transition-all ${
                                            selectedTime === time 
                                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Duration</label>
                            <div className="flex gap-4">
                                {[30, 60, 90, 120].map(m => (
                                    <button
                                        key={m}
                                        onClick={() => setDuration(m)}
                                        className={`flex-1 py-4 rounded-2xl font-bold transition-all ${
                                            duration === m 
                                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        {m} min
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            disabled={!selectedTime}
                            onClick={() => setStep(2)}
                            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all disabled:opacity-50"
                        >
                            Continue to Summary
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100"
                    >
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Booking Summary</h2>
                        
                        <div className="space-y-6 mb-10">
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                                <div className="p-3 bg-white rounded-xl shadow-sm">
                                    <MapPin className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Station</p>
                                    <p className="font-bold text-gray-900">{station?.name}</p>
                                    <p className="text-sm text-gray-600">{station?.address}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Time</p>
                                    <div className="flex items-center gap-2 font-bold text-gray-900">
                                        <Clock className="w-4 h-4 text-emerald-600" />
                                        {selectedTime}
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Duration</p>
                                    <div className="flex items-center gap-2 font-bold text-gray-900">
                                        <Calendar className="w-4 h-4 text-emerald-600" />
                                        {duration} minutes
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-emerald-900 text-white rounded-[32px] relative overflow-hidden">
                                <Zap className="absolute top-2 right-2 w-24 h-24 text-emerald-800/50 -rotate-12" />
                                <div className="relative z-10 flex justify-between items-center">
                                    <div>
                                        <p className="text-emerald-300 text-sm font-bold uppercase">Estimated Cost</p>
                                        <p className="text-4xl font-black">${(station ? (station.pricePerKwh * (duration/10)).toFixed(2) : '0.00')}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-emerald-300 text-xs">Based on</p>
                                        <p className="font-bold">${station?.pricePerKwh}/kWh</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 py-4 bg-gray-100 text-gray-900 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleBooking}
                                disabled={bookingLoading}
                                className="flex-[2] py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
                            >
                                {bookingLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        Confirm & Pay
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 text-center"
                    >
                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-4">Booking Successful!</h2>
                        <p className="text-gray-600 mb-10 text-lg">
                            Your slot at <span className="font-bold text-gray-900">{station?.name}</span> has been confirmed. A confirmation email has been sent to your inbox.
                        </p>
                        
                        <div className="space-y-4">
                            <button
                                onClick={() => router.push('/bookings')}
                                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
                            >
                                View My Bookings
                            </button>
                            <button
                                onClick={() => router.push('/stations')}
                                className="w-full py-4 bg-white text-gray-900 border-2 border-gray-100 rounded-2xl font-bold hover:border-emerald-200 transition-all"
                            >
                                Back to Home
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

export default function NewBookingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                </div>
            }>
                <BookingForm />
            </Suspense>
        </div>
    );
}
