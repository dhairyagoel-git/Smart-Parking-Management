import React, { useState } from 'react';
import { Download, FileText, BarChart3, TrendingUp, Calendar, ChevronDown } from 'lucide-react';
import { weeklyReportData, revenueData, peakUsageData } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import RevenueChart from '../../components/admin/RevenueChart';
import OccupancyDonut from '../../components/admin/OccupancyDonut';
import { exportCSV, printHTML, buildWeeklyReportHTML } from '../../utils/exportHelpers';
import { useApp } from '../../context/AppContext';

export default function ReportsPage() {
  const { slots } = useApp();
  const [reportType, setReportType] = useState('weekly');

  const available = slots.filter(s => s.status === 'available').length;
  const occupied  = slots.filter(s => s.status === 'occupied').length;
  const reserved  = slots.filter(s => s.status === 'reserved').length;

  const totals = weeklyReportData.reduce(
    (acc, r) => ({ reservations: acc.reservations + r.reservations, revenue: acc.revenue + r.revenue }),
    { reservations: 0, revenue: 0 }
  );

  const handleExportCSV = () => {
    exportCSV(
      [['Day','Reservations','Revenue (₹)','Occupancy'], ...weeklyReportData.map(r => [r.day, r.reservations, r.revenue, r.occupancy])],
      'smartpark_weekly_report.csv'
    );
  };

  const handleExportPDF = () => {
    printHTML(buildWeeklyReportHTML(weeklyReportData, { location: 'SmartPark Central' }), 'SmartPark – Weekly Report');
  };

  const occupancyBarColor = (occ) => {
    const v = parseInt(occ);
    return v >= 90 ? 'bg-red-500' : v >= 70 ? 'bg-yellow-500' : 'bg-green-500';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      <PageHeader title="Reports & Analytics" subtitle="Detailed insights on parking usage and revenue.">
        <button onClick={handleExportPDF}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-sm transition-all">
          <FileText size={14} /> Export PDF
        </button>
        <button onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-xl text-sm transition-all">
          <Download size={14} /> Export CSV
        </button>
      </PageHeader>

      {/* Period selector */}
      <div className="card rounded-2xl p-4 flex items-center gap-3">
        <Calendar size={14} className="text-gray-600" />
        <div className="flex gap-1">
          {['daily','weekly','monthly'].map(t => (
            <button key={t} onClick={() => setReportType(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${reportType === t ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'bg-gray-200 text-gray-700 hover:text-gray-900'}`}>
              {t}
            </button>
          ))}
        </div>
        <span className="ml-auto text-xs text-gray-600">Showing: {reportType === 'daily' ? 'Today' : reportType === 'weekly' ? 'This Week' : 'Last 6 Months'}</span>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Reservations" value={totals.reservations}                            icon={BarChart3}  color="text-purple-600"   bg="bg-purple-600/10"   trend="+8%"  />
        <StatCard label="Total Revenue"       value={totals.revenue} prefix="₹"                    icon={TrendingUp} color="text-green-400"  bg="bg-green-400/10"  trend="+14%" />
        <StatCard label="Avg. Occupancy"      value="74%"                                            icon={BarChart3}  color="text-yellow-400" bg="bg-yellow-400/10" trend="+3%"  />
        <StatCard label="Peak Day"            value="Saturday"                                       icon={Calendar}   color="text-purple-400" bg="bg-purple-400/10"              />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly table */}
        <div className="lg:col-span-2 card rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-display font-semibold text-gray-900">Weekly Breakdown</h2>
            <span className="text-xs text-gray-600">{weeklyReportData.length} days</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {['Day','Reservations','Revenue','Occupancy'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weeklyReportData.map((row, i) => (
                    <tr key={row.day} className={`border-b border-gray-200 hover:bg-gray-100 transition-colors ${i % 2 ? 'bg-gray-50' : ''}`}>
                      <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{row.day}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-700">{row.reservations}</td>
                      <td className="px-5 py-3.5 text-sm text-green-600 font-medium">₹{row.revenue.toLocaleString('en-IN')}</td>
                      <td className="px-5 py-3.5 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-1.5 min-w-16">
                            <div className={`h-1.5 rounded-full ${occupancyBarColor(row.occupancy)}`} style={{ width: row.occupancy }} />
                          </div>
                          <span className="text-gray-700 text-xs w-9 text-right">{row.occupancy}</span>
                        </div>
                      </td>
                    </tr>
                ))}
                <tr className="border-t-2 border-gray-200/50 bg-gray-100 font-semibold">
                  <td className="px-5 py-3 text-sm text-gray-900">Total</td>
                  <td className="px-5 py-3 text-sm text-purple-600">{totals.reservations}</td>
                  <td className="px-5 py-3 text-sm text-green-600">₹{totals.revenue.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Donut */}
        <div className="card rounded-2xl p-5">
          <h2 className="font-display font-semibold text-gray-900 mb-1">Current Occupancy</h2>
          <p className="text-xs text-gray-600 mb-4">Live slot distribution</p>
          <OccupancyDonut available={available} occupied={occupied} reserved={reserved} height={210} />
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600"><span>Total capacity</span><span className="text-gray-900">{slots.length} slots</span></div>
            <div className="flex justify-between text-gray-600"><span>Peak hour</span><span className="text-gray-900">6:00 PM</span></div>
            <div className="flex justify-between text-gray-600"><span>Rate</span><span className="text-gray-900">₹30 / hour</span></div>
          </div>
        </div>
      </div>

      {/* Revenue trend */}
      <div className="card rounded-2xl p-5">
        <h2 className="font-display font-semibold text-gray-900 mb-4">6-Month Revenue Trend</h2>
        <RevenueChart data={revenueData} id="revTrend" height={200} />
      </div>

      {/* Peak usage */}
      <div className="card rounded-2xl p-5">
        <h2 className="font-display font-semibold text-gray-900 mb-4">Hourly Peak Usage Pattern</h2>
        <RevenueChart data={peakUsageData} id="peakUsageReport" height={180} />
      </div>
    </div>
  );
}
