import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ label, value, icon: Icon, color, bg, trend, trendUp = true, suffix = '', prefix = '' }) {
  return (
    <div className="card p-5 rounded-2xl hover:border-slate-600/30 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
          <Icon size={18} className={color} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
            {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend}
          </div>
        )}
      </div>
      <div className={`text-2xl font-display font-bold ${color} mb-1`}>
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}
