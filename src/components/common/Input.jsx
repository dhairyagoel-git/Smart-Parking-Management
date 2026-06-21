import React from 'react';

export default function Input({
  label, type = 'text', value, onChange, placeholder,
  icon: Icon, error, hint, required = false, disabled = false,
  className = '', name, min, max,
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
          {Icon && <Icon size={12} />}
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type} value={value} onChange={onChange} name={name}
        placeholder={placeholder} required={required} disabled={disabled}
        min={min} max={max}
        className={`
          w-full bg-gray-100 border text-gray-900 placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm font-medium
          focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500/60 focus:border-red-600 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'}
        `}
      />
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-600 font-medium">{hint}</p>}
    </div>
  );
}
