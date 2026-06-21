export const SLOT_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED:  'occupied',
  RESERVED:  'reserved',
};

export const BOOKING_STATUS = {
  ACTIVE:    'active',
  UPCOMING:  'upcoming',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const VEHICLE_TYPES = ['Car', 'Motorcycle', 'SUV', 'Electric Vehicle', 'Truck'];

export const FLOORS = [
  { id: 'F1', label: 'Floor 1 – Ground' },
  { id: 'F2', label: 'Floor 2' },
  { id: 'F3', label: 'Floor 3 – Top' },
];

export const PARKING_RATE_PER_HOUR = 30; // ₹
export const GST_RATE              = 0.18;
export const SLOT_HOLD_SECONDS     = 300; // 5 minutes
export const REFRESH_INTERVAL_MS  = 30000; // 30 seconds

export const DURATION_OPTIONS = [1, 2, 3, 4, 6, 8];

export const NAV_ITEMS_DRIVER = [
  { to: '/dashboard',     label: 'Dashboard',     icon: 'LayoutDashboard' },
  { to: '/availability',  label: 'Find Parking',  icon: 'Search'          },
  { to: '/map',           label: 'Parking Map',   icon: 'Map'             },
  { to: '/history',       label: 'My Bookings',   icon: 'Clock'           },
  { to: '/notifications', label: 'Notifications', icon: 'Bell'            },
  { to: '/profile',       label: 'Profile',       icon: 'User'            },
];

export const NAV_ITEMS_ADMIN = [
  { to: '/admin',         label: 'Dashboard',          icon: 'LayoutDashboard', end: true },
  { to: '/admin/reports', label: 'Reports & Analytics', icon: 'BarChart3'                  },
];

export const CHART_COLORS = {
  blue:   '#3b82f6',
  green:  '#22c55e',
  red:    '#ef4444',
  yellow: '#f59e0b',
  purple: '#a855f7',
  cyan:   '#06b6d4',
  gridLine:   'rgba(15,23,42,0.06)',
  tickColor:  '#374151',
  labelColor: '#6b7280',
};
