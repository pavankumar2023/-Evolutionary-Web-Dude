import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import { BrandLogo } from '../components/common/BrandLogo';

interface AdminAuthPageProps {
  navigate: (path: string) => void;
}

export const AdminAuthPage: React.FC<AdminAuthPageProps> = ({ navigate }) => {
  const { login, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login({ email, password, role: 'ADMIN' });
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Admin authentication failed');
    }
  };

  return (
    <div id="admin-auth-root" className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#12232E] via-[#1F3B4D] to-[#0A5E5D]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 space-y-6 relative overflow-hidden">
        
        {/* Top Decorative accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#F2A93B] via-[#0E7C7B] to-[#F2A93B]" />

        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <BrandLogo size="sm" />
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#12232E] text-[#F2A93B] flex items-center justify-center mx-auto shadow-lg border border-[#F2A93B]/30">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1F3B4D]">
            Admin Master Portal
          </h2>

          <p className="text-xs text-gray-500">
            Evolutionary Web Dude Executive & Data Operations
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
              Admin Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@domain.com"
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
              Admin Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#12232E] hover:bg-[#1F3B4D] text-[#F2A93B] font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            {loading ? 'Authenticating Admin...' : 'Enter Master Dashboard'}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => navigate('/user/login')}
            className="text-xs text-gray-500 hover:text-[#0E7C7B]"
          >
            Not an admin? Return to Student / User Login
          </button>
        </div>

      </div>
    </div>
  );
};
