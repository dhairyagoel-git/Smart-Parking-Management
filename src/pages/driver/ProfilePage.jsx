import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Car, CreditCard, Edit3, LogOut, Save, X, Phone, Mail, Plus, Shield, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';

export default function ProfilePage() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [form, setForm] = useState({
    name:  user?.name  || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const Section = ({ title, icon: Icon, children, action }) => (
    <div className="card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-gray-900 flex items-center gap-2">
          <Icon size={16} className="text-purple-600" /> {title}
        </h2>
        {action}
      </div>
      {children}
    </div>
  );

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-5 animate-fade-in-up">
      <PageHeader title="My Profile" subtitle="Manage your account and preferences.">
        {!editing ? (
          <button onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 border border-purple-300 rounded-xl text-sm transition-all">
            <Edit3 size={14} /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setEditing(false)}
              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-sm transition-all">
              <X size={14} />
            </button>
            <button onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm transition-all">
              <Save size={14} /> Save Changes
            </button>
          </div>
        )}
      </PageHeader>

      {saved && (
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center font-medium">
          ✓ Profile updated successfully!
        </div>
      )}

      {/* Avatar + name */}
      <div className="card rounded-2xl p-6 flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white text-3xl font-bold font-display shadow-lg shadow-purple-600/20">
            {user?.name?.charAt(0)}
          </div>
          {editing && (
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Edit3 size={11} />
            </button>
          )}
        </div>
        <div>
          <div className="font-display font-bold text-gray-900 text-xl">{form.name || user?.name}</div>
          <div className="text-gray-600 text-sm">{form.email || user?.email}</div>
          <span className="text-xs text-purple-600 bg-purple-600/10 px-2.5 py-0.5 rounded-full inline-block mt-1.5 font-medium">Driver Account</span>
        </div>
      </div>

      {/* Personal info */}
      <Section title="Personal Information" icon={User}>
        {editing ? (
          <div className="space-y-4">
            <Input label="Full Name"     icon={User}  value={form.name}  onChange={e => setForm(p => ({...p, name: e.target.value}))}  placeholder="Your full name"    />
            <Input label="Email Address" icon={Mail}  value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} placeholder="your@email.com" type="email" />
            <Input label="Phone Number"  icon={Phone} value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} placeholder="+91 98765 43210" type="tel" />
          </div>
        ) : (
          <div className="space-y-3">
            {[
              { icon: Mail,  label: 'Email',  value: user?.email },
              { icon: Phone, label: 'Phone',  value: user?.phone },
              { icon: Shield,label: 'Account',value: 'Driver · Active' },
            ].map(({ icon: Icon, label, value }, idx) => (
              <div key={idx} className="flex items-center gap-3 py-2 border-b border-gray-200 last:border-0">
                <div className="w-8 h-8 rounded-lg bg-gray-200/50 flex items-center justify-center">
                  <Icon size={14} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">{label}</p>
                  <p className="text-sm text-gray-900">{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Vehicles */}
      <Section title="My Vehicles" icon={Car}
        action={<button className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 transition-colors"><Plus size={12} /> Add</button>}>
        <div className="space-y-3">
          {user?.vehicles?.map(v => (
            <div key={v.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-100/50 hover:bg-gray-200/50 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-gray-200/50 flex items-center justify-center">
                <Car size={18} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm font-mono">{v.number}</p>
                <p className="text-xs text-gray-600">{v.model} · {v.color} · {v.type}</p>
              </div>
              <ChevronRight size={14} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </Section>

      {/* Payment Methods */}
      <Section title="Payment Methods" icon={CreditCard}
        action={<button className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 transition-colors"><Plus size={12} /> Add</button>}>
        <div className="space-y-3">
          {user?.paymentMethods?.map(p => (
            <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-100/50 hover:bg-gray-200/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-gray-200/50 flex items-center justify-center text-lg">
                {p.type === 'UPI' ? '₹' : '💳'}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{p.type}</p>
                <p className="text-xs text-gray-600 font-mono">{p.detail}</p>
              </div>
              {p.primary && (
                <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/25 rounded-full px-2.5 py-0.5 font-medium">Primary</span>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Logout */}
      <button onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-2xl text-sm font-medium transition-all">
        <LogOut size={16} /> Sign Out of Account
      </button>
    </div>
  );
}
