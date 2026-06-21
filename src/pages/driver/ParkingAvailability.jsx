import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import useParkingSlots from '../../hooks/useParkingSlots';
import SlotGrid from '../../components/parking/SlotGrid';
import SlotLegend from '../../components/parking/SlotLegend';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';

export default function ParkingAvailability() {
  const { setSelectedSlot } = useApp();
  const navigate = useNavigate();
  const { slots, available, occupied, reserved, refreshing, lastRefresh, refresh } = useParkingSlots(30000);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFloor,  setFilterFloor]  = useState('all');

  const filtered = slots.filter(s =>
    (filterStatus === 'all' || s.status === filterStatus) &&
    (filterFloor  === 'all' || s.floor  === filterFloor)
  );

  const handleSlotClick = (slot) => {
    if (slot.status === 'occupied') return;
    setSelectedSlot(slot);
    navigate('/reserve');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      <PageHeader
        title="Parking Availability"
        subtitle={`Live · Updated ${lastRefresh.toLocaleTimeString()}`}
        liveIndicator
      >
        <button onClick={refresh} disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300 hover:border-gray-600 rounded-xl text-sm transition-all">
          <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Available" value={available} icon={CheckCircle} color="text-green-400"  bg="bg-green-400/10" />
        <StatCard label="Occupied"  value={occupied}  icon={XCircle}     color="text-red-400"    bg="bg-red-400/10"   />
        <StatCard label="Reserved"  value={reserved}  icon={Clock}       color="text-yellow-400" bg="bg-yellow-400/10"/>
      </div>

      {/* Filters */}
      <div className="card rounded-2xl p-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-gray-600" />
          <span className="text-xs text-gray-600">Floor:</span>
          {['all','F1','F2','F3'].map(f => (
            <button key={f} onClick={() => setFilterFloor(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterFloor === f ? 'bg-purple-600 text-white border border-purple-600' : 'bg-transparent text-gray-700 border border-gray-300 hover:border-gray-500 hover:text-gray-900'}`}>
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Status:</span>
          {['all','available','occupied','reserved'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filterStatus === s ? 'bg-purple-600 text-white border border-purple-600' : 'bg-transparent text-gray-700 border border-gray-300 hover:border-gray-500 hover:text-gray-900'}`}>
              {s}
            </button>
          ))}
        </div>
        <span className="ml-auto text-xs text-gray-500">{filtered.length} slots shown</span>
      </div>

      {/* Grid */}
      <div className="card rounded-2xl p-5">
        <SlotGrid slots={filtered} onSlotClick={handleSlotClick} />
      </div>

      {/* Legend */}
      <div className="card rounded-2xl p-4">
        <SlotLegend />
      </div>
    </div>
  );
}
