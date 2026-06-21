import React from 'react';

export default function LoadingSpinner({ size = 'md', label = 'Loading...', fullPage = false }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin`} />
      {label && <p className="text-gray-600 text-sm">{label}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }
  return spinner;
}
