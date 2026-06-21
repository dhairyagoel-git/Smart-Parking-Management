// Date & time helpers
export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatTime = (timeStr) => {
  if (!timeStr) return '—';
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`;
};

export const formatDateTime = (dateStr, timeStr) =>
  `${formatDate(dateStr)}, ${formatTime(timeStr)}`;

// Add hours to a time string
export const addHours = (timeStr, hours) => {
  const [h, m] = timeStr.split(':').map(Number);
  const total = h * 60 + m + hours * 60;
  return `${String(Math.floor(total / 60) % 24).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};

// Currency
export const formatCurrency = (amount, currency = '₹') =>
  `${currency}${Number(amount).toLocaleString('en-IN')}`;

// Percentage
export const formatPercent = (value, decimals = 0) =>
  `${Number(value).toFixed(decimals)}%`;

// Booking ID
export const generateBookingId = () =>
  `BK${Date.now()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;

// Duration label
export const formatDuration = (hours) =>
  hours === 1 ? '1 hour' : `${hours} hours`;

// Relative time
export const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)   return 'Just now';
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

// Slot status color class
export const slotStatusClass = (status) => ({
  available: 'slot-available',
  occupied:  'slot-occupied',
  reserved:  'slot-reserved',
}[status] ?? '');

// Occupancy color
export const occupancyColor = (pct) =>
  pct >= 90 ? 'text-red-400' : pct >= 70 ? 'text-yellow-400' : 'text-green-400';
