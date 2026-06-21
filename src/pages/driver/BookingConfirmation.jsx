import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Navigation, Share2, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import QRCodePlaceholder from '../../components/driver/QRCodePlaceholder';
import Badge from '../../components/common/Badge';
import { buildTicketText } from '../../utils/exportHelpers';
import { formatDate, formatTime } from '../../utils/formatters';

const Row = ({ label, value, highlight }) => (
  <div className="flex justify-between items-start gap-4 py-2.5 border-b border-gray-200 last:border-0">
    <span className="text-gray-600 text-sm flex-shrink-0">{label}</span>
    <span className={`text-sm font-medium text-right ${highlight ? 'text-purple-600 font-semibold text-base' : 'text-gray-900'}`}>{value}</span>
  </div>
);

export default function BookingConfirmation() {
  const { lastBooking, reservations } = useApp();
  const navigate = useNavigate();

  const booking = lastBooking || reservations[0];

  if (!booking) {
    return (
      <div className="p-6 text-center py-20">
        <p className="text-gray-600 mb-4">No booking found.</p>
        <button onClick={() => navigate('/dashboard')} className="px-6 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-medium">Go to Dashboard</button>
      </div>
    );
  }

  const handleDownload = () => {
    const { exportText } = require('../../utils/exportHelpers');
    exportText(buildTicketText(booking), `${booking.bookingId}.txt`);
  };

  const handleShare = async () => {
    const text = `SmartPark Booking: ${booking.bookingId}\nSlot: ${booking.slot}\nDate: ${booking.date} at ${booking.startTime}`;
    if (navigator.share) {
      await navigator.share({ title: 'SmartPark Ticket', text });
    } else {
      await navigator.clipboard.writeText(text);
      alert('Booking details copied to clipboard!');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-5 animate-fade-in-up">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm transition-colors">
        <ArrowLeft size={15} /> Back to Dashboard
      </button>

      {/* Success banner */}
      <div className="card rounded-2xl p-6 text-center border border-green-200 bg-green-50">
        <div className="w-16 h-16 rounded-full bg-green-100 border border-green-200 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Booking Confirmed!</h1>
        <p className="text-gray-700 text-sm">Your parking slot has been successfully reserved.</p>
      </div>

      {/* Details card */}
      <div className="card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-gray-900">Booking Details</h2>
          <Badge status="confirmed" />
        </div>

        <Row label="Booking ID"      value={booking.bookingId} />
        <Row label="Slot Number"     value={booking.slot || booking.slotId} />
        <Row label="Location"        value={booking.location || 'SmartPark Central'} />
        <Row label="Date"            value={formatDate(booking.date)} />
        <Row label="Time"            value={`${formatTime(booking.startTime)} – ${formatTime(booking.endTime)}`} />
        <Row label="Duration"        value={`${booking.duration} hour${booking.duration > 1 ? 's' : ''}`} />
        <Row label="Vehicle"         value={booking.vehicle} />
        <Row label="Amount Paid"     value={`₹${booking.cost}`} highlight />

        {/* QR */}
        <div className="mt-5 pt-5 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-700 mb-4">Scan at entry gate to access parking</p>
          <QRCodePlaceholder bookingId={booking.bookingId} size={160} />
          <p className="text-xs font-mono text-gray-600 mt-3">{booking.bookingId}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={handleDownload}
          className="flex items-center justify-center gap-2 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl text-sm font-medium transition-all">
          <Download size={16} /> Download Ticket
        </button>
        <button onClick={handleShare}
          className="flex items-center justify-center gap-2 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl text-sm font-medium transition-all">
          <Share2 size={16} /> Share
        </button>
      </div>

      <button onClick={() => window.open(`https://maps.google.com?q=SmartPark+Central+New+Delhi`, '_blank')}
        className="w-full flex items-center justify-center gap-2 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl text-sm font-medium transition-all">
        <Navigation size={16} /> Navigate to Parking
      </button>

      <button onClick={() => navigate('/dashboard')}
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-purple-600/25">
        Back to Dashboard
      </button>
    </div>
  );
}
