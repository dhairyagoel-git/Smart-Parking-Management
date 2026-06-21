import React, { useState } from 'react';
import { Plus, Ban, CheckCircle, Search, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import Modal from '../common/Modal';

export default function SlotManagementPanel() {
  const { slots, setSlots } = useApp();
  const [search, setSearch]         = useState('');
  const [floorF, setFloorF]         = useState('all');
  const [statusF, setStatusF]       = useState('all');
  const [showAdd, setShowAdd]       = useState(false);
  const [newSlot, setNewSlot]       = useState({ floor: 'F1', number: '', type: 'standard' });
  const [confirmDisable, setConfirmDisable] = useState(null);

  const filtered = slots.filter(s =>
    (floorF  === 'all' || s.floor   === floorF)  &&
    (statusF === 'all' || s.status  === statusF) &&
    (!search || s.label.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAdd = () => {
    if (!newSlot.number) return;
    const id = `${newSlot.floor}-${String(newSlot.number).padStart(2,'0')}`;
    if (slots.find(s => s.id === id)) { alert('Slot already exists'); return; }
    setSlots(prev => [...prev, {
      id, floor: newSlot.floor,
      number: Number(newSlot.number),
      label: id, status: 'available',
      type: newSlot.type, rate: 30,
    }]);
    setShowAdd(false);
    setNewSlot({ floor: 'F1', number: '', type: 'standard' });
  };

  const handleDisable = (slotId) => {
    setSlots(prev => prev.map(s => s.id === slotId ? { ...s, status: 'occupied' } : s));
    setConfirmDisable(null);
  };

  const handleEnable = (slotId) => {
    setSlots(prev => prev.map(s => s.id === slotId ? { ...s, status: 'available' } : s));
  };

  return (
    <div className="card rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display font-semibold text-gray-900">Slot Management</h2>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-purple-600/25">
          <Plus size={15} /> Add Slot
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-gray-200 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-40">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search slot…"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 transition-colors" />
        </div>
        <div className="flex gap-1">
          {['all','F1','F2','F3'].map(f => (
            <button key={f} onClick={() => setFloorF(f)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${floorF === f ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              {f === 'all' ? 'All Floors' : f}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {['all','available','occupied','reserved'].map(s => (
            <button key={s} onClick={() => setStatusF(s)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${statusF === s ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              {['Slot ID','Floor','Type','Status','Rate','Actions'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 20).map((s, i) => (
              <tr key={s.id} className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${i % 2 ? 'bg-gray-50' : ''}`}>
                <td className="px-5 py-3 font-mono text-purple-600 font-medium">{s.label}</td>
                <td className="px-5 py-3 text-gray-700">{s.floor}</td>
                <td className="px-5 py-3 text-gray-700 capitalize">{s.type}</td>
                <td className="px-5 py-3"><Badge status={s.status} /></td>
                <td className="px-5 py-3 text-gray-700">₹{s.rate}/hr</td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    {s.status !== 'occupied' ? (
                      <button onClick={() => setConfirmDisable(s.id)}
                        className="flex items-center gap-1 px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs transition-all">
                        <Ban size={11} /> Disable
                      </button>
                    ) : (
                      <button onClick={() => handleEnable(s.id)}
                        className="flex items-center gap-1 px-2.5 py-1 bg-green-50 hover:bg-green-100 text-green-600 border border-green-200 rounded-lg text-xs transition-all">
                        <CheckCircle size={11} /> Enable
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-sm">No slots match your filters.</div>
        )}
        {filtered.length > 20 && (
          <div className="text-center py-3 text-xs text-gray-500">Showing 20 of {filtered.length} slots</div>
        )}
      </div>

      {/* Add Slot Modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add New Parking Slot">
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-700 mb-1.5">Floor</label>
            <select value={newSlot.floor} onChange={e => setNewSlot(p => ({...p, floor: e.target.value}))}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
              <option value="F1">F1 – Ground Floor</option>
              <option value="F2">F2 – Second Floor</option>
              <option value="F3">F3 – Third Floor</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1.5">Slot Number</label>
            <input type="number" min="1" max="99" value={newSlot.number}
              onChange={e => setNewSlot(p => ({...p, number: e.target.value}))}
              placeholder="e.g. 21"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-xs text-gray-700 mb-1.5">Slot Type</label>
            <select value={newSlot.type} onChange={e => setNewSlot(p => ({...p, type: e.target.value}))}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
              <option value="standard">Standard</option>
              <option value="ev">EV Charging</option>
              <option value="disabled">Accessible / Disabled</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl text-sm transition-all">Cancel</button>
            <button onClick={handleAdd} className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-all">Add Slot</button>
          </div>
        </div>
      </Modal>

      {/* Confirm Disable Modal */}
      <Modal open={!!confirmDisable} onClose={() => setConfirmDisable(null)} title="Disable Slot">
        <p className="text-gray-700 text-sm mb-5">Are you sure you want to disable slot <strong className="text-gray-900">{confirmDisable}</strong>? It will be marked as occupied and unavailable for booking.</p>
        <div className="flex gap-3">
          <button onClick={() => setConfirmDisable(null)} className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl text-sm transition-all">Cancel</button>
          <button onClick={() => handleDisable(confirmDisable)} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-all">Disable Slot</button>
        </div>
      </Modal>
    </div>
  );
}
