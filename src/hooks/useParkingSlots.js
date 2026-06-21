import { useState, useCallback, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function useParkingSlots(autoRefreshMs = 0) {
  const { slots, setSlots } = useApp();
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const simulateRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 800));
    // Randomly flip a few slots to simulate live updates
    setSlots(prev => prev.map(s => {
      const r = Math.random();
      if (r < 0.04 && s.status === 'available') return { ...s, status: 'occupied' };
      if (r < 0.04 && s.status === 'occupied')  return { ...s, status: 'available' };
      return s;
    }));
    setLastRefresh(new Date());
    setRefreshing(false);
  }, [setSlots]);

  useEffect(() => {
    if (!autoRefreshMs) return;
    const t = setInterval(simulateRefresh, autoRefreshMs);
    return () => clearInterval(t);
  }, [autoRefreshMs, simulateRefresh]);

  const available = slots.filter(s => s.status === 'available').length;
  const occupied  = slots.filter(s => s.status === 'occupied').length;
  const reserved  = slots.filter(s => s.status === 'reserved').length;

  const byFloor = (floor) => slots.filter(s => s.floor === floor);

  return {
    slots, available, occupied, reserved,
    byFloor, refreshing, lastRefresh,
    refresh: simulateRefresh,
  };
}
