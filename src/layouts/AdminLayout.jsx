import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BarChart3, ParkingCircle, LogOut, Menu, X, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/reports', icon: BarChart3, label: 'Reports & Analytics' },
];

export default function AdminLayout() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
            <ParkingCircle size={22} className="text-white" />
          </div>
          <div>
            <div className="font-display font-bold text-gray-900 text-lg leading-none">SmartPark</div>
            <div className="text-xs text-purple-600 mt-0.5">Admin Portal</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200/50'
              }`
            }>
            <Icon size={18} /><span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">{user?.name}</div>
            <div className="text-xs text-purple-600">Administrator</div>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <aside className="hidden lg:flex flex-col w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0">
        <SidebarContent />
      </aside>
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="relative w-72 bg-white flex flex-col shadow-2xl">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"><X size={20} /></button>
            <SidebarContent />
          </aside>
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden flex items-center gap-4 px-4 py-3 bg-white border-b border-gray-200">
          <button onClick={() => setOpen(true)} className="text-gray-600 hover:text-gray-900"><Menu size={22} /></button>
          <div className="flex items-center gap-2">
            <ParkingCircle size={20} className="text-purple-600" />
            <span className="font-display font-bold text-gray-900">SmartPark Admin</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto"><Outlet /></main>
      </div>
    </div>
  );
}
