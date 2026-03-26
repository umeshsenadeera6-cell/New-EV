"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Battery, Zap, Shield, Smartphone, ArrowRight, Star, MapPin } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-emerald-50/50 rounded-l-[100px] transform translate-x-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-emerald-700 uppercase bg-emerald-100 rounded-full">
                The Future of Charging
              </span>
              <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                Powering your <span className="gradient-text">Sustainable</span> Journey.
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                EcoCharge is the smartest way to find, book, and pay for electric vehicle charging. Join thousands of drivers making the switch to clean energy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/stations" 
                  className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center group"
                >
                  Find Stations
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/register" 
                  className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 rounded-2xl font-bold text-lg hover:border-emerald-200 transition-all flex items-center justify-center"
                >
                  Get Started
                </Link>
              </div>
              
              <div className="mt-12 flex items-center space-x-6">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-amber-400">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Trusted by 10,000+ EV drivers</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 p-4 bg-white/40 backdrop-blur-xl rounded-[40px] border border-white/50 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800" 
                  alt="EV Charging Station"
                  className="rounded-[32px] w-full object-cover aspect-[4/5]"
                />
                
                {/* Floating Stats */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -right-6 top-1/4 bg-white p-4 rounded-2xl shadow-xl card-shadow border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Zap className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Fast Charging</p>
                      <p className="text-lg font-extrabold text-gray-900">Up to 350kW</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute -left-6 bottom-1/4 bg-white p-4 rounded-2xl shadow-xl card-shadow border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Nearby Stations</p>
                      <p className="text-lg font-extrabold text-gray-900">2,500+ Active</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-200/30 rounded-full blur-[80px] -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-200/30 rounded-full blur-[80px] -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Why choose EcoCharge?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">We provide a seamless experience from finding a station to completing your charge.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: MapPin, 
                title: "Smart Finder", 
                desc: "Real-time availability tracking of stations near you with precise location markers.",
                color: "emerald"
              },
              { 
                icon: Shield, 
                title: "Secure Payments", 
                desc: "Hassle-free, secure transactions through your favorite payment methods.",
                color: "blue"
              },
              { 
                icon: Smartphone, 
                title: "Track Anywhere", 
                desc: "Monitor your charging progress, session history and costs right from your phone.",
                color: "teal"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm transition-all hover:shadow-xl group"
              >
                <div className={`w-14 h-14 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-emerald-900 rounded-[50px] py-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/50 rounded-full -mr-32 -mt-32 blur-[40px]"></div>
            <div className="relative z-10 grid md:grid-cols-3 gap-12">
                <div>
                    <h4 className="text-5xl font-extrabold mb-2">99.9%</h4>
                    <p className="text-emerald-300 font-medium">Uptime Guaranteed</p>
                </div>
                <div>
                    <h4 className="text-5xl font-extrabold mb-2">500k+</h4>
                    <p className="text-emerald-300 font-medium">Charging Sessions</p>
                </div>
                <div>
                    <h4 className="text-5xl font-extrabold mb-2">$2M+</h4>
                    <p className="text-emerald-300 font-medium">Energy Saved</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
