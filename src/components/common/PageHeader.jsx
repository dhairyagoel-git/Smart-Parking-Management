import React from 'react';

export default function PageHeader({ title, subtitle, children, liveIndicator = false }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
        {subtitle && (
          <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
            {liveIndicator && (
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            )}
            {subtitle}
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-3 flex-wrap">{children}</div>}
    </div>
  );
}
