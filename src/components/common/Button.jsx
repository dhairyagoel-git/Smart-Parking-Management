import React from 'react';

const variants = {
  primary:   'bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 border border-purple-300',
  secondary: 'bg-gray-500/10 hover:bg-gray-500/20 text-gray-700 border border-gray-300',
  danger:    'bg-red-500/10 hover:bg-red-500/20 text-red-600 border border-red-200',
  ghost:     'hover:bg-gray-100 text-gray-600 hover:text-gray-900',
  success:   'bg-green-500/10 hover:bg-green-500/20 text-green-600 border border-green-300',
  outline:   'border border-purple-300 hover:border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent',
};

const sizes = {
  sm:  'px-3 py-1.5 text-xs rounded-lg',
  md:  'px-4 py-2.5 text-sm rounded-xl',
  lg:  'px-6 py-3 text-base rounded-xl',
  xl:  'px-8 py-4 text-lg rounded-2xl',
};

export default function Button({
  children, variant = 'primary', size = 'md',
  loading = false, disabled = false, icon: Icon,
  iconRight, className = '', onClick, type = 'button', fullWidth = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium transition-all
        disabled:opacity-60 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      ) : Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      {children}
      {iconRight && !loading && <iconRight size={size === 'sm' ? 14 : 16} />}
    </button>
  );
}
