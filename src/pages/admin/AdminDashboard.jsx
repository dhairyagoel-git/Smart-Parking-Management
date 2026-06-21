import React, { useState } from 'react';
import { TrendingUp, Users, ParkingCircle, DollarSign, Activity, Plus, Ban, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminStats, peakUsageData, dailyReservationsData, revenueData } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import StatCard from '../../components/common/StatCard';
import PageHeader from '../../components/common/PageHeader';
import RevenueChart from '../../components/admin/RevenueChart';
import OccupancyDonut from '../../components/admin/OccupancyDonut';
import SlotManagementPanel from '../../components/admin/SlotManagementPanel';

export default function AdminDashboard() {
  const { slots } = useApp();
  const navigate  = useNavigate();
  const [tab, setTab] = useState('overview'); // overview | slots

  const available = slots.filter(s => s.status === 'available').length;
  const occupied  = slots.filter(s => s.status === 'occupied').length;
  const reserved  = slots.filter(s => s.status === 'reserved').length;
  const total     = slots.length;
  const occPct    = total > 0 ? Math.round(((occupied + reserved) / total) * 100) : 0;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      <PageHeader title="Admin Dashboard" subtitle="Live system monitoring" liveIndicator>
        <div className="flex gap-2">
          <button onClick={() => setTab('slots')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-purple-600/25">
            <Plus size={15} /> Manage Slots
          </button>
          <button onClick={() => navigate('/admin/reports')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl text-sm transition-all">
            <FileText size={15} /> Reports
          </button>
        </div>
      </PageHeader>

      {/* Tab switcher */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit border border-gray-200">
        {[['overview','Overview'],['slots','Slot Management']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${tab === key ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-gray-700 hover:text-gray-900'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Slots"          value={total}                     icon={ParkingCircle} color="text-purple-600"   bg="bg-purple-100"   trend="+2"  />
            <StatCard label="Occupancy Rate"        value={`${occPct}%`}              icon={Activity}      color="text-yellow-600" bg="bg-yellow-100" trend="↑3%" />
            <StatCard label="Active Reservations"   value={adminStats.activeReservations} icon={Users}     color="text-green-600"  bg="bg-green-100"              />
            <StatCard label="Today's Revenue"       value={adminStats.todayRevenue}   icon={DollarSign}    color="text-purple-600" bg="bg-purple-100" trend="+12%" prefix="₹" />
          </div>

          {/* Slot summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Available', value: available, color: 'text-green-600',  border: 'border-green-200' },
              { label: 'Occupied',  value: occupied,  color: 'text-red-600',    border: 'border-red-200'   },
              { label: 'Reserved',  value: reserved,  color: 'text-yellow-600', border: 'border-yellow-200'},
            ].map(({ label, value, color, border }) => (
              <div key={label} className={`card rounded-2xl p-5 text-center border ${border}`}>
                <div className={`font-display text-4xl font-bold ${color}`}>{value}</div>
                <div className="text-sm text-gray-600 mt-1.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Charts row 1 */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card rounded-2xl p-5">
              <h2 className="font-display font-semibold text-gray-900 mb-4">Peak Usage Pattern (Today)</h2>
              <RevenueChart data={peakUsageData} id="peakChart" height={220} />
            </div>
            <div className="card rounded-2xl p-5">
              <h2 className="font-display font-semibold text-gray-900 mb-4">Daily Reservations (This Week)</h2>
              <RevenueChart data={dailyReservationsData} type="bar" id="dailyChart" height={220} />
            </div>
          </div>

          {/* Charts row 2 */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-gray-900">Monthly Revenue Trend</h2>
                <button onClick={() => navigate('/admin/reports')} className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1">
                  Full report <ChevronRight size={12} />
                </button>
              </div>
              <RevenueChart data={revenueData} id="revenueChart" height={200} />
            </div>
            <div className="card rounded-2xl p-5">
              <h2 className="font-display font-semibold text-gray-900 mb-4">Live Occupancy</h2>
              <OccupancyDonut available={available} occupied={occupied} reserved={reserved} height={220} />
            </div>
          </div>
        </>
      )}
      )}

      {tab === 'slots' && <SlotManagementPanel />}
    </div>
  );
}
