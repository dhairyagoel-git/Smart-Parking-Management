import React from 'react';
import { Navigate } from 'react-router-dom';

// Layouts
import DriverLayout from '../layouts/DriverLayout';
import AdminLayout  from '../layouts/AdminLayout';

// Public pages
import LandingPage from '../pages/LandingPage';
import LoginPage   from '../pages/LoginPage';

// Driver pages
import DriverDashboard    from '../pages/driver/DriverDashboard';
import ParkingAvailability from '../pages/driver/ParkingAvailability';
import ParkingMap          from '../pages/driver/ParkingMap';
import ReservationPage     from '../pages/driver/ReservationPage';
import BookingConfirmation from '../pages/driver/BookingConfirmation';
import NotificationsPage   from '../pages/driver/NotificationsPage';
import BookingHistory      from '../pages/driver/BookingHistory';
import ProfilePage         from '../pages/driver/ProfilePage';

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import ReportsPage    from '../pages/admin/ReportsPage';

// Route guard
import { useApp } from '../context/AppContext';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }
  return children;
};

/**
 * Route config used by App.jsx.
 * Exported for reference / testing.
 */
export const routes = {
  public: [
    { path: '/',      element: LandingPage },
    { path: '/login', element: LoginPage   },
  ],
  driver: {
    layout: DriverLayout,
    role: 'driver',
    children: [
      { path: 'dashboard',    element: DriverDashboard     },
      { path: 'availability', element: ParkingAvailability },
      { path: 'map',          element: ParkingMap           },
      { path: 'reserve',      element: ReservationPage      },
      { path: 'confirmation', element: BookingConfirmation  },
      { path: 'notifications',element: NotificationsPage    },
      { path: 'history',      element: BookingHistory       },
      { path: 'profile',      element: ProfilePage          },
    ],
  },
  admin: {
    layout: AdminLayout,
    role: 'admin',
    basePath: '/admin',
    children: [
      { path: '',        element: AdminDashboard, index: true },
      { path: 'reports', element: ReportsPage                 },
    ],
  },
};
