import React from 'react';

const items = [
  { label: 'Available',    color: 'bg-green-500/20 border border-green-500' },
  { label: 'Occupied',     color: 'bg-red-500/20 border border-red-500' },
  { label: 'Reserved',     color: 'bg-yellow-500/20 border border-yellow-500' },
  { label: 'EV Charging',  color: 'bg-gray-200 border border-cyan-500/60' },
  { label: 'Accessible',   color: 'bg-gray-200 border border-purple-500/60' },
];

export default function SlotLegend({ className = '' }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {items.map(({ label, color }) => (
        <div key={label} className="flex items-center gap-2 text-sm text-slate-400">
          <span className={`w-4 h-4 rounded ${color} inline-block`} />
          {label}
        </div>
      ))}
    </div>
  );
}
