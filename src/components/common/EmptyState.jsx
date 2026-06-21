import React from 'react';

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="card rounded-2xl p-12 flex flex-col items-center justify-center text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-gray-200/50 flex items-center justify-center mb-4">
          <Icon size={28} className="text-gray-600" />
        </div>
      )}
      <h3 className="font-display font-semibold text-white text-lg mb-2">{title}</h3>
      {description && <p className="text-slate-400 text-sm max-w-xs leading-relaxed">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
