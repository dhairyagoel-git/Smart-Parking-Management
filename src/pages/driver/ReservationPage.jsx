import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, AlertCircle, X, MapPin, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import CountdownTimer from '../../components/driver/CountdownTimer';
import Input from '../../components/common/Input';
import { DURATION_OPTIONS, PARKING_RATE_PER_HOUR, GST_RATE } from '../../utils/constants';
import { addHours, formatCurrency } from '../../utils/formatters';

export default function ReservationPage() {
  const { selectedSlot, setSelectedSlot, reserveSlot, slots } = useApp();
  const navigate = useNavigate();

  const [date, setDate]       = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStart] = useState('10:00');
  const [duration, setDuration] = useState(2);
  const [vehicle, setVehicle] = useState('DL 01 AB 1234');
  const [confirming, setConfirming] = useState(false);
  const [expired, setExpired] = useState(false);

  const localSlot = selectedSlot || slots.find(s => s.status === 'available');
  const endTime   = addHours(startTime, duration);
  const base      = duration * PARKING_RATE_PER_HOUR;
  const tax       = Math.round(base * GST_RATE);
  const total     = base + tax;

  const handleConfirm = async () => {
    if (!localSlot || expired) return;
    setConfirming(true);
    await new Promise(r => setTimeout(r, 1000));
    reserveSlot(localSlot.id, { date, startTime, endTime, duration, cost: total });
    setSelectedSlot(null);
    navigate('/confirmation');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-5 animate-fade-in-up">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm transition-colors font-medium">
        <ArrowLeft size={15} /> Back
      </button>

      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900">Reserve Parking Slot</h1>
        <p className="text-gray-700 text-sm mt-1">Complete your booking details below.</p>
      </div>

      {/* Countdown */}
      <CountdownTimer initialSeconds={300} onExpire={() => setExpired(true)} />

      {expired && (
        <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-700 text-sm font-medium text-center">
          ⏱ Hold time expired. Please select a slot again.
        </div>
      )}

      {/* Slot info */}
      <div className="card rounded-2xl p-5 bg-white">
        <h2 className="font-display font-semibold text-gray-900 mb-4">Selected Slot</h2>
        {localSlot ? (
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 border border-purple-300 flex flex-col items-center justify-center">
              <span className="font-display font-semibold text-purple-700 text-sm leading-tight">{localSlot.floor}</span>
              <span className="font-display font-bold text-purple-900 text-lg leading-tight">{String(localSlot.number).padStart(2,'0')}</span>
            </div>
            <div className="flex-1">
              <div className="text-gray-900 font-semibold text-lg">{localSlot.label}</div>
              <div className="flex items-center gap-1.5 text-gray-600 text-sm mt-0.5">
                <MapPin size={13} className="text-purple-600" /> SmartPark Central
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {localSlot.floor === 'F1' ? 'Ground Floor' : localSlot.floor === 'F2' ? '2nd Floor' : '3rd Floor'}
                {localSlot.type === 'ev' && ' · EV Charging'}
                {localSlot.type === 'disabled' && ' · Accessible'}
              </div>
              <div className="text-xs text-green-600 font-semibold mt-1 capitalize">{localSlot.status}</div>
            </div>
          </div>
        ) : (
            <div className="flex items-center gap-3 text-gray-700 text-sm p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <AlertCircle size={16} className="text-yellow-600" />
              No slot selected. <button onClick={() => navigate('/availability')} className="text-purple-600 hover:underline font-semibold">Choose from availability screen</button>
          </div>
        )}
      </div>

      {/* Booking form */}
      <div className="card rounded-2xl p-5 space-y-4 bg-white">
        <h2 className="font-display font-semibold text-gray-900">Booking Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
          <Input label="Start Time" type="time" value={startTime} onChange={e => setStart(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Duration</label>
          <div className="flex gap-2 flex-wrap">
            {DURATION_OPTIONS.map(h => (
              <button key={h} onClick={() => setDuration(h)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${duration === h ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'bg-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-300'}`}>
                {h}h
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-700 mt-2 font-medium">End time: {endTime}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1.5 flex items-center gap-1"><Car size={12} /> Vehicle</label>
          <select value={vehicle} onChange={e => setVehicle(e.target.value)}
            className="w-full bg-gray-100 border border-gray-300 text-gray-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors font-medium">
            <option value="DL 01 AB 1234">DL 01 AB 1234 – Honda City (Car)</option>
            <option value="DL 02 CD 5678">DL 02 CD 5678 – Royal Enfield (Motorcycle)</option>
          </select>
        </div>
      </div>

      {/* Cost summary */}
      <div className="card rounded-2xl p-5 bg-white">
        <h2 className="font-display font-semibold text-gray-900 mb-4">Cost Summary</h2>
        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between text-gray-700 font-medium">
            <span>Parking ({duration}h × ₹{PARKING_RATE_PER_HOUR})</span>
            <span className="text-gray-900 font-semibold">{formatCurrency(base)}</span>
          </div>
          <div className="flex justify-between text-gray-700 font-medium">
            <span>GST (18%)</span>
            <span className="text-gray-900 font-semibold">{formatCurrency(tax)}</span>
          </div>
          <div className="border-t border-gray-300 pt-2.5 flex justify-between text-gray-900 font-semibold">
            <span>Total Payable</span>
            <span className="text-purple-600 font-display text-xl">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={() => { setSelectedSlot(null); navigate(-1); }}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl font-semibold text-sm transition-all">
          <X size={15} /> Cancel
        </button>
        <button onClick={handleConfirm} disabled={!localSlot || confirming || expired}
          className="flex-[2] flex items-center justify-center gap-2 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-purple-600/25">
          {confirming
            ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Confirming…</>
            : `Confirm Reservation · ${formatCurrency(total)}`}
        </button>
      </div>
    </div>
  );
}
