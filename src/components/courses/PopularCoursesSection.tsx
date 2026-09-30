import React, { useState, useEffect, useCallback } from 'react';
import { Clock, BarChart2, Layers, ArrowRight } from 'lucide-react';
import { Course } from '../../types';
import { POPULAR_COURSES, PopularCourseItem } from '../../data/popularCoursesData';
import { CourseOverviewModal } from './CourseOverviewModal';
import { EnrollModal } from '../common/EnrollModal';
import { api } from '../../services/api';

interface PopularCoursesSectionProps {
  navigate?: (path: string) => void;
  onEnrollCourse?: (course: Course) => void;
  onViewCurriculum?: (course: Course) => void;
  onViewAllCourses?: () => void;
  showAllCoursesButton?: boolean;
}

const ICONS_POOL: PopularCourseItem['badgeIcon'][] = [
  'crown', 'star', 'flame', 'eye', 'rocket', 'briefcase', 'chart', 'bulb'
];

const PRESET_MAPPINGS: Record<string, {
  badge: string;
  badgeIcon: PopularCourseItem['badgeIcon'];
  bannerGradient: string;
  accentColor: string;
  buttonBorderColor: string;
}> = {
  'java-full-stack': {
    badge: 'Bestseller',
    badgeIcon: 'crown',
    bannerGradient: 'from-[#1E3A8A] via-[#2563EB] to-[#1D4ED8]',
    accentColor: '#2563EB',
    buttonBorderColor: 'border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]/5'
  },
  'java-full-stack-development': {
    badge: 'Bestseller',
    badgeIcon: 'crown',
    bannerGradient: 'from-[#1E3A8A] via-[#2563EB] to-[#1D4ED8]',
    accentColor: '#2563EB',
    buttonBorderColor: 'border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]/5'
  },
  'python-data-science': {
    badge: 'Most Popular',
    badgeIcon: 'star',
    bannerGradient: 'from-[#0F172A] via-[#0E7490] to-[#0891B2]',
    accentColor: '#0891B2',
    buttonBorderColor: 'border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488]/5'
  },
  'ai-ml': {
    badge: 'Trending',
    badgeIcon: 'flame',
    bannerGradient: 'from-[#2E1065] via-[#6B21A8] to-[#9333EA]',
    accentColor: '#9333EA',
    buttonBorderColor: 'border-[#9333EA] text-[#9333EA] hover:bg-[#9333EA]/5'
  },
  'cloud-aws': {
    badge: 'New',
    badgeIcon: 'eye',
    bannerGradient: 'from-[#082F49] via-[#0369A1] to-[#0284C7]',
    accentColor: '#0284C7',
    buttonBorderColor: 'border-[#0284C7] text-[#0284C7] hover:bg-[#0284C7]/5'
  },
  'web-dev': {
    badge: 'In Demand',
    badgeIcon: 'rocket',
    bannerGradient: 'from-[#1E1B4B] via-[#4338CA] to-[#6366F1]',
    accentColor: '#6366F1',
    buttonBorderColor: 'border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1]/5'
  },
  'crs-web-dev': {
    badge: 'In Demand',
    badgeIcon: 'rocket',
    bannerGradient: 'from-[#1E1B4B] via-[#4338CA] to-[#6366F1]',
    accentColor: '#6366F1',
    buttonBorderColor: 'border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1]/5'
  },
  'frontend-dev': {
    badge: 'In Demand',
    badgeIcon: 'rocket',
    bannerGradient: 'from-[#1E1B4B] via-[#4338CA] to-[#6366F1]',
    accentColor: '#6366F1',
    buttonBorderColor: 'border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1]/5'
  },
  'software-testing': {
    badge: 'Career Booster',
    badgeIcon: 'briefcase',
    bannerGradient: 'from-[#881337] via-[#BE123C] to-[#E11D48]',
    accentColor: '#E11D48',
    buttonBorderColor: 'border-[#E11D48] text-[#E11D48] hover:bg-[#E11D48]/5'
  },
  'sql-db': {
    badge: 'High Demand',
    badgeIcon: 'chart',
    bannerGradient: 'from-[#7C2D12] via-[#C2410C] to-[#EA580C]',
    accentColor: '#EA580C',
    buttonBorderColor: 'border-[#EA580C] text-[#EA580C] hover:bg-[#EA580C]/5'
  },
  'android-dev': {
    badge: 'Project Based',
    badgeIcon: 'bulb',
    bannerGradient: 'from-[#064E3B] via-[#047857] to-[#059669]',
    accentColor: '#059669',
    buttonBorderColor: 'border-[#059669] text-[#059669] hover:bg-[#059669]/5'
  }
};

const CATEGORY_STYLES: Record<string, { bannerGradient: string; accentColor: string; buttonBorderColor: string }> = {
  'FULL STACK': {
    bannerGradient: 'from-[#1E3A8A] via-[#2563EB] to-[#1D4ED8]',
    accentColor: '#2563EB',
    buttonBorderColor: 'border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]/10'
  },
  'FRONTEND': {
    bannerGradient: 'from-[#1E1B4B] via-[#4338CA] to-[#6366F1]',
    accentColor: '#4F46E5',
    buttonBorderColor: 'border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5]/10'
  },
  'BACKEND': {
    bannerGradient: 'from-[#064E3B] via-[#047857] to-[#059669]',
    accentColor: '#059669',
    buttonBorderColor: 'border-[#059669] text-[#059669] hover:bg-[#059669]/10'
  },
  'DATA & AI': {
    bannerGradient: 'from-[#0F172A] via-[#0E7490] to-[#0891B2]',
    accentColor: '#0891B2',
    buttonBorderColor: 'border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2]/10'
  },
  'CLOUD & TOOLS': {
    bannerGradient: 'from-[#082F49] via-[#0369A1] to-[#0284C7]',
    accentColor: '#0284C7',
    buttonBorderColor: 'border-[#0284C7] text-[#0284C7] hover:bg-[#0284C7]/10'
  },
  'TESTING': {
    bannerGradient: 'from-[#881337] via-[#BE123C] to-[#E11D48]',
    accentColor: '#E11D48',
    buttonBorderColor: 'border-[#E11D48] text-[#E11D48] hover:bg-[#E11D48]/10'
  },
  'SOFTWARE ENGINEERING': {
    bannerGradient: 'from-[#1E293B] via-[#334155] to-[#475569]',
    accentColor: '#334155',
    buttonBorderColor: 'border-[#334155] text-[#334155] hover:bg-[#334155]/10'
  },
  'PROJECTS': {
    bannerGradient: 'from-[#14532D] via-[#16A34A] to-[#22C55E]',
    accentColor: '#16A34A',
    buttonBorderColor: 'border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A]/10'
  }
};

const mapCourseToPopularItem = (c: Course, index: number): PopularCourseItem => {
  const normKey = (c.id || '')
    .toLowerCase()
    .replace(/^crs-/, '')
    .replace(/\s+/g, '-');

  const preset = PRESET_MAPPINGS[normKey];
  const catStyle = CATEGORY_STYLES[c.category?.toUpperCase?.() || ''] || {
    bannerGradient: 'from-[#0F172A] via-[#1E293B] to-[#334155]',
    accentColor: '#2563EB',
    buttonBorderColor: 'border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]/10'
  };

  const badgeIcon = preset ? preset.badgeIcon : ICONS_POOL[index % ICONS_POOL.length];
  const badge = preset ? preset.badge : (c.isPopular ? 'Featured' : (c.status || 'Trending'));
  const bannerGradient = preset ? preset.bannerGradient : catStyle.bannerGradient;
  const accentColor = preset ? preset.accentColor : catStyle.accentColor;
  const buttonBorderColor = preset ? preset.buttonBorderColor : catStyle.buttonBorderColor;

  return {
    id: c.id,
    title: c.title,
    badge,
    badgeIcon,
    bannerGradient,
    accentColor,
    buttonBorderColor,
    description: c.description,
    duration: c.duration || '12 Weeks',
    level: c.level || 'Beginner to Pro',
    projectsCount: c.syllabus && c.syllabus.length > 0 ? `${c.syllabus.length * 3}+ Projects` : '10+ Projects',
    fee: '', // Prices removed as required
    originalFee: '',
    category: c.category,
    modules: c.modules || [],
    courseData: c
  };
};

export const PopularCoursesSection: React.FC<PopularCoursesSectionProps> = ({
  navigate,
  onEnrollCourse,
  onViewCurriculum,
  onViewAllCourses,
  showAllCoursesButton = true
}) => {
  const [coursesList, setCoursesList] = useState<PopularCourseItem[]>(POPULAR_COURSES);
  const [selectedCourseForOverview, setSelectedCourseForOverview] = useState<Course | null>(null);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);

  const fetchRealtimeCourses = useCallback(async () => {
    try {
      const data = await api.getCourses();
      if (Array.isArray(data) && data.length > 0) {
        const transformed = data.map((c, idx) => mapCourseToPopularItem(c, idx));
        setCoursesList(transformed);
      }
    } catch (err) {
      console.error('Error fetching realtime courses:', err);
    }
  }, []);

  useEffect(() => {
    fetchRealtimeCourses();

    const handleUpdate = () => {
      fetchRealtimeCourses();
    };

    window.addEventListener('courses-updated', handleUpdate);
    window.addEventListener('focus', handleUpdate);

    return () => {
      window.removeEventListener('courses-updated', handleUpdate);
      window.removeEventListener('focus', handleUpdate);
    };
  }, [fetchRealtimeCourses]);

  const handleOpenCourseDetails = (item: PopularCourseItem) => {
    if (onViewCurriculum) {
      onViewCurriculum(item.courseData);
    } else if (navigate) {
      const slug = item.courseData.slug || item.id || 'web-dev';
      navigate(`/courses/${slug}`);
    }
  };

  const handleOpenOverview = (item: PopularCourseItem) => {
    setSelectedCourseForOverview(item.courseData);
  };

  const handleStartLearning = (course: Course) => {
    if (onEnrollCourse) {
      onEnrollCourse(course);
    } else {
      setSelectedCourseForEnroll(course);
    }
  };

  const handleViewAllClick = () => {
    if (onViewAllCourses) {
      onViewAllCourses();
    } else if (navigate) {
      navigate('/courses');
    }
  };

  return (
    <section id="popular-courses-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Header Area matching uploaded image */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-10 sm:mb-12">
        {/* Pill Tag */}
        <div className="inline-flex items-center justify-center">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#E8F2FE] text-[#2563EB] tracking-wide shadow-2xs">
            Popular Courses
          </span>
        </div>

        {/* Main Heading with Gradient "Tomorrow" */}
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#0F172A] tracking-tight leading-tight">
          Learn Today, Build Your{' '}
          <span className="bg-gradient-to-r from-[#38BDF8] via-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">
            Tomorrow
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
          Explore our industry-focused courses designed to make you job-ready with real-world skills.
        </p>
      </div>

      {/* 2. Responsive Cards Grid (4 cols on lg screens, 2 on sm/md, 1 on mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-6">
        {coursesList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenCourseDetails(item)}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 cursor-pointer"
            >
              {/* Card Header Tags */}
              <div className="p-5 pb-0 flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-lg text-[10.5px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100/60">
                  {item.category || 'PROGRAM'}
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  {item.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Title & Description */}
                <div className="space-y-1.5">
                  <h3 
                    className="font-heading font-extrabold text-base text-[#0F172A] hover:text-[#2563EB] transition-colors line-clamp-1"
                    title={item.title}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 min-h-[34px]">
                    {item.description}
                  </p>
                </div>

                {/* Metadata Row: Duration & Projects */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-normal pt-1">
                  <div className="flex items-center gap-1.5" title="Duration">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{item.duration}</span>
                  </div>

                  <div className="flex items-center gap-1.5" title="Projects">
                    <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{item.projectsCount}</span>
                  </div>
                </div>

                {/* Right-aligned Enroll Now button */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleOpenCourseDetails(item); }}
                    className={`py-1.5 sm:py-2 px-5 rounded-xl font-bold text-xs border transition-all flex items-center justify-center cursor-pointer bg-white hover:bg-slate-50 shadow-2xs hover:scale-102 active:scale-98 ${item.buttonBorderColor}`}
                  >
                    <span>Enroll Now</span>
                  </button>
                </div>

              </div>
            </div>
        ))}
      </div>

      {/* 3. Bottom Centered CTA: View All Courses -> */}
      {showAllCoursesButton && (
        <div className="text-center pt-10 sm:pt-12">
          <button
            type="button"
            id="view-all-courses-btn"
            onClick={handleViewAllClick}
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#E8F2FE] hover:bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE] shadow-2xs hover:shadow-sm transition-all hover:scale-102 active:scale-98 cursor-pointer"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4 text-[#2563EB]" />
          </button>
        </div>
      )}

      {/* Course Overview Details Modal with "Book a Free Demo" & "Start Learning Now" */}
      <CourseOverviewModal
        course={selectedCourseForOverview}
        isOpen={!!selectedCourseForOverview}
        onClose={() => setSelectedCourseForOverview(null)}
        onStartLearning={(course) => {
          setSelectedCourseForOverview(null);
          handleStartLearning(course);
        }}
      />

      {/* Direct Enrollment Form Modal */}
      <EnrollModal
        course={selectedCourseForEnroll}
        isOpen={!!selectedCourseForEnroll}
        onClose={() => setSelectedCourseForEnroll(null)}
        onSuccess={() => setSelectedCourseForEnroll(null)}
        navigate={navigate}
      />

    </section>
  );
};
