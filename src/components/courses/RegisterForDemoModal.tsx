import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Video, 
  User, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Course } from '../../types';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';

interface RegisterForDemoModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterForDemoModal: React.FC<RegisterForDemoModalProps> = ({
  course,
  isOpen,
  onClose
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [slot, setSlot] = useState('Weekday Evening (7:00 PM - 8:30 PM)');
  const [currentStatus, setCurrentStatus] = useState('Fresher / Looking for IT Job');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !course) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Please enter your full name and phone number.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.submitContact({
        name: name.trim(),
        email: email.trim() || `${phone.replace(/\D/g, '')}@student-demo.ewd`,
        phone: phone.trim(),
        subject: `Free Demo Request: ${course.title}`,
        message: `Student registered for a Free Live Demo Class for "${course.title}". Preferred slot: ${slot}. Current profile: ${currentStatus}. Course Duration: ${course.duration || 'N/A'}.`,
        category: 'Course Demo Booking',
        status: 'New'
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error('Demo registration error:', err);
      setError(err.message || 'Failed to submit demo registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setError('');
    setName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 bg-[#12232E]/80 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-6 flex flex-col"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#12232E] via-[#1F3B4D] to-[#0E7C7B] text-white p-6 sm:p-7 shrink-0">
            <button
              onClick={handleResetAndClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/15 text-[#F2A93B] border border-white/20">
                <Video className="w-3.5 h-3.5 text-[#F2A93B]" />
                <span>Live Interactive Demo Session</span>
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                Register For Demo
              </h2>

              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                Experience the live teaching format in Telugu & English for <span className="font-bold text-[#F2A93B]">{course.title}</span>.
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-7 space-y-5">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl text-center space-y-4"
              >
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-heading font-extrabold text-xl text-emerald-900">
                    Demo Registration Confirmed!
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                    Thank you <span className="font-bold">{name}</span>! Our technical coordinator will share the demo meeting link on your WhatsApp (<span className="font-bold">{phone}</span>).
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                    {error}
                  </div>
                )}

                <div className="space-y-3.5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Siva Kumar"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0E7C7B] focus:ring-1 focus:ring-[#0E7C7B] transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0E7C7B] focus:ring-1 focus:ring-[#0E7C7B] transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. siva@gmail.com"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0E7C7B] focus:ring-1 focus:ring-[#0E7C7B] transition-all"
                      />
                    </div>
                  </div>

                  {/* Slot Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Preferred Demo Slot
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                        <select
                          value={slot}
                          onChange={(e) => setSlot(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0E7C7B] cursor-pointer"
                        >
                          <option value="Weekday Evening (7:00 PM - 8:30 PM)">Weekday Evening (7:00 PM)</option>
                          <option value="Weekend Morning (10:00 AM - 12:00 PM)">Weekend Morning (10:00 AM)</option>
                          <option value="Weekend Evening (6:00 PM - 8:00 PM)">Weekend Evening (6:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Your Background
                      </label>
                      <select
                        value={currentStatus}
                        onChange={(e) => setCurrentStatus(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0E7C7B] cursor-pointer"
                      >
                        <option value="Fresher / Looking for IT Job">Fresher / Graduate</option>
                        <option value="College Student">College Student</option>
                        <option value="Working Professional / Switching Domains">Working Professional</option>
                        <option value="Non-IT Background / Beginner">Non-IT Background</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Benefits Pill */}
                <div className="p-3 bg-[#E8F2FE] border border-[#BFDBFE] rounded-xl flex items-center gap-2 text-[#1D4ED8] text-xs">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-[#2563EB]" />
                  <span>100% Free Demo Session with zero commitment. Live doubt-clearing included.</span>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 bg-gradient-to-r from-[#0E7C7B] to-[#12232E] hover:opacity-95 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Confirm Demo Registration</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
