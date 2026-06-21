import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DriverDashboard from './pages/driver/DriverDashboard';
import ParkingAvailability from './pages/driver/ParkingAvailability';
import ParkingMap from './pages/driver/ParkingMap';
import ReservationPage from './pages/driver/ReservationPage';
import BookingConfirmation from './pages/driver/BookingConfirmation';
import NotificationsPage from './pages/driver/NotificationsPage';
import BookingHistory from './pages/driver/BookingHistory';
import ProfilePage from './pages/driver/ProfilePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ReportsPage from './pages/admin/ReportsPage';

// Layouts
import DriverLayout from './layouts/DriverLayout';
import AdminLayout from './layouts/AdminLayout';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }
  return children;
};

const AppRoutes = () => {
  const { user } = useApp();
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} /> : <LoginPage />} />

      {/* Driver routes */}
      <Route path="/" element={<ProtectedRoute requiredRole="driver"><DriverLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<DriverDashboard />} />
        <Route path="availability" element={<ParkingAvailability />} />
        <Route path="map" element={<ParkingMap />} />
        <Route path="reserve" element={<ReservationPage />} />
        <Route path="confirmation" element={<BookingConfirmation />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="history" element={<BookingHistory />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
