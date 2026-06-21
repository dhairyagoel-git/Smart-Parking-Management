import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { CHART_COLORS } from '../../utils/constants';

Chart.register(...registerables);

export default function RevenueChart({ data, type = 'line', height = 220, id }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = ref.current.getContext('2d');

    const chart = new Chart(ctx, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: CHART_COLORS.labelColor,
              font: { size: 11 },
              boxWidth: 12,
              padding: 16,
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
        scales: type !== 'doughnut' && type !== 'pie' ? {
          x: {
            grid: { color: CHART_COLORS.gridLine },
            ticks: { color: CHART_COLORS.tickColor, font: { size: 11 } },
          },
          y: {
            grid: { color: CHART_COLORS.gridLine },
            ticks: { color: CHART_COLORS.tickColor, font: { size: 11 } },
          },
        } : undefined,
        animation: { duration: 800, easing: 'easeInOutQuart' },
      },
    });

    return () => chart.destroy();
  }, [data, type]);

  return (
    <div style={{ height }}>
      <canvas ref={ref} id={id} />
    </div>
  );
}
