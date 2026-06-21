import React from 'react';

export default function OccupancyBar({ available, total, label, showCount = true }) {
  const pct = total > 0 ? ((total - available) / total) * 100 : 0;
  const color = pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="space-y-1.5">
      {(label || showCount) && (
        <div className="flex justify-between text-xs text-gray-600">
          {label && <span>{label}</span>}
          {showCount && <span><span className="text-green-400 font-medium">{available}</span> / {total} free</span>}
        </div>
      )}
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
