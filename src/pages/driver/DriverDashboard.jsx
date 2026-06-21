import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ParkingCircle, CheckCircle, XCircle, Clock, MapPin, Plus, Search, Map, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { parkingLocations } from '../../data/mockData';
import StatCard from '../../components/common/StatCard';
import PageHeader from '../../components/common/PageHeader';
import ReservationCard from '../../components/driver/ReservationCard';
import OccupancyBar from '../../components/parking/OccupancyBar';

export default function DriverDashboard() {
  const { user, slots, reservations, notifications, unreadCount } = useApp();
  const navigate = useNavigate();

  const available = slots.filter(s => s.status === 'available').length;
  const occupied  = slots.filter(s => s.status === 'occupied').length;
  const reserved  = slots.filter(s => s.status === 'reserved').length;

  const recentRes   = reservations.slice(0, 3);
  const recentNotifs = notifications.filter(n => !n.read).slice(0, 3);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      <PageHeader
        title={`Good morning, ${user?.name?.split(' ')[0]} 👋`}
        subtitle="Here's your parking overview for today."
      >
        <button onClick={() => navigate('/reserve')}
          className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-purple-600/25">
          <Plus size={16} /> Reserve Parking
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Slots" value={slots.length} icon={ParkingCircle} color="text-purple-600"   bg="bg-purple-100"   />
        <StatCard label="Available"   value={available}    icon={CheckCircle}   color="text-green-600"  bg="bg-green-100"  trend="+2" />
        <StatCard label="Occupied"    value={occupied}     icon={XCircle}       color="text-red-600"    bg="bg-red-100"    />
        <StatCard label="Reserved"    value={reserved}     icon={Clock}         color="text-yellow-600" bg="bg-yellow-100" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Reserve Parking', icon: Plus,   to: '/reserve',       cls: 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20' },
          { label: 'Search Slots',    icon: Search, to: '/availability',   cls: 'bg-gray-200 hover:bg-gray-300 text-gray-900' },
          { label: 'View Map',        icon: Map,    to: '/map',            cls: 'bg-gray-200 hover:bg-gray-300 text-gray-900' },
        ].map(({ label, icon: Icon, to, cls }) => (
          <button key={label} onClick={() => navigate(to)}
            className={`flex flex-col items-center gap-2 py-4 rounded-2xl font-medium text-sm transition-all ${cls}`}>
            <Icon size={20} /> {label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent reservations */}
        <div className="card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-gray-900">My Reservations</h2>
            <button onClick={() => navigate('/history')} className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1">
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {recentRes.length === 0
              ? <p className="text-gray-600 text-sm py-4 text-center">No reservations yet.</p>
              : recentRes.map(r => <ReservationCard key={r.id} reservation={r} compact />)
            }
          </div>
        </div>

        {/* Notifications */}
        <div className="card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-gray-900 flex items-center gap-2">
              Notifications
              {unreadCount > 0 && <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5 font-bold">{unreadCount}</span>}
            </h2>
            <button onClick={() => navigate('/notifications')} className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1">
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {recentNotifs.length === 0
              ? <p className="text-slate-400 text-sm py-4 text-center">All caught up! No new notifications.</p>
              : recentNotifs.map(n => (
                <div key={n.id} className="flex gap-3 p-3 rounded-xl bg-gray-100/50">
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.type === 'success' ? 'bg-green-400' : n.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{n.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{n.message}</p>
                    <p className="text-xs text-gray-600 mt-1">{n.time}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* Nearby locations */}
      <div className="card rounded-2xl p-5">
        <h2 className="font-display font-semibold text-white mb-4">Nearby Parking Locations</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {parkingLocations.map(loc => (
            <button key={loc.id} onClick={() => navigate('/availability')}
              className="p-4 rounded-xl bg-gray-100/50 hover:bg-gray-200/50 transition-all text-left group">
              <div className="flex items-start justify-between mb-1.5">
                <p className="font-medium text-white text-sm group-hover:text-blue-300 transition-colors">{loc.name}</p>
                <span className="text-xs text-slate-400">{loc.distance}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
                <MapPin size={11} className="text-gray-600" /> {loc.address}
              </div>
              <OccupancyBar available={loc.available} total={loc.total} showCount />
              <div className="flex items-center justify-end mt-2 gap-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-xs text-slate-400">{loc.rating}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
