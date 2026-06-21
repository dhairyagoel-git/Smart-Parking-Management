import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

export default function CountdownTimer({ initialSeconds = 300, onExpire, label = 'Slot Hold Timer' }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) { onExpire?.(); return; }
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, onExpire]);

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  const urgent = seconds < 60;
  const pct = (seconds / initialSeconds) * 100;
  const barColor = urgent ? 'bg-red-500' : seconds < initialSeconds * 0.4 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className={`card rounded-2xl p-4 border ${urgent ? 'border-red-500/30 bg-red-500/5' : 'border-yellow-500/20 bg-yellow-500/5'}`}>
      <div className="flex items-center gap-3 mb-3">
        {urgent ? (
          <AlertTriangle size={18} className="text-red-400 animate-pulse" />
        ) : (
          <Clock size={18} className="text-yellow-400" />
        )}
        <div className="flex-1">
          <div className="text-sm font-medium text-white">{label}</div>
          <div className="text-xs text-gray-600">Complete your booking before time runs out</div>
        </div>
        <div className={`font-display text-2xl font-bold tabular-nums ${urgent ? 'text-red-400 animate-pulse' : 'text-yellow-400'}`}>
          {mins}:{secs}
        </div>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
