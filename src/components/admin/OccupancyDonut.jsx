import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function OccupancyDonut({ available, occupied, reserved, height = 200 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = ref.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Occupied', 'Available', 'Reserved'],
        datasets: [{
          data: [occupied, available, reserved],
          backgroundColor: ['#ef4444', '#22c55e', '#f59e0b'],
          borderWidth: 0,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#6b7280',
              font: { size: 11 },
              padding: 16,
              boxWidth: 10,
              boxHeight: 10,
            },
          },
          tooltip: {
            backgroundColor: '#ffffff',
            titleColor: '#111827',
            bodyColor: '#374151',
            borderColor: 'rgba(15,23,42,0.06)',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8,
          },
        },
        animation: { duration: 800, easing: 'easeInOutQuart' },
      },
    });

    return () => chart.destroy();
  }, [available, occupied, reserved]);

  const total = available + occupied + reserved;
  const pct   = total > 0 ? Math.round((occupied / total) * 100) : 0;

  return (
    <div className="relative" style={{ height }}>
      <canvas ref={ref} />
      {/* Centre label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ paddingBottom: 40 }}>
        <span className="font-display text-2xl font-bold text-gray-900">{pct}%</span>
        <span className="text-xs text-gray-600">Occupied</span>
      </div>
    </div>
  );
}
