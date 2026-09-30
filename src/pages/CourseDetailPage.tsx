import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Layers, 
  Sparkles, 
  Star, 
  Globe, 
  Monitor, 
  CheckCircle2, 
  Video, 
  Download, 
  FileText, 
  Check, 
  Tag, 
  Share2,
  BookmarkCheck
} from 'lucide-react';
import { Course } from '../types';
import { api } from '../services/api';
import { FRONTLINES_COURSES } from '../data/frontlinesCoursesData';
import { RegisterForDemoModal } from '../components/courses/RegisterForDemoModal';

interface CourseDetailPageProps {
  courseSlug?: string;
  selectedCourse?: Course | null;
  navigate: (path: string) => void;
  onEnrollCourse: (course: Course) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  courseSlug,
  selectedCourse: propCourse,
  navigate,
  onEnrollCourse
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course | null>(propCourse || null);
  const [loading, setLoading] = useState(!propCourse);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Helper to resolve slug
  const getSlugFromCourse = (c: Course): string => {
    if (c.slug) {
      if (c.slug === 'frontend-development' || c.slug === 'frontend-dev' || c.slug === 'web-dev') return 'web-dev';
      return c.slug;
    }
    const cid = (c.id || '').toLowerCase();
    const ctitle = (c.title || '').toLowerCase();
    if (cid.includes('flm-')) return cid.replace('flm-', '');
    if (cid.includes('java') || ctitle.includes('java')) return 'java-full-stack';
    if (cid.includes('web') || ctitle.includes('web') || cid.includes('frontend') || ctitle.includes('frontend')) return 'web-dev';
    if (cid.includes('python') || ctitle.includes('python') || cid.includes('data') || ctitle.includes('data')) return 'python-dev';
    if (cid.includes('marketing') || ctitle.includes('marketing')) return 'digital-marketing';
    if (cid.includes('software') || ctitle.includes('software')) return 'software-dev';
    if (cid.includes('project') || ctitle.includes('project')) return 'practical-projects';
    return cid.replace('crs-', '');
  };

  useEffect(() => {
    if (propCourse) {
      setCourse(propCourse);
      setLoading(false);
    }
  }, [propCourse]);

  useEffect(() => {
    const fetchCourseData = () => {
      api.getCourses()
        .then((data) => {
          const combined = [...data, ...FRONTLINES_COURSES];
          setCourses(combined);

          // Always try to get the freshest version from API (has syllabusFile etc.)
          if (propCourse) {
            // Find the fresh version of the prop course by id to get syllabusFile
            const fresh = combined.find(c => c.id === propCourse.id);
            if (fresh) {
              setCourse(fresh);
            } else {
              setCourse(propCourse);
            }
          } else if (courseSlug) {
            const clean = courseSlug.toLowerCase()
              .replace('/courses/', '')
              .replace('/course/', '')
              .replace('courses/', '')
              .replace('course/', '')
              .trim();

            const matched = combined.find(c => {
              const cSlug = getSlugFromCourse(c);
              return cSlug === clean ||
                c.id.toLowerCase() === clean ||
                c.id.toLowerCase().replace('flm-', '') === clean ||
                c.id.toLowerCase().replace('crs-', '') === clean ||
                c.title.toLowerCase().includes(clean) ||
                clean.includes(cSlug);
            });

            if (matched) {
              setCourse(matched);
            } else {
              setCourse(combined[0] || null);
            }
          } else {
            setCourse(combined[0] || null);
          }

          setLoading(false);
        })
        .catch((err) => {
          console.error('Error loading course details:', err);
          setCourses(FRONTLINES_COURSES);
          if (!propCourse) setCourse(FRONTLINES_COURSES[0] || null);
          setLoading(false);
        });
    };

    fetchCourseData();
    window.addEventListener('courses-updated', fetchCourseData);
    return () => {
      window.removeEventListener('courses-updated', fetchCourseData);
    };
  }, [courseSlug, propCourse]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#0E7C7B] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-500">Loading course details...</p>
      </div>
    );
  }

  const currentCourse = course || (courses.length > 0 ? courses[0] : null);

  if (!currentCourse) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <Layers className="w-12 h-12 text-gray-400" />
        <h2 className="text-2xl font-bold text-gray-800">Course Not Found</h2>
        <p className="text-gray-500 max-w-md">The course you are looking for could not be found or has been removed.</p>
        <button
          onClick={() => navigate('/courses')}
          className="mt-4 px-6 py-2.5 bg-[#0E7C7B] text-white font-semibold rounded-xl shadow hover:bg-[#0c6b6a] transition"
        >
          Browse All Courses
        </button>
      </div>
    );
  }

  // Normalize parsed modules list
  const parsedModules: string[] = (() => {
    if (Array.isArray(currentCourse.modules) && currentCourse.modules.length > 0) {
      return currentCourse.modules.flatMap(m => typeof m === 'string' ? m.split(',') : []).map(m => m.trim()).filter(Boolean);
    }
    if (typeof (currentCourse as any).modules === 'string') {
      return ((currentCourse as any).modules as string).split(',').map(m => m.trim()).filter(Boolean);
    }
    return [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Responsive Design',
      'Git',
      'GitHub',
      'TypeScript',
      'React 18',
      'Tailwind CSS',
      'Framer Motion'
    ];
  })();

  // Normalize parsed learning outcomes list
  const parsedOutcomes: string[] = (() => {
    if (Array.isArray(currentCourse.learningOutcomes) && currentCourse.learningOutcomes.length > 0) {
      return currentCourse.learningOutcomes.flatMap(o => typeof o === 'string' ? o.split('\n') : []).map(o => o.trim()).filter(Boolean);
    }
    if (typeof (currentCourse as any).learningOutcomes === 'string') {
      return ((currentCourse as any).learningOutcomes as string).split('\n').map(o => o.trim()).filter(Boolean);
    }
    return [
      'Master responsive web engineering without framework lock-in',
      'Build rich single-page applications with React and TypeScript',
      'Implement micro-animations, glassmorphism, and modern SaaS design patterns'
    ];
  })();

  const syllabusFileName = currentCourse.syllabusFileName || `${currentCourse.title.replace(/\s+/g, '-')}-Syllabus.pdf`;

  // Download syllabus handler — downloads the real uploaded PDF if available
  const handleDownloadSyllabus = () => {
    const fileName = currentCourse.syllabusFileName || `${currentCourse.title.replace(/\s+/g, '-')}-Syllabus.pdf`;

    // If the course has a real uploaded file (base64 data URL), download it directly as-is
    if (currentCourse.syllabusFile && currentCourse.syllabusFile.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = currentCourse.syllabusFile;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // No PDF uploaded yet — show a message instead of downloading a fake file
    alert(`No syllabus PDF has been uploaded for "${currentCourse.title}" yet.\n\nPlease ask the admin to upload the PDF syllabus document in the course settings.`);
  };

  const handleShareCourse = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <motion.div 
      id="course-detail-view" 
      className="min-h-screen bg-[#F8FAFC] pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      
      {/* 1. TOP NAVIGATION / BREADCRUMB HEADER */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#0E7C7B] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Courses</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleShareCourse}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => onEnrollCourse(currentCourse)}
              className="px-4 py-1.5 bg-[#F2A93B] hover:bg-[#D98E20] text-[#12232E] font-extrabold text-xs rounded-lg shadow-xs transition-all cursor-pointer"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN COURSE HERO & ATTRIBUTES SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: TITLE, BADGES, DESCRIPTION, ATTRIBUTES & CTAS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Badges Bar: Category + Popular / Featured Tag */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-extrabold tracking-wide uppercase">
                <Tag className="w-3.5 h-3.5 text-indigo-600" />
                <span>{currentCourse.category || 'FRONTEND'}</span>
              </span>

              {currentCourse.isPopular && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-extrabold tracking-wide shadow-2xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>Featured Program</span>
                </span>
              )}
            </div>

            {/* Course Title */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#12232E] tracking-tight leading-tight">
              {currentCourse.title}
            </h1>

            {/* Course Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {currentCourse.description}
            </p>

            {/* Real-time Key Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {/* Duration */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Duration</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                    {currentCourse.duration || '12 Weeks'}
                  </span>
                </div>
              </div>

              {/* Enrollment Status */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Status</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-700 truncate block">
                    {currentCourse.status || 'Open for Enrollment'}
                  </span>
                </div>
              </div>

              {/* Training Mode */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Monitor className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Mode</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                    {currentCourse.mode || 'Live Online'}
                  </span>
                </div>
              </div>

              {/* Cohort Language */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Language</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                    {currentCourse.language || 'Telugu & English'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onEnrollCourse(currentCourse)}
                className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Enroll Course</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setDemoModalOpen(true)}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-[#12232E] font-bold text-sm sm:text-base rounded-2xl border border-slate-300 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Video className="w-4 h-4 text-blue-600" />
                <span>Register For Demo</span>
              </motion.button>
            </div>

          </div>

          {/* RIGHT COLUMN: BANNER DISPLAY & SYLLABUS DOWNLOAD CARD */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Banner Display Card */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-[#12232E] relative group">
              {currentCourse.bannerImage ? (
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img 
                    src={currentCourse.bannerImage} 
                    alt={currentCourse.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-extrabold tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md">
                      {currentCourse.category || 'FRONTEND'}
                    </span>
                    <span className="font-bold text-emerald-400">
                      {currentCourse.duration || '12 Weeks'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="aspect-video w-full bg-gradient-to-br from-[#12232E] via-[#1B3A4B] to-[#0A5E5D] p-6 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md bg-white/10 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                      {currentCourse.category || 'FRONTEND'}
                    </span>
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl text-white">
                      {currentCourse.title}
                    </h3>
                    <p className="text-xs text-gray-300 mt-1 font-medium">
                      {currentCourse.duration} • {currentCourse.mode || 'Live Online'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Upload Syllabus / Syllabus File Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900">
                      Official Course Syllabus
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Verified Curriculum &amp; Learning Roadmap
                    </span>
                  </div>
                </div>

                {currentCourse.syllabusFile ? (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-extrabold uppercase border border-emerald-200/60">
                    PDF Ready
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-extrabold uppercase border border-slate-200/60">
                    Auto
                  </span>
                )}
              </div>

              {/* File Info Box */}
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <BookmarkCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {currentCourse.syllabusFileName || `${currentCourse.title.replace(/\s+/g, '-')}-Syllabus.pdf`}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-semibold shrink-0">
                  {currentCourse.syllabusFile ? 'PDF Document' : 'Not Uploaded'}
                </span>
              </div>

              {/* Download Syllabus Action Button */}
              <motion.button
                whileHover={currentCourse.syllabusFile ? { scale: 1.01 } : {}}
                whileTap={currentCourse.syllabusFile ? { scale: 0.98 } : {}}
                onClick={handleDownloadSyllabus}
                title={currentCourse.syllabusFile ? `Download ${currentCourse.syllabusFileName || 'Syllabus PDF'}` : 'No PDF uploaded yet — contact admin'}
                className={`w-full py-3 font-bold text-xs sm:text-sm rounded-xl border transition-colors flex items-center justify-center gap-2 ${
                  currentCourse.syllabusFile
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700 cursor-pointer shadow-md'
                    : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Download Syllabus PDF</span>
              </motion.button>
            </div>

          </div>

        </div>
      </div>

      {/* 3. REAL-TIME MODULES & LEARNING OUTCOMES CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        
        {/* MODULES (COMMA SEPARATED) SECTION */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600">
                <Layers className="w-4 h-4" />
                <span>Curriculum Stack</span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight">
                Modules & Technologies Covered
              </h2>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs border border-blue-200/60">
              {parsedModules.length} Modules Included
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {parsedModules.map((mod, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 hover:border-blue-400 hover:bg-white hover:shadow-sm transition-all flex items-center gap-2.5 group cursor-default"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-100/70 text-blue-700 text-[11px] font-extrabold flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {idx + 1}
                </div>
                <span className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-700 transition-colors">
                  {mod}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* LEARNING OUTCOMES (ONE PER LINE) SECTION */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="space-y-1 border-b border-slate-100 pb-5">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Concrete Outcomes</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight">
              Learning Outcomes & Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Skills, architectures, and production abilities you will possess upon graduation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {parsedOutcomes.map((outcome, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                whileHover={{ y: -3 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-white to-emerald-50/30 border border-emerald-100 shadow-2xs space-y-3"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-extrabold text-xs shadow-2xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  {outcome}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* 4. REGISTER FOR DEMO MODAL */}
      <RegisterForDemoModal
        course={currentCourse}
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />

    </motion.div>
  );
};
