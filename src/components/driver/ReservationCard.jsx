import React from 'react';
import { MapPin, Clock, Car } from 'lucide-react';
import Badge from '../common/Badge';

export default function ReservationCard({ reservation, compact = false }) {
  const { slot, location, date, startTime, endTime, duration, cost, status, vehicle, bookingId } = reservation;

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
        <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center font-display font-bold text-purple-600 text-xs">
          {slot}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">{location}</div>
          <div className="text-xs text-gray-600">{date} · {startTime}–{endTime}</div>
        </div>
        <Badge status={status} />
      </div>
    );
  }

  return (
    <div className="card rounded-2xl p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-display font-bold text-gray-900 text-lg">{slot}</div>
          <div className="text-xs font-mono text-gray-500">{bookingId}</div>
        </div>
        <Badge status={status} />
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={14} className="text-purple-600" />
          {location}
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={14} className="text-purple-600" />
          {date} · {startTime} – {endTime} ({duration}h)
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Car size={14} className="text-purple-600" />
          <span className="font-mono">{vehicle}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
        <span className="text-gray-600 text-sm">Total Cost</span>
        <span className="font-display font-bold text-gray-900 text-lg">₹{cost}</span>
      </div>
    </div>
  );
}
