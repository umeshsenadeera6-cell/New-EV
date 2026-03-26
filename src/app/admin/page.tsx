"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Plus, Edit, Trash2, TrendingUp, Users, Zap, DollarSign, Loader2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
    const { user } = useAuth();
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalRevenue: 2450.50,
        totalSessions: 142,
        activeUsers: 89,
        avgPricing: 0.32
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/stations');
            setStations(response.data);
        } catch (error) {
            toast.error('Failed to load admin data');
        } finally {
            setLoading(false);
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
            
            <main className="flex-1 pt-32 pb-20 px-4 max-w-7xl mx-auto w-full">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Admin Dashboard</h1>
                        <p className="text-gray-500">Manage your charging network and track performance</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100">
                        <Plus className="w-5 h-5" />
                        Add New Station
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Revenue', value: `$${stats.totalRevenue}`, icon: DollarSign, color: 'emerald' },
                        { label: 'Total Sessions', value: stats.totalSessions, icon: Zap, color: 'blue' },
                        { label: 'Active Users', value: stats.activeUsers, icon: Users, color: 'purple' },
                        { label: 'Avg. Pricing', value: `$${stats.avgPricing}/kWh`, icon: TrendingUp, color: 'amber' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className={`p-4 bg-${stat.color}-100 rounded-2xl`}>
                                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">{stat.label}</p>
                                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stations Table */}
                <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-50">
                        <h2 className="text-2xl font-bold text-gray-900">Manage Stations</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Station Details</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Pricing</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {stations.map((station) => (
                                    <tr key={station._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-emerald-100 rounded-xl">
                                                    <MapPin className="w-5 h-5 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{station.name}</p>
                                                    <p className="text-xs text-gray-500">{station.address}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                                                station.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                {station.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="font-black text-emerald-600">${station.pricePerKwh}/kWh</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
