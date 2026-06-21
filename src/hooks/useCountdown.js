import { useState, useEffect, useCallback } from 'react';

export default function useCountdown(initialSeconds = 300) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, running]);

  const reset = useCallback((s = initialSeconds) => {
    setSeconds(s);
    setRunning(true);
  }, [initialSeconds]);

  const pause  = useCallback(() => setRunning(false), []);
  const resume = useCallback(() => setRunning(true),  []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return {
    seconds,
    display: `${mm}:${ss}`,
    expired: seconds <= 0,
    urgent:  seconds > 0 && seconds < 60,
    percent: (seconds / initialSeconds) * 100,
    reset, pause, resume,
  };
}
