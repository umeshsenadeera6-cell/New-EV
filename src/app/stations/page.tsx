"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';
import { Search, Filter, MapPin, Zap, Clock, Star, ArrowRight, Loader2, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Link from 'next/link';


// Dynamically import Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), { 
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-3xl flex items-center justify-center text-gray-400">Loading Map...</div>
});

import { Station } from '@/types';

export default function StationsPage() {
    const [stations, setStations] = useState<Station[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const [mapCenter, setMapCenter] = useState<[number, number]>([6.9271, 79.8612]); // Colombo

    useEffect(() => {
        fetchStations();
    }, []);

    const fetchStations = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/stations');
            setStations(response.data);
        } catch (error) {
            toast.error('Failed to load stations');
        } finally {
            setLoading(false);
        }
    };

    const handleStationSelect = (station: Station) => {
        setSelectedStation(station);
        setMapCenter([station.location.coordinates[1], station.location.coordinates[0]]);
    };

    const filteredStations = stations.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            
            <main className="flex-1 pt-20 pb-6 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full">
                {/* Sidebar */}
                <div className="w-full lg:w-96 flex flex-col gap-4">
                    <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input 
                                type="text"
                                placeholder="Search stations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                            {['All', 'Available', 'Type 2', 'CCS', 'Fast Charge'].map(f => (
                                <button key={f} className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-700 transition-colors">
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[calc(100vh-320px)] lg:max-h-none">
                        {loading ? (
                            [1,2,3].map(i => (
                                <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 animate-pulse h-32"></div>
                            ))
                        ) : filteredStations.length > 0 ? (
                            filteredStations.map(station => (
                                <motion.div
                                    key={station._id}
                                    layoutId={station._id}
                                    onClick={() => handleStationSelect(station)}
                                    className={`p-4 rounded-[24px] border transition-all cursor-pointer group ${
                                        selectedStation?._id === station._id 
                                        ? 'bg-emerald-50 border-emerald-200 shadow-md shadow-emerald-100' 
                                        : 'bg-white border-gray-100 hover:border-emerald-100 hover:shadow-lg hover:shadow-gray-100'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-900 group-hover:text-emerald-700">{station.name}</h3>
                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                                            station.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {station.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 flex items-center mb-3">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {station.address}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center space-x-2">
                                            {station.chargerTypes.map(type => (
                                                <span key={type} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-sm font-extrabold text-emerald-600">
                                            ${station.pricePerKwh}/kWh
                                        </p>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-400">
                                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-20" />
                                <p>No stations found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Map Area */}
                <div className="flex-1 flex flex-col gap-4 min-h-[400px]">
                    <div className="flex-1 relative z-0">
                        <Map 
                            stations={filteredStations} 
                            center={mapCenter} 
                            onMarkerClick={handleStationSelect} 
                        />
                        
                        {/* Quick Nav Button */}
                        <button className="absolute bottom-6 left-6 z-10 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 hover:bg-emerald-50 transition-colors">
                            <Navigation className="w-6 h-6 text-emerald-600" />
                        </button>
                    </div>

                    {/* Station Detail Panel */}
                    <AnimatePresence>
                        {selectedStation && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                className="bg-white p-6 rounded-[32px] shadow-2xl border border-emerald-100 flex flex-col md:flex-row gap-6 relative"
                            >
                                <button 
                                    onClick={() => setSelectedStation(null)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                                >
                                    <Clock className="w-5 h-5 rotate-45" /> {/* Close icon substitute if needed */}
                                </button>
                                
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="flex items-center text-amber-500 text-sm font-bold">
                                            <Star className="w-4 h-4 fill-current mr-1" />
                                            {selectedStation.rating || 4.5}
                                        </span>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-gray-500 text-sm">24 reviews</span>
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{selectedStation.name}</h2>
                                    <p className="text-gray-500 mb-4">{selectedStation.address}</p>
                                    
                                    <div className="flex flex-wrap gap-4 mt-4">
                                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl">
                                            <Zap className="w-4 h-4 text-emerald-600" />
                                            <span className="text-sm font-bold text-gray-700">150kW Fast</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl">
                                            <Clock className="w-4 h-4 text-blue-600" />
                                            <span className="text-sm font-bold text-gray-700">24/7 Access</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:w-64 flex flex-col justify-between items-center md:items-end gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                                    <div className="text-center md:text-right">
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Rate</p>
                                        <p className="text-3xl font-black text-gray-900">${selectedStation.pricePerKwh}<span className="text-sm font-medium text-gray-400">/kWh</span></p>
                                    </div>
                                    <Link 
                                        href={`/bookings/new?station=${selectedStation._id}`}
                                        className="w-full px-6 py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 group"
                                    >
                                        Book Slot
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
