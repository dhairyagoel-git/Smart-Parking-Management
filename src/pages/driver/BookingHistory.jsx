import React, { useState } from 'react';
import { Calendar, Filter, Download, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import { exportCSV } from '../../utils/exportHelpers';
import { formatDate, formatCurrency } from '../../utils/formatters';

export default function BookingHistory() {
  const { reservations } = useApp();
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter,   setDateFilter]   = useState('');

  const filtered = reservations.filter(r =>
    (statusFilter === 'all' || r.status === statusFilter) &&
    (!dateFilter  || r.date === dateFilter)
  );

  const handleExport = () => {
    exportCSV(
      [['Booking ID','Date','Slot','Duration','Cost','Vehicle','Status'],
       ...filtered.map(r => [r.bookingId, r.date, r.slot, `${r.duration}h`, r.cost, r.vehicle, r.status])],
      'booking_history.csv'
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-5 animate-fade-in-up">
      <PageHeader title="Booking History" subtitle={`${filtered.length} booking${filtered.length !== 1 ? 's' : ''} found`}>
        <button onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 border border-purple-300 rounded-xl text-sm transition-all">
          <Download size={14} /> Export CSV
        </button>
      </PageHeader>

      {/* Filters */}
      <div className="card rounded-2xl p-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-gray-400" />
          <div className="flex gap-1 flex-wrap">
            {['all','active','upcoming','completed','cancelled'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${statusFilter === s ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:text-gray-900'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={13} className="text-gray-400" />
          <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)}
            className="bg-gray-200/50 border border-gray-300 text-gray-900 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 transition-colors" />
          {dateFilter && (
            <button onClick={() => setDateFilter('')} className="text-xs text-slate-400 hover:text-white transition-colors">Clear</button>
          )}
        </div>
      </div>

      {/* Desktop table */}
      {filtered.length === 0 ? (
        <EmptyState icon={Clock} title="No bookings found" description="Try adjusting your filters or make your first reservation." />
      ) : (
        <>
          <div className="card rounded-2xl overflow-hidden hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  {['Booking ID','Date','Slot','Time','Duration','Cost','Vehicle','Status'].map(h => (
                    <th key={h} className="text-left px-4 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${i % 2 ? 'bg-gray-50' : ''}`}>
                    <td className="px-4 py-4 text-sm font-mono text-purple-600">{r.bookingId}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{formatDate(r.date)}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900">{r.slot}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{r.startTime}–{r.endTime}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{r.duration}h</td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900">{formatCurrency(r.cost)}</td>
                    <td className="px-4 py-4 text-xs font-mono text-gray-600">{r.vehicle}</td>
                    <td className="px-4 py-4"><Badge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map(r => (
              <div key={r.id} className="card rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-purple-600">{r.bookingId}</span>
                  <Badge status={r.status} />
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div><p className="text-xs text-gray-600">Slot</p><p className="text-gray-900 font-semibold mt-0.5">{r.slot}</p></div>
                  <div><p className="text-xs text-gray-600">Date</p><p className="text-gray-700 mt-0.5">{formatDate(r.date)}</p></div>
                  <div><p className="text-xs text-gray-600">Duration</p><p className="text-gray-900 font-semibold mt-0.5">{r.duration}h</p></div>
                  <div><p className="text-xs text-gray-600">Cost</p><p className="text-gray-900 font-semibold mt-0.5">{formatCurrency(r.cost)}</p></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
