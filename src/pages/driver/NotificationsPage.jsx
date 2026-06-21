import React from 'react';
import { Bell, CheckCheck, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';

const typeConfig = {
  success: { icon: CheckCircle,  color: 'text-green-400',  bg: 'bg-green-400/10',  border: 'border-green-400/20'  },
  warning: { icon: AlertTriangle,color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
  info:    { icon: Info,          color: 'text-purple-600',   bg: 'bg-purple-600/10',   border: 'border-purple-600/20'   },
  error:   { icon: XCircle,       color: 'text-red-400',    bg: 'bg-red-400/10',    border: 'border-red-400/20'    },
};

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllRead, unreadCount } = useApp();

  const unread = notifications.filter(n => !n.read);
  const read   = notifications.filter(n =>  n.read);

  const NotifCard = ({ n }) => {
    const cfg  = typeConfig[n.type] || typeConfig.info;
    const Icon = cfg.icon;
    return (
      <div onClick={() => markNotificationRead(n.id)}
        className={`card rounded-2xl p-4 flex gap-4 cursor-pointer transition-all hover:bg-gray-50
          ${!n.read ? `border ${cfg.border}` : 'opacity-60'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
          <Icon size={18} className={cfg.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <span className="font-semibold text-gray-900 text-sm">{n.title}</span>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {!n.read && <span className="w-2 h-2 rounded-full bg-purple-600" />}
              <span className="text-xs text-gray-600 whitespace-nowrap">{n.time}</span>
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">{n.message}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 animate-fade-in-up">
      <PageHeader title="Notifications" subtitle={`${unreadCount} unread`}>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 border border-purple-300 rounded-xl text-sm transition-all">
            <CheckCheck size={14} /> Mark all read
          </button>
        )}
      </PageHeader>

      {notifications.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description="You're all caught up! We'll notify you about your reservations and slot updates." />
      ) : (
        <>
          {unread.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">New</h2>
              {unread.map(n => <NotifCard key={n.id} n={n} />)}
            </div>
          )}
          {read.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mt-2">Earlier</h2>
              {read.map(n => <NotifCard key={n.id} n={n} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
