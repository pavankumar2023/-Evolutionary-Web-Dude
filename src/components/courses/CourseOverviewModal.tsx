import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Clock, 
  BarChart2, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  Award, 
  Send,
  Video,
  FileSpreadsheet
} from 'lucide-react';
import { Course } from '../../types';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';

interface CourseOverviewModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onStartLearning: (course: Course) => void;
  accentColor?: string;
}

export const CourseOverviewModal: React.FC<CourseOverviewModalProps> = ({
  course,
  isOpen,
  onClose,
  onStartLearning,
  accentColor = '#0E7C7B'
}) => {
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [demoName, setDemoName] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoSlot, setDemoSlot] = useState('Weekday Evening (7:00 PM)');
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);
  const [demoError, setDemoError] = useState('');

  if (!isOpen || !course) return null;

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoName.trim() || !demoPhone.trim()) {
      setDemoError('Please provide your name and phone number.');
      return;
    }

    setDemoSubmitting(true);
    setDemoError('');

    try {
      await api.submitContact({
        name: demoName,
        email: demoEmail || `${demoPhone}@student-demo.ewd`,
        phone: demoPhone,
        subject: `Free Demo Request: ${course.title}`,
        message: `Student requested a Free Live Demo Class for "${course.title}". Preferred slot: ${demoSlot}. Course Duration: ${course.duration}.`,
        category: 'Course Demo Booking',
        status: 'New'
      });

      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });

      setDemoSuccess(true);
    } catch (err: any) {
      setDemoError(err.message || 'Failed to submit demo request. Please try again.');
    } finally {
      setDemoSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setShowDemoForm(false);
    setDemoSuccess(false);
    setDemoError('');
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
          onClick={resetAndClose}
          className="fixed inset-0 bg-[#12232E]/75 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-6 max-h-[92vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="relative bg-gradient-to-r from-[#12232E] via-[#1F3B4D] to-[#0A5E5D] text-white p-6 sm:p-7 shrink-0">
            <button
              onClick={resetAndClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/15 text-[#F2A93B] border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
                <span>Course Overview & Curriculum Details</span>
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                {course.title}
              </h2>

              <p className="text-xs sm:text-sm text-gray-200 max-w-2xl leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-5 pt-4 border-t border-white/15">
              <div className="flex items-center gap-2 text-xs text-gray-200 font-semibold">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-sky-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium uppercase">Duration</div>
                  <div className="text-white font-bold">{course.duration}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-200 font-semibold border-l border-white/15 pl-2 sm:pl-4">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium uppercase">Skill Level</div>
                  <div className="text-white font-bold">{course.level}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-200 font-semibold border-l border-white/15 pl-2 sm:pl-4">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium uppercase">Practical Work</div>
                  <div className="text-white font-bold">Real-World Projects</div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
            
            {/* Inline Free Demo Booking Form if toggled */}
            {showDemoForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-5 sm:p-6 bg-gradient-to-br from-sky-50 via-blue-50/50 to-teal-50/50 border-2 border-sky-300 rounded-3xl space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sky-900 font-extrabold text-base">
                    <Video className="w-5 h-5 text-sky-600" />
                    <span>Book Your Free Live Demo Session</span>
                  </div>
                  <button
                    onClick={() => setShowDemoForm(false)}
                    className="text-xs text-gray-500 hover:text-gray-800 font-bold"
                  >
                    Cancel
                  </button>
                </div>

                {demoSuccess ? (
                  <div className="p-4 bg-white rounded-2xl border border-emerald-300 flex items-center gap-3 text-emerald-800">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-extrabold text-sm">Demo Class Confirmed!</div>
                      <div className="text-xs text-gray-600">
                        Our technical coordinator will share the demo meeting link on your WhatsApp ({demoPhone}).
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleDemoSubmit} className="space-y-3">
                    <div className="text-xs text-gray-600">
                      Experience the live interactive class format in Telugu & English with an industry mentor for free.
                    </div>

                    {demoError && (
                      <div className="p-2.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl">
                        {demoError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Your Full Name *</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            required
                            value={demoName}
                            onChange={(e) => setDemoName(e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-sky-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Phone / WhatsApp Number *</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                          <input
                            type="tel"
                            required
                            value={demoPhone}
                            onChange={(e) => setDemoPhone(e.target.value)}
                            placeholder="e.g. 9876543210"
                            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-sky-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                          <input
                            type="email"
                            value={demoEmail}
                            onChange={(e) => setDemoEmail(e.target.value)}
                            placeholder="rahul@example.com"
                            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-sky-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Preferred Time Slot *</label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                          <select
                            value={demoSlot}
                            onChange={(e) => setDemoSlot(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-sky-500"
                          >
                            <option value="Weekday Evening (7:00 PM)">Weekday Evening (7:00 PM)</option>
                            <option value="Weekday Morning (8:00 AM)">Weekday Morning (8:00 AM)</option>
                            <option value="Saturday Special (11:00 AM)">Saturday Special (11:00 AM)</option>
                            <option value="Sunday Masterclass (6:00 PM)">Sunday Masterclass (6:00 PM)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-sky-700 font-medium flex items-center gap-1.5">
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>Recorded in Admin Excel store</span>
                      </span>

                      <button
                        type="submit"
                        disabled={demoSubmitting}
                        className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{demoSubmitting ? 'Confirming...' : 'Confirm Demo Slot'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}

            {/* Core Modules & Technology Stack Covered */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1F3B4D] flex items-center gap-2">
                <span>Modules & Technologies Covered</span>
                <span className="text-[10px] text-gray-400 font-normal">({course.modules.length} Core Topics)</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {course.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7FAFA] border border-[#EAF3F3] text-xs font-semibold text-[#1F3B4D]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phased Curriculum Breakdown */}
            {course.syllabus && course.syllabus.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1F3B4D]">
                  Curriculum Learning Roadmap
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.syllabus.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-[#0E7C7B]/10 text-[#0E7C7B]">
                          {item.week}
                        </span>
                      </div>
                      <div className="font-heading font-bold text-xs text-[#1F3B4D]">
                        {item.topic}
                      </div>
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What You Will Achieve / Career Readiness */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200 space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>What You Will Achieve Upon Completion</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>Direct hands-on experience on live industry capstone projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>ATS-compliant resume preparation, portfolio review & GitHub repository building</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>Verified course completion certificate and 100% placement interview referrals</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Modal Action Bar with the TWO REQUIRED BUTTONS */}
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0E7C7B] bg-[#0E7C7B]/10 px-3.5 py-2 rounded-xl border border-[#0E7C7B]/20">
              <Sparkles className="w-4 h-4 text-[#F2A93B]" />
              <span>Interactive Live Sessions & Practical Projects</span>
            </div>

            {/* The Two Action Buttons: Book a Free Demo & Start Learning Now */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              
              {/* Button 1: Book a Free Demo */}
              <button
                type="button"
                onClick={() => setShowDemoForm(!showDemoForm)}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl border-2 border-[#0E7C7B] text-[#0E7C7B] hover:bg-[#0E7C7B]/10 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Video className="w-4 h-4 text-[#0E7C7B]" />
                <span>Book a Free Demo</span>
              </button>

              {/* Button 2: Start Learning Now (Opens Enroll Form) */}
              <button
                type="button"
                onClick={() => {
                  resetAndClose();
                  onStartLearning(course);
                }}
                className="flex-1 sm:flex-none px-7 py-3 rounded-xl bg-gradient-to-r from-[#0E7C7B] to-[#0A5E5D] hover:from-[#0A5E5D] hover:to-[#074645] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-[#0E7C7B]/25 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#F2A93B]" />
                <span>Start Learning Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
