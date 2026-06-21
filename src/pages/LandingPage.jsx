import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ParkingCircle, MapPin, Clock, Shield, Zap, Smartphone, ChevronRight, Star } from 'lucide-react';

const features = [
  { icon: MapPin, title: 'Real-Time Availability', desc: 'Live slot tracking across all floors with instant updates.', color: 'text-blue-400 bg-blue-400/10' },
  { icon: Clock, title: 'Instant Reservation', desc: 'Reserve your spot seconds before you arrive.', color: 'text-green-400 bg-green-400/10' },
  { icon: Zap, title: 'Smart Navigation', desc: 'AI-powered routing to your reserved slot.', color: 'text-yellow-400 bg-yellow-400/10' },
  { icon: Shield, title: 'Secure Payments', desc: 'End-to-end encrypted transactions via UPI and cards.', color: 'text-purple-400 bg-purple-400/10' },
  { icon: Smartphone, title: 'Mobile-First', desc: 'Access from any device, anywhere, anytime.', color: 'text-pink-400 bg-pink-400/10' },
  { icon: Star, title: 'Smart Analytics', desc: 'Track your parking history and spending insights.', color: 'text-orange-400 bg-orange-400/10' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center">
              <ParkingCircle size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-gray-900">SmartPark</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">Sign In</button>
            <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-purple-600/25">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/15 border border-purple-500/30 text-purple-600 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live: 247 slots available across 3 locations
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 text-gray-900">
            Find, Reserve,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400">and Park Smarter.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            India's first AI-powered smart parking platform. Save time, reduce stress, and never circle for a spot again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/login')} className="flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-semibold text-lg transition-all shadow-xl shadow-purple-600/30 hover:scale-[1.02]">
              Reserve a Slot <ChevronRight size={20} />
            </button>
            <button onClick={() => navigate('/login')} className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-2xl font-semibold text-lg transition-all border border-gray-300">
              View Live Map
            </button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[['3,200+', 'Parking Slots'], ['98%', 'Uptime'], ['50K+', 'Happy Drivers']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="font-display text-3xl font-bold text-gray-900">{val}</div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parking illustration */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="card rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white" />
            <div className="relative z-10 text-center mb-6">
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">Live Parking Grid Preview</h3>
              <p className="text-gray-600 text-sm">Real-time slot availability at SmartPark Central</p>
            </div>
            <div className="relative z-10 grid grid-cols-10 gap-2 max-w-xl mx-auto">
              {Array.from({ length: 30 }).map((_, i) => {
                const states = ['available', 'occupied', 'reserved'];
                const weights = [0.45, 0.35, 0.2];
                const rand = Math.random();
                const state = rand < 0.45 ? 'available' : rand < 0.8 ? 'occupied' : 'reserved';
                return (
                  <div key={i} className={`h-10 rounded-md flex items-center justify-center text-xs font-bold slot-btn ${
                    state === 'available' ? 'slot-available' : state === 'occupied' ? 'slot-occupied' : 'slot-reserved'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                );
              })}
            </div>
            <div className="relative z-10 flex justify-center gap-6 mt-6 text-xs text-gray-600">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-500/20 border border-green-500 inline-block" />Available</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-500/20 border border-red-500 inline-block" />Occupied</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-yellow-500/20 border border-yellow-500 inline-block" />Reserved</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Everything you need to park smart</h2>
            <p className="text-gray-600 text-lg">Designed for the modern urban driver.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card p-6 rounded-2xl hover:border-gray-300/50 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} mb-4`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 py-10 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center">
              <ParkingCircle size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-gray-900">SmartPark</span>
            <span className="text-gray-500 text-sm ml-2">© 2025 All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
