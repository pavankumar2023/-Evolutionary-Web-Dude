import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Layers
} from 'lucide-react';
import { api } from '../services/api';
import { Course, ServiceDetail } from '../types';
import { servicesList, ServiceCardData } from '../data/servicesData';
import { ServiceWaveCard } from '../components/services/ServiceWaveCard';
import { ServiceDetailModal } from '../components/services/ServiceDetailModal';

interface ServicesPageProps {
  navigate: (path: string) => void;
  onEnroll?: (course: Course) => void;
  onEnrollCourse?: (course: Course) => void;
  onViewCurriculum?: (course: Course) => void;
  onOpenQuoteModal?: (service: ServiceDetail) => void;
  onRequestQuote?: (service?: ServiceDetail) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  navigate,
  onEnroll,
  onEnrollCourse,
  onViewCurriculum,
  onOpenQuoteModal,
  onRequestQuote
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCourseTab, setActiveCourseTab] = useState('All');
  const [activeViewMode, setActiveViewMode] = useState<'services' | 'programs'>('services');
  const [selectedDetailService, setSelectedDetailService] = useState<ServiceCardData | null>(null);

  const handleEnroll = (course: Course) => {
    if (onEnrollCourse) {
      onEnrollCourse(course);
    } else if (onEnroll) {
      onEnroll(course);
    } else {
      navigate('/enroll');
    }
  };

  const handleCurriculum = (course: Course) => {
    if (onViewCurriculum) {
      onViewCurriculum(course);
    } else {
      navigate('/courses');
    }
  };

  const handleOpenQuote = (service: ServiceDetail) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(service);
    } else if (onRequestQuote) {
      onRequestQuote(service);
    } else {
      navigate('/contact');
    }
  };

  useEffect(() => {
    const loadCourses = () => {
      api.getCourses()
        .then(data => setCourses(data))
        .catch(err => console.error('Failed to load courses', err));
    };

    loadCourses();
    window.addEventListener('courses-updated', loadCourses);
    return () => {
      window.removeEventListener('courses-updated', loadCourses);
    };
  }, []);

  const filteredCourses = activeCourseTab === 'All'
    ? courses
    : courses.filter(c => 
        c.category?.toLowerCase().includes(activeCourseTab.toLowerCase()) || 
        c.title?.toLowerCase().includes(activeCourseTab.toLowerCase())
      );

  return (
    <div id="services-page-root" className="space-y-16 sm:space-y-20 pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="pt-12 pb-8 bg-gradient-to-b from-[#F7FAFA] to-[#EAF3F3]/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0E7C7B]/10 text-[#0E7C7B] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
            Enterprise Services & Academic Training
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#1F3B4D] tracking-tight">
            Programs & Solutions Spectrum
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Accelerate your career through hands-on technology mastery or transform your organizational workflows with our 11 bespoke evolutionary web services.
          </p>

          {/* Tab Switcher */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveViewMode('services')}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
                activeViewMode === 'services'
                  ? 'bg-[#0E7C7B] text-white shadow-md'
                  : 'bg-white text-[#1F3B4D] border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              11 Core Enterprise Services
            </button>

            <button
              onClick={() => setActiveViewMode('programs')}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
                activeViewMode === 'programs'
                  ? 'bg-[#0E7C7B] text-white shadow-md'
                  : 'bg-white text-[#1F3B4D] border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Technology Training Programs
            </button>
          </div>
        </div>
      </section>

      {/* 2. SECTION A: 11 CORE ENTERPRISE SERVICES (MATCHING UPLOADED DESIGN) */}
      {activeViewMode === 'services' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D98E20]">
              ENTERPRISE & RESEARCH PORTALS
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1F3B4D]">
              All 11 Core Service Domains
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Custom-crafted digital platforms with continuous self-optimization algorithms, modern user experience, and paperless workflows.
            </p>
          </div>

          {/* Grid of Fluid Wave Cards strictly containing only service name, sum description, and more --> button */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {servicesList.map((service) => (
              <ServiceWaveCard
                key={service.id}
                service={service}
                onSelect={(s) => setSelectedDetailService(s)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 3. SECTION B: TECHNOLOGY TRAINING PROGRAMS */}
      {activeViewMode === 'programs' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D98E20]">
                HYDERABAD HYBRID & ONLINE BATCHES
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1F3B4D]">
                Technology Training Programs
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Practical, project-based learning with industry mentors in Hyderabad. All registrations persist directly to our Excel database.
              </p>
            </div>

            {/* Course Category Filter */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-[#F7FAFA] border border-[#EAF3F3] rounded-2xl">
              {['All', 'Java', 'Python', 'MERN', 'Spring'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCourseTab(tab)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCourseTab === tab
                      ? 'bg-[#0E7C7B] text-white shadow-xs'
                      : 'text-gray-600 hover:text-[#0E7C7B]'
                  }`}
                >
                  {tab === 'All' ? 'All Programs' : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="card-feel-good p-7 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#0E7C7B]/10 text-[#0E7C7B] border border-[#0E7C7B]/20">
                      {course.category}
                    </span>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                      <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px]">
                        {course.duration}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 font-bold text-[11px] border border-amber-200">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1F3B4D] mb-2.5">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Modules */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                      Core Modules & Technologies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.modules?.map((mod, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#F7FAFA] border border-[#EAF3F3] text-[#1F3B4D]"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCurriculum(course)}
                      className="px-4 py-2.5 text-xs font-bold text-[#0E7C7B] hover:bg-[#0E7C7B]/10 rounded-xl transition-colors border border-[#0E7C7B]/30 cursor-pointer"
                    >
                      View Syllabus
                    </button>
                  </div>

                  <button
                    onClick={() => handleEnroll(course)}
                    className="px-5 py-2.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Enroll in Program
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Not Sure Which Course to Pick? Card */}
          <div className="bg-[#12232E] rounded-3xl p-8 sm:p-10 text-center text-white space-y-4 shadow-xl">
            <h3 className="font-heading font-extrabold text-2xl text-white">
              Not Sure Which Course to Pick?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
              Talk to the EWD team and we'll help you choose the right learning path based on your goals and background.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-2.5 bg-[#F2A93B] hover:bg-[#D98E20] text-[#12232E] font-bold text-xs sm:text-sm rounded-xl shadow-md inline-flex items-center gap-2 transition-all hover:scale-102 cursor-pointer"
              >
                Contact EWD Team
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Detail Modal when clicking "More -->" */}
      <ServiceDetailModal
        service={selectedDetailService}
        isOpen={!!selectedDetailService}
        onClose={() => setSelectedDetailService(null)}
        onRequestQuote={(srv) => {
          setSelectedDetailService(null);
          handleOpenQuote(srv);
        }}
      />

    </div>
  );
};
