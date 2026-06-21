import { useState, useCallback } from 'react';

let toastId = 0;

export default function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, title, message, duration = 4000) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, type, title, message, duration }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (title, message, duration) => addToast('success', title, message, duration),
    error:   (title, message, duration) => addToast('error',   title, message, duration),
    warning: (title, message, duration) => addToast('warning', title, message, duration),
    info:    (title, message, duration) => addToast('info',    title, message, duration),
  };

  return { toasts, toast, removeToast };
}
