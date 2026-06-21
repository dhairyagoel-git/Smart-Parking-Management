// Mock data for Smart Parking System

export const mockUser = {
  id: 'USR001',
  name: 'Arjun Sharma',
  email: 'arjun.sharma@email.com',
  phone: '+91 98765 43210',
  avatar: null,
  vehicles: [
    { id: 'V1', number: 'DL 01 AB 1234', type: 'Car', model: 'Honda City', color: 'White' },
    { id: 'V2', number: 'DL 02 CD 5678', type: 'Motorcycle', model: 'Royal Enfield', color: 'Black' },
  ],
  paymentMethods: [
    { id: 'P1', type: 'UPI', detail: 'arjun@upi', primary: true },
    { id: 'P2', type: 'Card', detail: '**** **** **** 4242', primary: false },
  ],
  role: 'driver',
};

export const mockAdminUser = {
  id: 'ADM001',
  name: 'Priya Mehta',
  email: 'admin@smartpark.in',
  role: 'admin',
};

export const generateSlots = () => {
  const slots = [];
  const floors = ['F1', 'F2', 'F3'];
  const statuses = ['available', 'occupied', 'reserved'];
  const weights = [0.45, 0.35, 0.20];

  floors.forEach(floor => {
    for (let i = 1; i <= 20; i++) {
      const rand = Math.random();
      let status;
      if (rand < weights[0]) status = 'available';
      else if (rand < weights[0] + weights[1]) status = 'occupied';
      else status = 'reserved';

      slots.push({
        id: `${floor}-${String(i).padStart(2, '0')}`,
        floor,
        number: i,
        label: `${floor}-${String(i).padStart(2, '0')}`,
        status,
        type: i <= 2 ? 'disabled' : i <= 5 ? 'ev' : 'standard',
        rate: 30,
      });
    }
  });
  return slots;
};

export const parkingSlots = generateSlots();

export const mockReservations = [
  { id: 'RES001', slotId: 'F1-03', slot: 'F1-03', location: 'SmartPark Central', date: '2025-06-15', startTime: '10:00', endTime: '12:00', duration: 2, cost: 60, status: 'active', vehicle: 'DL 01 AB 1234', bookingId: 'BK20250615001' },
  { id: 'RES002', slotId: 'F2-07', slot: 'F2-07', location: 'SmartPark Central', date: '2025-06-16', startTime: '14:00', endTime: '16:00', duration: 2, cost: 60, status: 'upcoming', vehicle: 'DL 01 AB 1234', bookingId: 'BK20250616002' },
  { id: 'RES003', slotId: 'F1-15', slot: 'F1-15', location: 'SmartPark North', date: '2025-06-10', startTime: '09:00', endTime: '11:00', duration: 2, cost: 60, status: 'completed', vehicle: 'DL 01 AB 1234', bookingId: 'BK20250610003' },
  { id: 'RES004', slotId: 'F3-08', slot: 'F3-08', location: 'SmartPark South', date: '2025-06-08', startTime: '13:00', endTime: '15:00', duration: 2, cost: 60, status: 'completed', vehicle: 'DL 02 CD 5678', bookingId: 'BK20250608004' },
  { id: 'RES005', slotId: 'F2-12', slot: 'F2-12', location: 'SmartPark Central', date: '2025-06-05', startTime: '11:00', endTime: '13:00', duration: 2, cost: 60, status: 'cancelled', vehicle: 'DL 01 AB 1234', bookingId: 'BK20250605005' },
];

export const mockNotifications = [
  { id: 'N1', type: 'success', title: 'Booking Confirmed', message: 'Your slot F1-03 has been reserved for June 15.', time: '2 min ago', read: false },
  { id: 'N2', type: 'info', title: 'Slot Available', message: 'Slot F2-10 is now available near your preferred location.', time: '15 min ago', read: false },
  { id: 'N3', type: 'warning', title: 'Reservation Reminder', message: 'Your parking at F2-07 starts in 1 hour.', time: '45 min ago', read: false },
  { id: 'N4', type: 'success', title: 'Payment Successful', message: 'Payment of ₹60 received for booking BK20250615001.', time: '2 hours ago', read: true },
  { id: 'N5', type: 'info', title: 'New Feature', message: 'EV charging slots now available on Floor 1.', time: '1 day ago', read: true },
  { id: 'N6', type: 'warning', title: 'Slot Expiring', message: 'Your reservation at F1-15 expires in 30 minutes.', time: '2 days ago', read: true },
];

export const adminStats = {
  totalSlots: 60,
  occupancyRate: 73,
  activeReservations: 28,
  revenue: 18450,
  todayRevenue: 2340,
  availableSlots: 16,
  occupiedSlots: 32,
  reservedSlots: 12,
};

export const peakUsageData = {
  labels: ['6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'],
  datasets: [{
    label: 'Occupancy %',
    data: [20, 65, 85, 78, 82, 88, 70, 45, 25],
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59,130,246,0.15)',
    fill: true,
    tension: 0.4,
    pointBackgroundColor: '#3b82f6',
    pointRadius: 4,
  }]
};

export const dailyReservationsData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Reservations',
    data: [34, 42, 38, 51, 49, 62, 41],
    backgroundColor: ['#3b82f6','#60a5fa','#3b82f6','#1d4ed8','#3b82f6','#60a5fa','#3b82f6'],
    borderRadius: 6,
    borderSkipped: false,
  }]
};

export const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Revenue (₹)',
    data: [42000, 38500, 51200, 47800, 53400, 61200],
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34,197,94,0.12)',
    fill: true,
    tension: 0.4,
  }]
};

export const weeklyReportData = [
  { day: 'Monday', reservations: 34, revenue: 2040, occupancy: '57%' },
  { day: 'Tuesday', reservations: 42, revenue: 2520, occupancy: '70%' },
  { day: 'Wednesday', reservations: 38, revenue: 2280, occupancy: '63%' },
  { day: 'Thursday', reservations: 51, revenue: 3060, occupancy: '85%' },
  { day: 'Friday', reservations: 49, revenue: 2940, occupancy: '82%' },
  { day: 'Saturday', reservations: 62, revenue: 3720, occupancy: '95%' },
  { day: 'Sunday', reservations: 41, revenue: 2460, occupancy: '68%' },
];

export const parkingLocations = [
  { id: 'L1', name: 'SmartPark Central', address: 'Connaught Place, New Delhi', distance: '0.3 km', available: 8, total: 20, rating: 4.8 },
  { id: 'L2', name: 'SmartPark North', address: 'Rohini, New Delhi', distance: '1.2 km', available: 12, total: 20, rating: 4.6 },
  { id: 'L3', name: 'SmartPark South', address: 'Saket, New Delhi', distance: '2.1 km', available: 5, total: 20, rating: 4.7 },
];
