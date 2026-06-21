import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZoomIn, ZoomOut, Search, Layers, Navigation } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ParkingMap() {
  const { slots, setSelectedSlot } = useApp();
  const navigate = useNavigate();
  const [floor, setFloor] = useState('F1');
  const [zoom, setZoom] = useState(1);
  const [search, setSearch] = useState('');
  const [hoveredSlot, setHoveredSlot] = useState(null);

  const floorSlots = slots.filter(s => s.floor === floor);
  const searchedSlot = search ? slots.find(s => s.label.toLowerCase().includes(search.toLowerCase())) : null;

  const handleSlotClick = (slot) => {
    if (slot.status === 'occupied') return;
    setSelectedSlot(slot);
    navigate('/reserve');
  };

  const slotColor = (slot) => {
    if (searchedSlot?.id === slot.id) return 'ring-2 ring-purple-600 bg-purple-600/30 border-purple-600 text-purple-700';
    switch (slot.status) {
      case 'available': return 'slot-available';
      case 'occupied': return 'slot-occupied';
      case 'reserved': return 'slot-reserved';
      default: return '';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 animate-fade-in-up">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900">Parking Map</h1>
        <p className="text-gray-600 text-sm mt-1">Interactive floor plan – click any available slot to reserve.</p>
      </div>

      {/* Controls */}
      <div className="card rounded-2xl p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search slot (e.g. F1-05)..."
            className="w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-500 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
        </div>
        <div className="flex items-center gap-2">
          <Layers size={14} className="text-gray-600" />
          <div className="flex gap-1">
            {['F1', 'F2', 'F3'].map(f => (
              <button key={f} onClick={() => setFloor(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${floor === f ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:text-gray-900'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 1.8))} className="w-9 h-9 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 border border-purple-300 rounded-xl flex items-center justify-center transition-all">
            <ZoomIn size={16} />
          </button>
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.6))} className="w-9 h-9 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 border border-purple-300 rounded-xl flex items-center justify-center transition-all">
            <ZoomOut size={16} />
          </button>
        </div>
      </div>

      {/* Map canvas */}
      <div className="card rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <Navigation size={14} className="text-purple-600" />
          <span className="text-sm text-gray-700 font-medium">SmartPark Central — {floor === 'F1' ? 'Ground Floor' : floor === 'F2' ? '2nd Floor' : '3rd Floor'}</span>
        </div>
        <div className="overflow-auto p-6">
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', transition: 'transform 0.2s ease' }}>
            {/* Road & structure */}
            <div className="relative bg-transparent rounded-2xl p-8" style={{ minWidth: 600 }}>
              {/* Entry/Exit */}
              <div className="flex justify-between mb-4">
                <div className="px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-emerald-400 text-xs font-bold">▶ ENTRY GATE A</div>
                <div className="px-4 py-1.5 bg-orange-500/20 border border-orange-500/40 rounded-lg text-orange-400 text-xs font-bold">EXIT GATE B ◀</div>
              </div>

              {/* Driving lane */}
              <div className="relative mb-2">
                <div className="h-8 bg-gray-200/30 rounded-lg flex items-center justify-center">
                  <div className="flex gap-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="w-6 h-1 bg-yellow-500/40 rounded" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Slots grid - Row A */}
              <div className="mb-2">
                <div className="text-xs text-gray-600 mb-1.5 font-medium">ROW A</div>
                <div className="flex gap-2 flex-wrap">
                  {floorSlots.slice(0, 10).map(slot => (
                    <button key={slot.id}
                      onClick={() => handleSlotClick(slot)}
                      onMouseEnter={() => setHoveredSlot(slot)}
                      onMouseLeave={() => setHoveredSlot(null)}
                      className={`slot-btn w-14 h-14 text-xs relative ${slotColor(slot)}`}>
                      {slot.label.split('-')[1]}
                      {slot.type === 'ev' && <span className="absolute -top-1 -right-1 text-[8px] bg-cyan-500 text-white rounded px-0.5 leading-none py-0.5">EV</span>}
                      {slot.type === 'disabled' && <span className="absolute -top-1 -right-1 text-[8px] bg-purple-500 text-white rounded px-0.5 leading-none py-0.5">♿</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Middle lane */}
              <div className="h-6 bg-gray-200/20 rounded my-2 flex items-center px-4">
                <div className="flex gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="w-4 h-0.5 bg-yellow-500/30 rounded" />
                  ))}
                </div>
              </div>

              {/* Slots grid - Row B */}
              <div className="mb-2">
                <div className="text-xs text-gray-600 mb-1.5 font-medium">ROW B</div>
                <div className="flex gap-2 flex-wrap">
                  {floorSlots.slice(10, 20).map(slot => (
                    <button key={slot.id}
                      onClick={() => handleSlotClick(slot)}
                      onMouseEnter={() => setHoveredSlot(slot)}
                      onMouseLeave={() => setHoveredSlot(null)}
                      className={`slot-btn w-14 h-14 text-xs relative ${slotColor(slot)}`}>
                      {slot.label.split('-')[1]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Staircase & elevator */}
              <div className="flex gap-3 mt-4 text-xs">
                <div className="px-3 py-1.5 bg-gray-200 border border-gray-300 rounded-lg text-gray-700">🚶 Staircase</div>
                <div className="px-3 py-1.5 bg-gray-200 border border-gray-300 rounded-lg text-gray-700">🛗 Elevator</div>
                <div className="px-3 py-1.5 bg-gray-200 border border-gray-300 rounded-lg text-gray-700">🅿 Reception</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover tooltip */}
        {hoveredSlot && (
          <div className="m-4 p-3 bg-purple-100 border border-purple-200 rounded-xl text-sm">
            <span className="font-semibold text-gray-900">{hoveredSlot.label}</span>
            <span className={`ml-3 capitalize ${hoveredSlot.status === 'available' ? 'text-green-600' : hoveredSlot.status === 'occupied' ? 'text-red-600' : 'text-yellow-600'}`}>
              {hoveredSlot.status}
            </span>
            {hoveredSlot.status === 'available' && <span className="ml-3 text-gray-600">· Click to reserve · ₹30/hr</span>}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="card rounded-2xl p-4 flex flex-wrap gap-6 text-sm text-gray-600">
        <span className="flex items-center gap-2"><span className="w-4 h-4 rounded slot-available border border-green-500" />Available (click to reserve)</span>
        <span className="flex items-center gap-2"><span className="w-4 h-4 rounded slot-occupied border border-red-500" />Occupied</span>
        <span className="flex items-center gap-2"><span className="w-4 h-4 rounded slot-reserved border border-yellow-500" />Reserved</span>
        <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-gray-200 border border-cyan-500/60" />EV Charging</span>
      </div>
    </div>
  );
}
