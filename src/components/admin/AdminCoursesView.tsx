import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Clock, 
  Award, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  X, 
  ChevronRight,
  ChevronDown,
  Layers,
  Upload,
  FileText,
  Rocket,
  GraduationCap,
  ArrowLeft,
  Tag,
  BarChart2,
  Monitor,
  Globe,
  Target,
  Star,
  Save
} from 'lucide-react';
import { Course } from '../../types';
import { api } from '../../services/api';

interface CurriculumModuleItem {
  title: string;
  topics: string;
}

interface PracticalProjectItem {
  title: string;
  tag: string;
}

const DEFAULT_JAVA_CURRICULUM: CurriculumModuleItem[] = [
  { 
    title: 'Core Java Fundamentals', 
    topics: 'Java Syntax & Data Types\nObject-Oriented Programming\nCollections Framework\nException Handling\nJava 8+ Features (Streams, Lambdas)' 
  },
  { 
    title: 'Spring Framework', 
    topics: 'Spring Boot Architecture & Auto-Configuration\nDependency Injection & Spring IoC Container\nSpring MVC & RESTful API Controller Design\nSpring Data JPA & Hibernate ORM Mapping\nSpring Security & JWT Authentication Tokens\nRequest Validation & Global Exception Handling' 
  },
  { 
    title: 'Database & ORM', 
    topics: 'Relational Database Design (MySQL / PostgreSQL)\nSQL Queries, Joins, Indexes & Transactions\nJPA Entities, Relationships & Cascading\nDatabase Migrations & Connection Pooling\nRepository Pattern & Custom Query Methods' 
  },
  { 
    title: 'Frontend Integration', 
    topics: 'React 18 Fundamentals & Component Lifecycle\nState Management, Props & Custom Hooks\nAxios & Fetch API Integration with Spring Boot\nTailwind CSS & Responsive Interface Design\nSPA Client-side Routing & Protected Routes' 
  },
  { 
    title: 'Tools & Deployment', 
    topics: 'Git Version Control & GitHub Team Workflows\nMaven & Gradle Build & Dependency Management\nPostman API Testing, Environments & Collections\nDocker Containerization & Production Artifacts\nCloud Run & Live Domain Deployment' 
  }
];

const DEFAULT_JAVA_PROJECTS: PracticalProjectItem[] = [
  { title: 'Student Management System (Full Stack)', tag: 'Practical project' },
  { title: 'E-commerce Backend with Spring Boot', tag: 'Practical project' },
  { title: 'REST API with JWT Authentication', tag: 'Practical project' },
  { title: 'React + Spring Boot Dashboard App', tag: 'Practical project' },
  { title: 'Portfolio Project with Database Integration', tag: 'Practical project' }
];

const EMPTY_COURSE_FORM = {
  title: '',
  category: '',
  duration: '',
  bannerImage: '',
  syllabusFileName: '',
  syllabusFile: '',
  level: 'All Levels',
  fee: 'Contact EWD',
  originalFee: '',
  discountPercent: 0,
  emiStartsAt: '',
  description: '',
  modules: '',
  learningOutcomes: '',
  status: 'Open for Enrollment' as Course['status'],
  isPopular: false,
  mode: 'Live Online',
  language: 'Telugu & English',
  whoShouldJoin: '',
  skills: '',
  curriculumList: [] as CurriculumModuleItem[],
  projectsList: [] as PracticalProjectItem[]
};

interface AdminCoursesViewProps {
  courses: Course[];
  onRefresh: () => void;
  showNotification: (type: 'success' | 'error', message: string) => void;
}

export const AdminCoursesView: React.FC<AdminCoursesViewProps> = ({
  courses,
  onRefresh,
  showNotification
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deleteConfirmCourse, setDeleteConfirmCourse] = useState<Course | null>(null);
  const [syllabusViewCourse, setSyllabusViewCourse] = useState<Course | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form State initialized to empty
  const [courseForm, setCourseForm] = useState(EMPTY_COURSE_FORM);

  const categories: Course['category'][] = [
    'FULL STACK',
    'FRONTEND',
    'BACKEND',
    'MARKETING',
    'SOFTWARE ENGINEERING',
    'PROJECTS'
  ];

  const handleBannerFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showNotification('error', 'Image size should be less than 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawBase64 = event.target?.result as string;
        // Optimize banner image with canvas compression
        const img = new Image();
        img.onload = () => {
          const maxDim = 1280;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', 0.85);
            setCourseForm(prev => ({ ...prev, bannerImage: compressed }));
          } else {
            setCourseForm(prev => ({ ...prev, bannerImage: rawBase64 }));
          }
        };
        img.onerror = () => {
          setCourseForm(prev => ({ ...prev, bannerImage: rawBase64 }));
        };
        img.src = rawBase64;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSyllabusFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showNotification('error', 'Syllabus file size should be less than 10MB');
        return;
      }
      setCourseForm(prev => ({
        ...prev,
        syllabusFileName: file.name
      }));
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setCourseForm(prev => ({ ...prev, syllabusFile: base64 }));
      };
      reader.readAsDataURL(file);
      showNotification('success', `Selected syllabus file: ${file.name}`);
    }
  };

  const handleAddModule = () => {
    setCourseForm(prev => ({
      ...prev,
      curriculumList: [
        ...prev.curriculumList,
        { 
          title: '', 
          topics: '' 
        }
      ]
    }));
  };

  const handleRemoveModule = (index: number) => {
    setCourseForm(prev => ({
      ...prev,
      curriculumList: prev.curriculumList.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateModule = (index: number, field: 'title' | 'topics', val: string) => {
    setCourseForm(prev => ({
      ...prev,
      curriculumList: prev.curriculumList.map((m, i) => i === index ? { ...m, [field]: val } : m)
    }));
  };

  const handleAddProject = () => {
    setCourseForm(prev => ({
      ...prev,
      projectsList: [
        ...prev.projectsList,
        { 
          title: '', 
          tag: 'Practical project' 
        }
      ]
    }));
  };

  const handleRemoveProject = (index: number) => {
    setCourseForm(prev => ({
      ...prev,
      projectsList: prev.projectsList.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateProject = (index: number, field: 'title' | 'tag', val: string) => {
    setCourseForm(prev => ({
      ...prev,
      projectsList: prev.projectsList.map((p, i) => i === index ? { ...p, [field]: val } : p)
    }));
  };

  const handleOpenAddCourse = () => {
    setEditingCourse(null);
    setCourseForm(EMPTY_COURSE_FORM);
    setIsModalOpen(true);
  };

  const handleOpenEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title || '',
      category: course.category || '',
      duration: course.duration || '',
      bannerImage: course.bannerImage || course.posterImage || '',
      syllabusFileName: course.syllabusFileName || (course.syllabus && course.syllabus.length > 0 ? `${course.title}-Syllabus.pdf` : ''),
      syllabusFile: course.syllabusFile || '',
      level: course.level || 'All Levels',
      fee: course.fee || 'Contact EWD',
      originalFee: course.originalFee || '',
      discountPercent: course.discountPercent || 0,
      emiStartsAt: course.emiStartsAt || '',
      description: course.description || '',
      modules: (course.modules || []).join(', '),
      learningOutcomes: (course.learningOutcomes || []).join('\n'),
      status: course.status || 'Open for Enrollment',
      isPopular: !!course.isPopular,
      mode: course.mode || 'Live Online',
      language: course.language || 'Telugu & English',
      whoShouldJoin: (course.whoShouldJoin && course.whoShouldJoin.length > 0)
        ? course.whoShouldJoin.join('\n')
        : '',
      skills: (course.skills && course.skills.length > 0)
        ? course.skills.join(', ')
        : (course.modules || []).join(', '),
      curriculumList: (course.curriculum && course.curriculum.length > 0)
        ? course.curriculum.map(c => ({
            title: c.title,
            topics: (c.topics || []).join('\n')
          }))
        : (course.syllabus && course.syllabus.length > 0)
          ? course.syllabus.map(s => ({
              title: s.topic || 'Core Module',
              topics: s.details ? s.details.replace(/,\s*/g, '\n') : ''
            }))
          : [],
      projectsList: (course.projects && course.projects.length > 0)
        ? course.projects.map(p => ({
            title: p.title,
            tag: p.tag || 'Practical project'
          }))
        : []
    });
    setIsModalOpen(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title.trim() || !courseForm.description.trim()) {
      showNotification('error', 'Please provide a course title and description.');
      return;
    }

    setFormLoading(true);
    try {
      const moduleList = courseForm.modules ? courseForm.modules.split(',').map(s => s.trim()).filter(Boolean) : [];
      const outcomesList = courseForm.learningOutcomes ? courseForm.learningOutcomes.split('\n').map(s => s.trim().replace(/^[-•*]\s*/, '')).filter(Boolean) : [];

      const curriculumParsed = courseForm.curriculumList && courseForm.curriculumList.length > 0
        ? courseForm.curriculumList
            .filter(m => m.title.trim().length > 0)
            .map(m => ({
              title: m.title.trim(),
              topics: m.topics.split(/\n|,/).map(t => t.trim().replace(/^[-•*]\s*/, '')).filter(Boolean)
            }))
        : moduleList.map((m) => ({
            title: m,
            topics: [`${m} fundamentals & principles`, 'Hands-on practical development', 'Real-world project implementation']
          }));

      const projectsParsed = courseForm.projectsList && courseForm.projectsList.length > 0
        ? courseForm.projectsList
            .filter(p => p.title.trim().length > 0)
            .map(p => ({
              title: p.title.trim(),
              tag: p.tag.trim() || 'Practical project'
            }))
        : [
            { title: `${courseForm.title.trim()} Capstone System`, tag: 'Practical project' },
            { title: 'Full Stack Integration Project', tag: 'Practical project' }
          ];

      const payload: Partial<Course> = {
        title: courseForm.title.trim(),
        category: (courseForm.category.trim() || 'FULL STACK').toUpperCase(),
        duration: courseForm.duration.trim() || '16 Weeks (Practical)',
        bannerImage: courseForm.bannerImage.trim(),
        posterImage: courseForm.bannerImage.trim(),
        syllabusFileName: courseForm.syllabusFileName || undefined,
        syllabusFile: courseForm.syllabusFile || undefined,
        level: courseForm.level || 'All Levels',
        fee: courseForm.fee || 'Contact EWD',
        description: courseForm.description.trim(),
        modules: moduleList,
        learningOutcomes: outcomesList,
        status: courseForm.status || 'Open for Enrollment',
        isPopular: courseForm.isPopular,
        mode: courseForm.mode || 'Live Online',
        language: courseForm.language || 'Telugu & English',
        whoShouldJoin: courseForm.whoShouldJoin ? courseForm.whoShouldJoin.split('\n').map(s => s.trim().replace(/^[-•*]\s*/, '')).filter(Boolean) : [
          'Students pursuing CS/IT degrees',
          'Freshers looking to start their tech career',
          'Working professionals wanting to upskill'
        ],
        skills: courseForm.skills ? courseForm.skills.split(',').map(s => s.trim()).filter(Boolean) : moduleList,
        curriculum: curriculumParsed,
        projects: projectsParsed,
        syllabus: curriculumParsed.map((c, i) => ({
          week: `Phase ${i + 1}`,
          topic: c.title,
          details: c.topics.join(', ')
        }))
      };

      if (editingCourse) {
        await api.updateCourse(editingCourse.id, payload);
        showNotification('success', `Course "${courseForm.title}" updated in Excel Courses sheet!`);
      } else {
        await api.createCourse(payload);
        showNotification('success', `New Course "${courseForm.title}" created in Excel Courses sheet!`);
      }

      window.dispatchEvent(new CustomEvent('courses-updated'));
      setIsModalOpen(false);
      onRefresh();
    } catch (err: any) {
      showNotification('error', err.message || 'Course save failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (!deleteConfirmCourse) return;
    try {
      await api.deleteCourse(deleteConfirmCourse.id);
      showNotification('success', `Course "${deleteConfirmCourse.title}" deleted from Excel store.`);
      window.dispatchEvent(new CustomEvent('courses-updated'));
      setDeleteConfirmCourse(null);
      onRefresh();
    } catch (err: any) {
      showNotification('error', err.message || 'Delete failed');
    }
  };

  // Filter Courses
  const filteredCourses = courses.filter((c) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (c.title?.toLowerCase().includes(term) ?? false) ||
      (c.description?.toLowerCase().includes(term) ?? false) ||
      (c.category?.toLowerCase().includes(term) ?? false);

    const matchesCat = selectedCategory === 'ALL' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  if (isModalOpen) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-fade-in">
        {/* Top Header matching uploaded image */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#2563EB] flex items-center justify-center text-white shadow-lg shadow-blue-500/25 shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight">
                {editingCourse ? 'Edit Training Program' : 'Add New Training Program'}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {editingCourse 
                  ? 'Update course details and make it available for your learners' 
                  : 'Create a new course and make it available for your learners'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2.5 bg-blue-50/80 hover:bg-blue-100 text-blue-600 border border-blue-200/90 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-center shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Courses</span>
          </button>
        </div>

        {/* Main Card exactly matching uploaded design */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 md:p-10">
          <form onSubmit={handleSaveCourse} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* LEFT COLUMN */}
              <div className="space-y-6">
                {/* 1. Course Title * */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-800">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Course Title</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    placeholder="e.g. Java Full Stack Development"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                  />
                </div>

                {/* 2. Duration * */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-800">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Duration</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    placeholder="e.g. 16 Weeks (Practical)"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                  />
                </div>

                {/* 3. Course Description * */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-800">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Course Description</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      rows={6}
                      required
                      maxLength={500}
                      value={courseForm.description}
                      onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                      placeholder="Write a short and clear description about the course..."
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 resize-none pb-7 transition-all leading-relaxed"
                    />
                    <div className="absolute bottom-2.5 right-3 text-[11px] text-slate-400 font-medium pointer-events-none">
                      {courseForm.description.length}/500
                    </div>
                  </div>
                </div>

                {/* 5. Upload Syllabus * */}
                <div className="space-y-2">
                  <label className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-800">
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Upload Syllabus</span>
                      <span className="text-red-500">*</span>
                    </span>
                    {courseForm.syllabusFileName && (
                      <button
                        type="button"
                        onClick={() => setCourseForm({ ...courseForm, syllabusFileName: '', syllabusFile: '' })}
                        className="text-xs text-red-500 hover:underline font-medium cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </label>

                  <label className="border-2 border-dashed border-blue-200/90 hover:border-blue-400 bg-blue-50/15 hover:bg-blue-50/30 rounded-2xl p-4 sm:p-5 text-center transition-all cursor-pointer flex flex-row items-center justify-center gap-4 group relative block">
                    <div className="w-10 h-10 rounded-xl bg-blue-100/60 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="font-bold text-xs sm:text-sm text-slate-800 block">
                        {courseForm.syllabusFileName || 'Choose Syllabus File'}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        PDF, DOC, DOCX (Max 10MB)
                      </span>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleSyllabusFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">
                {/* 1. Track Category * */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-800">
                    <Tag className="w-4 h-4 text-blue-600" />
                    <span>Track Category</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    placeholder="e.g. Full Stack / Backend / Frontend / DevOps / Testing"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                  />
                </div>

                {/* 2. Enrollment Status * */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-800">
                    <BarChart2 className="w-4 h-4 text-blue-600" />
                    <span>Enrollment Status</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border border-slate-200 rounded-xl p-3 bg-white">
                    {(['Open for Enrollment', 'Upcoming', 'Filling Fast', 'Closed'] as const).map((statusOption) => {
                      const isSelected = courseForm.status === statusOption;
                      return (
                        <div
                          key={statusOption}
                          onClick={() => setCourseForm({ ...courseForm, status: statusOption })}
                          className="flex items-center gap-2 cursor-pointer select-none py-1"
                        >
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-blue-600' : 'border-slate-300'}`}>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                          </span>
                          <span className={`text-xs ${isSelected ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                            {statusOption}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Training Mode * */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-800">
                    <Monitor className="w-4 h-4 text-blue-600" />
                    <span>Training Mode</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-8 border border-slate-200 rounded-xl px-4 py-3 bg-white">
                    {(['Live Online', 'Offline'] as const).map((modeOption) => {
                      const isSelected = courseForm.mode === modeOption || (modeOption === 'Live Online' && !courseForm.mode);
                      return (
                        <div
                          key={modeOption}
                          onClick={() => setCourseForm({ ...courseForm, mode: modeOption })}
                          className="flex items-center gap-2 cursor-pointer select-none"
                        >
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-blue-600' : 'border-slate-300'}`}>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                          </span>
                          <span className={`text-xs sm:text-sm ${isSelected ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                            {modeOption}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Cohort Mode / Language * */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-800">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>Cohort Mode / Language</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap items-center gap-6 sm:gap-8 border border-slate-200 rounded-xl px-4 py-3 bg-white">
                    {(['Telugu', 'English', 'Telugu & English'] as const).map((langOption) => {
                      const isSelected = courseForm.language === langOption || (langOption === 'Telugu & English' && !courseForm.language);
                      return (
                        <div
                          key={langOption}
                          onClick={() => setCourseForm({ ...courseForm, language: langOption })}
                          className="flex items-center gap-2 cursor-pointer select-none"
                        >
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-blue-600' : 'border-slate-300'}`}>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                          </span>
                          <span className={`text-xs sm:text-sm ${isSelected ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                            {langOption}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Modules (Comma separated) * */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-800">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Modules (Comma separated)</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.modules}
                    onChange={(e) => setCourseForm({ ...courseForm, modules: e.target.value })}
                    placeholder="e.g. Core Java, Spring Boot, React, MySQL"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                  />
                </div>

                {/* 6. Learning Outcomes (One per line) * */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-800">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span>Learning Outcomes (One per line)</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      rows={6}
                      maxLength={500}
                      value={courseForm.learningOutcomes}
                      onChange={(e) => setCourseForm({ ...courseForm, learningOutcomes: e.target.value })}
                      placeholder="Enter each learning outcome in a new line..."
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 resize-none pb-7 transition-all leading-relaxed"
                    />
                    <div className="absolute bottom-2.5 right-3 text-[11px] text-slate-400 font-medium pointer-events-none">
                      {courseForm.learningOutcomes.length}/500
                    </div>
                  </div>
                </div>

                {/* 7. Highlight as Popular / Featured Program */}
                <div className="p-4 bg-slate-50/80 border border-slate-200/90 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-blue-600 shrink-0 stroke-[2]" />
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-slate-800 block">
                        Highlight as Popular / Featured Program
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        Show this course on homepage and in featured sections
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={courseForm.isPopular}
                    onClick={() => setCourseForm(prev => ({ ...prev, isPopular: !prev.isPopular }))}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${courseForm.isPopular ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${courseForm.isPopular ? 'translate-x-5' : 'translate-x-0'}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl transition-all shadow-2xs cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={formLoading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-500/25 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{formLoading ? 'Saving...' : editingCourse ? 'Update Course' : 'Add Course'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search & Add Course Button */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search programs by title or keywords..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0E7C7B] focus:bg-white transition-all"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#0E7C7B]"
          >
            <option value="ALL">All Tracks ({courses.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleOpenAddCourse}
          className="px-4 py-2.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Courses Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-gray-100">
            <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <h3 className="font-heading font-bold text-gray-700 text-sm">No Courses Found</h3>
            <p className="text-xs text-gray-400">Try adjusting your search or add a new course.</p>
          </div>
        ) : (
          filteredCourses.map((c) => (
            <div 
              key={c.id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#0E7C7B]/10 text-[#0E7C7B]">
                    {c.category}
                  </span>
                  {c.isPopular && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F2A93B]/20 text-[#D98E20] flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Popular
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base text-gray-900 line-clamp-1 group-hover:text-[#0E7C7B] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{c.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Award className="w-3.5 h-3.5 text-gray-400" />
                    <span className="truncate">{c.level}</span>
                  </div>
                </div>

                {/* Modules Tags */}
                {c.modules && c.modules.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {c.modules.slice(0, 4).map((mod, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded text-[10px] font-medium border border-gray-100">
                        {mod}
                      </span>
                    ))}
                    {c.modules.length > 4 && (
                      <span className="px-1.5 py-0.5 bg-gray-50 text-gray-400 rounded text-[10px]">
                        +{c.modules.length - 4}
                      </span>
                    )}
                  </div>
                )}
                {/* Status & Track Info (Prices completely removed) */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{c.status || 'Open for Enrollment'}</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#0E7C7B] bg-[#0E7C7B]/10 px-2 py-0.5 rounded-md">
                    {c.duration || '16 Weeks'}
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <button
                  onClick={() => setSyllabusViewCourse(c)}
                  className="text-xs font-bold text-[#0E7C7B] hover:text-[#0A5E5D] flex items-center gap-1"
                >
                  <span>Syllabus</span>
                  <ChevronRight className="w-3 h-3" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditCourse(c)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-[#0E7C7B] hover:bg-gray-100 transition-colors"
                    title="Edit Course"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmCourse(c)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ========================================================= */}
      {/* SYLLABUS VIEWER MODAL */}
      {/* ========================================================= */}
      {syllabusViewCourse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-heading font-bold text-base text-gray-900">
                  {syllabusViewCourse.title}
                </h3>
                <p className="text-xs text-gray-500">Curriculum Syllabus Roadmap</p>
              </div>
              <button 
                onClick={() => setSyllabusViewCourse(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {(syllabusViewCourse.syllabus || []).map((week, idx) => (
                <div key={idx} className="p-3.5 bg-gray-50 rounded-xl border border-gray-200/70 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0E7C7B]">{week.week}</span>
                    <span className="font-bold text-gray-900">{week.topic}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{week.details}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSyllabusViewCourse(null)}
                className="px-4 py-2 bg-[#12232E] text-white font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmCourse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div>
              <h3 className="font-heading font-bold text-base text-gray-900">
                Delete Course: {deleteConfirmCourse.title}?
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                This will delete the course curriculum from the Excel Courses worksheet.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmCourse(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCourse}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
