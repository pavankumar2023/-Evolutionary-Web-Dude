import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Building, 
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import { BrandLogo } from '../components/common/BrandLogo';

interface UserAuthPageProps {
  initialMode?: 'login' | 'register';
  navigate: (path: string) => void;
}

export const UserAuthPage: React.FC<UserAuthPageProps> = ({ initialMode = 'login', navigate }) => {
  const { login, register, loading } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    organization: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        if (!formData.email || !formData.password) {
          setError('Please provide email and password.');
          return;
        }
        await login({ email: formData.email, password: formData.password });
        navigate('/user/dashboard');
      } else {
        if (!formData.email || !formData.password || !formData.name) {
          setError('Please provide your name, email, and password.');
          return;
        }
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          organization: formData.organization,
          role: 'USER'
        });
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        navigate('/user/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <div id="user-auth-root" className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#F7FAFA] to-[#EAF3F3]/40">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#EAF3F3] space-y-6">
        
        {/* Header & Logo */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <BrandLogo size="sm" />
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1F3B4D]">
            {mode === 'login' ? 'Student & Client Sign In' : 'Create Student Account'}
          </h2>

          <p className="text-xs text-gray-500">
            {mode === 'login' 
              ? 'Access your enrolled courses, consultations, and digital downloads' 
              : 'Join Evolutionary Web Dude to track projects and courses'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-[#F7FAFA] border border-[#EAF3F3] rounded-2xl">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'login'
                ? 'bg-[#0E7C7B] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#0E7C7B]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError('');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'register'
                ? 'bg-[#0E7C7B] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#0E7C7B]'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Anand Sharma"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@domain.com"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
              />
            </div>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98480 12345"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                  College or Organization
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={e => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Osmania Univ / Tech Org"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {loading 
              ? 'Signing In...' 
              : mode === 'login' ? 'Sign In to Dashboard' : 'Complete Registration'}
          </button>
        </form>

      </div>
    </div>
  );
};
