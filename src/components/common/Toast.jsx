import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertTriangle, Info, X, XCircle } from 'lucide-react';

const icons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error:   XCircle,
  info:    Info,
};

const colors = {
  success: 'text-green-400 bg-green-400/10 border-green-400/25',
  warning: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/25',
  error:   'text-red-400 bg-red-400/10 border-red-400/25',
  info:    'text-blue-400 bg-blue-400/10 border-blue-400/25',
};

export function Toast({ type = 'info', title, message, duration = 4000, onClose }) {
  const [visible, setVisible] = useState(true);
  const Icon = icons[type];

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onClose, 300); }, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  return (
    <div className={`
      flex items-start gap-3 p-4 rounded-2xl border shadow-xl max-w-sm w-full
      transition-all duration-300 card
      ${colors[type]}
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
    `}>
      <Icon size={18} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        {title && <div className="font-semibold text-white text-sm">{title}</div>}
        {message && <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{message}</div>}
      </div>
      <button onClick={() => { setVisible(false); setTimeout(onClose, 300); }} className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0">
        <X size={14} />
      </button>
    </div>
  );
}

// Toast container — place once at top level
export function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map(t => (
        <Toast key={t.id} {...t} onClose={() => onRemove(t.id)} />
      ))}
    </div>
  );
}
