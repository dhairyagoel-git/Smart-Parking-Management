import React from 'react';

const variants = {
  green:  'text-green-400 bg-green-400/10 border-green-400/25',
  red:    'text-red-400 bg-red-400/10 border-red-400/25',
  yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/25',
  blue:   'text-blue-400 bg-blue-400/10 border-blue-400/25',
  purple: 'text-purple-400 bg-purple-400/10 border-purple-400/25',
  slate:  'text-gray-700 bg-gray-200 border-gray-300',
};

const statusMap = {
  available:  'green',
  occupied:   'red',
  reserved:   'yellow',
  active:     'green',
  upcoming:   'blue',
  completed:  'slate',
  cancelled:  'red',
  confirmed:  'green',
};

export default function Badge({ children, variant, status, className = '' }) {
  const v = variant || statusMap[status] || 'slate';
  return (
    <span className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full border font-medium capitalize ${variants[v]} ${className}`}>
      {children || status}
    </span>
  );
}
