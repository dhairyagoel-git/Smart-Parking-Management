import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ParkingCircle, Eye, EyeOff, Car, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // login | register | forgot
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', vehicleNumber: '', vehicleType: 'Car', name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    const result = login(form.email, form.password);
    if (result.success) {
      navigate(result.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError('Invalid credentials. Try any email or admin@smartpark.in for admin.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to home
        </button>

        <div className="card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
              <ParkingCircle size={22} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-gray-900 text-xl">SmartPark</div>
              <div className="text-xs text-gray-600">
                {mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Create account' : 'Reset password'}
              </div>
            </div>
          </div>

          {/* Demo hint */}
          <div className="mb-6 p-3 rounded-xl bg-purple-600/10 border border-purple-500/20 text-xs text-purple-700">
            <strong>Demo:</strong> Use any email/password to log in as driver, or <code className="bg-purple-900/20 px-1 rounded">admin@smartpark.in</code> for admin access.
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Full Name</label>
                <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))}
                  type="text" placeholder="Arjun Sharma"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors" />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Email Address</label>
              <input value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))}
                type="email" placeholder="you@email.com" required
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors" />
            </div>

            {mode !== 'forgot' && (
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))}
                    type={showPass ? 'text' : 'password'} placeholder="••••••••" required
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors" />
                  <button type="button" onClick={() => setShowPass(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Vehicle Number</label>
                  <input value={form.vehicleNumber} onChange={e => setForm(p => ({...p, vehicleNumber: e.target.value}))}
                    type="text" placeholder="DL 01 AB 1234"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Vehicle Type</label>
                  <select value={form.vehicleType} onChange={e => setForm(p => ({...p, vehicleType: e.target.value}))}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors">
                    <option value="Car">Car</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="SUV">SUV</option>
                    <option value="Electric Vehicle">Electric Vehicle</option>
                  </select>
                </div>
              </>
            )}

            {error && <div className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</div>}

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing</>
              ) : mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            {mode === 'login' && (
              <>
                <button onClick={() => setMode('forgot')} className="text-xs text-gray-600 hover:text-purple-600 transition-colors">Forgot password?</button>
                <div className="text-sm text-gray-700">
                  No account? <button onClick={() => setMode('register')} className="text-purple-600 hover:text-purple-700 font-medium">Register here</button>
                </div>
              </>
            )}
            {mode !== 'login' && (
              <button onClick={() => setMode('login')} className="text-sm text-purple-600 hover:text-purple-700">
                Back to sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
