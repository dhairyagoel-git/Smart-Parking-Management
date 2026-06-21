import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockUser, mockAdminUser, parkingSlots, mockReservations, mockNotifications } from '../data/mockData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [slots, setSlots] = useState(parkingSlots);
  const [reservations, setReservations] = useState(mockReservations);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [lastBooking, setLastBooking] = useState(null);

  const login = useCallback((email, password) => {
    if (email === 'admin@smartpark.in') {
      setUser(mockAdminUser);
      return { success: true, role: 'admin' };
    }
    setUser(mockUser);
    return { success: true, role: 'driver' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setSelectedSlot(null);
  }, []);

  const reserveSlot = useCallback((slotId, details) => {
    const booking = {
      id: `RES${Date.now()}`,
      slotId,
      slot: slotId,
      location: 'SmartPark Central',
      bookingId: `BK${Date.now()}`,
      ...details,
      status: 'upcoming',
      vehicle: mockUser.vehicles[0].number,
    };
    setSlots(prev => prev.map(s => s.id === slotId ? { ...s, status: 'reserved' } : s));
    setReservations(prev => [booking, ...prev]);
    setLastBooking(booking);
    const notif = {
      id: `N${Date.now()}`,
      type: 'success',
      title: 'Booking Confirmed',
      message: `Slot ${slotId} reserved successfully.`,
      time: 'Just now',
      read: false,
    };
    setNotifications(prev => [notif, ...prev]);
    return booking;
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      user, login, logout,
      slots, setSlots,
      reservations, setReservations,
      notifications, markNotificationRead, markAllRead, unreadCount,
      selectedSlot, setSelectedSlot,
      lastBooking, setLastBooking,
      reserveSlot,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
