import React from 'react';

const slotClasses = {
  available: 'slot-available',
  occupied:  'slot-occupied',
  reserved:  'slot-reserved',
};

export default function SlotGrid({ slots, onSlotClick, selectedSlotId, showFloorLabel = true }) {
  const floors = [...new Set(slots.map(s => s.floor))].sort();

  return (
    <div className="space-y-6">
      {floors.map(floor => {
        const floorSlots = slots.filter(s => s.floor === floor);
        const available = floorSlots.filter(s => s.status === 'available').length;

        return (
          <div key={floor}>
            {showFloorLabel && (
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-white text-sm">
                    {floor === 'F1' ? 'Floor 1 – Ground' : floor === 'F2' ? 'Floor 2' : 'Floor 3 – Top'}
                  </span>
                  <span className="text-xs text-gray-600">({floorSlots.length} slots)</span>
                </div>
                <span className={`text-xs font-medium ${available > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {available} available
                </span>
              </div>
            )}

            {/* Entry / Exit indicators */}
            <div className="flex gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 font-medium">▶ Entry</span>
              <span className="text-xs px-2 py-1 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/25 font-medium">Exit ◀</span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {floorSlots.map(slot => {
                const isSelected = slot.id === selectedSlotId;
                return (
                  <button
                    key={slot.id}
                    onClick={() => onSlotClick?.(slot)}
                    disabled={slot.status === 'occupied'}
                    title={`${slot.label} – ${slot.status}${slot.type === 'ev' ? ' (EV Charging)' : ''}`}
                    className={`
                      slot-btn h-12 relative text-xs
                      ${isSelected ? 'slot-selected' : slotClasses[slot.status]}
                    `}
                  >
                    <span className="block leading-none">
                      {String(slot.number).padStart(2, '0')}
                      {slot.type === 'ev' && (
                        <span className="block text-[8px] text-cyan-400 leading-none mt-0.5">EV</span>
                      )}
                      {slot.type === 'disabled' && (
                        <span className="block text-[8px] text-purple-400 leading-none mt-0.5">♿</span>
                      )}
                    </span>
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-slate-900" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
