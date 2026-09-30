import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Building2, 
  GraduationCap, 
  Calendar, 
  Send, 
  CheckCircle2, 
  FileSpreadsheet, 
  Sparkles, 
  Clock, 
  Layers, 
  Globe, 
  MapPin, 
  ChevronDown, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Course } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface EnrollPageProps {
  courseSlug?: string;
  selectedCourse?: Course | null;
  navigate: (path: string) => void;
  onViewCurriculum?: (course: Course) => void;
}

export const EnrollPage: React.FC<EnrollPageProps> = ({
  courseSlug,
  selectedCourse: propCourse,
  navigate,
  onViewCurriculum
}) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course | null>(propCourse || null);
  const [loading, setLoading] = useState(!propCourse);

  // Candidate Form State
  const [name, setName] = useState(user?.name || '');
  const [mobileNumber, setMobileNumber] = useState(user?.phone || '');
  const [emailAddress, setEmailAddress] = useState(user?.email || '');
  const [collegeName, setCollegeName] = useState(user?.organization || '');
  const [qualification, setQualification] = useState('');
  const [yearOfPassout, setYearOfPassout] = useState('');
  const [preferredMode, setPreferredMode] = useState<'Online' | 'Offline'>('Online');
  const [experienceLevel, setExperienceLevel] = useState<'Fresher' | 'Student' | 'Career Switcher' | 'Experienced Developer'>('Fresher');
  const [whatsappConsent, setWhatsappConsent] = useState(true);

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [courseSelectorOpen, setCourseSelectorOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = () => {
      api.getCourses()
        .then((data) => {
          setCourses(data);
          if (!propCourse) {
            if (courseSlug) {
              const cleanSlug = courseSlug.toLowerCase().replace('/enroll/', '').replace('enroll/', '').trim();
              const matched = data.find(c => 
                (c.slug && c.slug.toLowerCase() === cleanSlug) ||
                c.id.toLowerCase() === cleanSlug ||
                c.id.toLowerCase().replace('crs-', '') === cleanSlug ||
                c.title.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(cleanSlug) ||
                (cleanSlug.includes('java') && c.title.toLowerCase().includes('java')) ||
                (cleanSlug.includes('web') && c.title.toLowerCase().includes('web')) ||
                (cleanSlug.includes('python') && c.title.toLowerCase().includes('python'))
              );
              setCourse(matched || data[0]);
            } else {
              setCourse(data[0]);
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching courses for enrollment:', err);
          setLoading(false);
        });
    };

    fetchCourses();
    window.addEventListener('courses-updated', fetchCourses);
    return () => {
      window.removeEventListener('courses-updated', fetchCourses);
    };
  }, [courseSlug, propCourse]);

  const currentCourse: Course = course || (courses.length > 0 ? courses[0] : {
    id: 'crs-java-fullstack',
    title: 'Java Full Stack Development',
    category: 'FULL STACK',
    description: 'Build modern full-stack applications with Java, Spring Boot, React and databases through practical project-based learning.',
    icon: 'BookOpen',
    modules: ['Core Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker'],
    level: 'Beginner to Pro',
    duration: '16 Weeks (Practical)',
    fee: 'Contact EWD',
    status: 'Open for Enrollment',
    syllabus: [],
    learningOutcomes: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!mobileNumber.trim()) {
      setErrorMessage('Please enter your 10-digit mobile / WhatsApp number.');
      return;
    }
    if (!emailAddress.trim() || !emailAddress.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!collegeName.trim()) {
      setErrorMessage('Please enter your college name or company.');
      return;
    }
    if (!qualification || qualification === 'Select qualification') {
      setErrorMessage('Please select your educational qualification.');
      return;
    }
    if (!yearOfPassout.trim()) {
      setErrorMessage('Please enter your graduation passout year.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const generatedId = `EWD-${(currentCourse.category || 'PRG').substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
      setEnrollmentId(generatedId);

      const payload = {
        courseId: currentCourse.id,
        courseTitle: currentCourse.title,
        courseCategory: currentCourse.category,
        userId: user?.id || '',
        userName: name.trim(),
        userEmail: emailAddress.trim(),
        userPhone: mobileNumber.trim(),
        collegeName: collegeName.trim(),
        qualification: qualification,
        yearOfPassout: yearOfPassout.trim(),
        educationOrJob: `${qualification} - ${collegeName.trim()}`,
        experienceLevel: experienceLevel,
        mode: preferredMode,
        preferredMode: preferredMode,
        preferredBatch: 'Regular' as any,
        notes: `College: ${collegeName.trim()} | Passout: ${yearOfPassout.trim()} | Qualification: ${qualification} | WhatsApp Updates: ${whatsappConsent ? 'Yes' : 'No'} | Mode: ${preferredMode}`,
        status: 'Under Review',
        paymentStatus: 'Pending',
      };

      await api.createEnrollment(payload);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Enrollment error:', err);
      setErrorMessage(err.message || 'Failed to submit enrollment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    navigate('/courses');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
          <div className="w-5 h-5 border-2 border-[#0E7C7B] border-t-transparent rounded-full animate-spin" />
          <span>Loading course admissions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Top Header Bar with Breadcrumb & Course Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => {
              if (onViewCurriculum && currentCourse) {
                onViewCurriculum(currentCourse);
              } else {
                navigate('/courses');
              }
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0E7C7B] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#0E7C7B]" />
            <span>Back to All Courses</span>
          </button>

          {/* Quick Course Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCourseSelectorOpen(!courseSelectorOpen)}
              className="text-xs font-bold text-[#0E7C7B] bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shadow-2xs flex items-center gap-1.5 cursor-pointer hover:border-[#0E7C7B]/40"
            >
              <span>Selected Course: {currentCourse.title}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {courseSelectorOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 space-y-1">
                <div className="text-[11px] font-extrabold text-slate-400 px-3 py-1 uppercase tracking-wider">
                  Select Program
                </div>
                {courses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCourse(c);
                      setCourseSelectorOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-colors font-medium flex items-center justify-between ${
                      c.id === currentCourse.id ? 'bg-[#0E7C7B]/10 text-[#0E7C7B] font-bold' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="truncate">{c.title}</span>
                    {c.id === currentCourse.id && <Check className="w-3.5 h-3.5 text-[#0E7C7B] shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Course Banner Card */}
        <div className="bg-gradient-to-r from-[#12232E] via-[#1F3B4D] to-[#0A5E5D] text-white p-6 sm:p-7 rounded-3xl shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-white/15 text-[#F2A93B] border border-white/20">
              {currentCourse.category}
            </span>
            <span className="text-xs text-gray-300 font-medium">Status: {currentCourse.status || 'Open for Enrollment'}</span>
          </div>

          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
            {currentCourse.title}
          </h1>

          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-2xl">
            {currentCourse.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-white/15 text-xs text-gray-200">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{currentCourse.duration || '16 Weeks'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-teal-300 shrink-0" />
              <span>Telugu & English Mode</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
              <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>100% Practical Labs</span>
            </div>
          </div>
        </div>

        {/* Main Application Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 space-y-6">
          
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#12232E]">
                Enrollment Application Submitted!
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{name}</strong>. Your registration for{' '}
                <strong className="text-[#0E7C7B]">{currentCourse.title}</strong> has been successfully recorded directly into our Excel store.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-left space-y-2 max-w-md mx-auto">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Excel Sheet: Enrollments (Application #{enrollmentId})</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div><span className="font-semibold text-slate-700">Candidate:</span> {name}</div>
                  <div><span className="font-semibold text-slate-700">WhatsApp / Phone:</span> {mobileNumber}</div>
                  <div><span className="font-semibold text-slate-700">Email:</span> {emailAddress}</div>
                  <div><span className="font-semibold text-slate-700">College / Company:</span> {collegeName}</div>
                  <div><span className="font-semibold text-slate-700">Qualification:</span> {qualification} ({yearOfPassout})</div>
                  <div><span className="font-semibold text-slate-700">Instruction Mode:</span> {preferredMode}</div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Explore Other Courses
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                >
                  Home Page
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#0E7C7B] block mb-1">
                  Candidate Enrollment Application
                </span>
                <h3 className="font-heading font-extrabold text-xl text-slate-900">
                  Fill in your details to reserve your batch seat
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  No payment required now. All records persist to the Excel database in the Admin Dashboard.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-xl border border-red-200">
                  {errorMessage}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Candidate Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E7C7B] focus:ring-1 focus:ring-[#0E7C7B]"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E7C7B] focus:ring-1 focus:ring-[#0E7C7B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E7C7B] focus:ring-1 focus:ring-[#0E7C7B]"
                    />
                  </div>
                </div>
              </div>

              {/* College / Organization */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  College / University / Current Company *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="e.g. Osmania University / JNTU / Cognizant"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E7C7B] focus:ring-1 focus:ring-[#0E7C7B]"
                  />
                </div>
              </div>

              {/* Qualification & Year of Passout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Highest Qualification *
                  </label>
                  <div className="relative">
                    <select
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E7C7B] appearance-none pr-8 font-medium text-slate-700"
                    >
                      <option value="" disabled>Select qualification</option>
                      <option value="B.Tech / B.E">B.Tech / B.E</option>
                      <option value="MCA">MCA</option>
                      <option value="BCA">BCA</option>
                      <option value="B.Sc Computer Science / IT">B.Sc Computer Science / IT</option>
                      <option value="M.Tech / M.E">M.Tech / M.E</option>
                      <option value="Degree / Diploma">Degree / Diploma</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Year of Passout *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={yearOfPassout}
                      onChange={(e) => setYearOfPassout(e.target.value)}
                      placeholder="e.g. 2026 / 2025 / 2024"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E7C7B] focus:ring-1 focus:ring-[#0E7C7B]"
                    />
                  </div>
                </div>
              </div>

              {/* Preferred Mode & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Preferred Training Mode:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPreferredMode('Online')}
                      className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                        preferredMode === 'Online'
                          ? 'border-2 border-[#0E7C7B] bg-[#0E7C7B]/5 text-[#0E7C7B]'
                          : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live Online</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredMode('Offline')}
                      className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                        preferredMode === 'Offline'
                          ? 'border-2 border-[#0E7C7B] bg-[#0E7C7B]/5 text-[#0E7C7B]'
                          : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Offline Hyd</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Current Experience Profile:
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E7C7B] font-medium text-slate-700"
                  >
                    <option value="Fresher">Recent Graduate / Fresher</option>
                    <option value="Student">Current College Student</option>
                    <option value="Career Switcher">Non-IT to IT Career Switcher</option>
                    <option value="Experienced Developer">Working IT Professional</option>
                  </select>
                </div>
              </div>

              {/* WhatsApp Consent */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="whatsappConsent"
                  checked={whatsappConsent}
                  onChange={(e) => setWhatsappConsent(e.target.checked)}
                  className="w-4 h-4 text-[#0E7C7B] rounded border-slate-300"
                />
                <label htmlFor="whatsappConsent" className="text-xs text-slate-600 cursor-pointer font-medium">
                  Send batch schedule, syllabus PDF, and class Zoom links via WhatsApp
                </label>
              </div>

              {/* Submit Action */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Persists in Excel: Enrollments</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#0E7C7B] to-[#0A5E5D] hover:from-[#0A5E5D] hover:to-[#074645] text-white font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Application...' : 'Complete Registration & Reserve Seat'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
