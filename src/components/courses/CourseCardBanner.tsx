import React from 'react';
import { PopularCourseItem } from '../../data/popularCoursesData';

interface CourseCardBannerProps {
  course: PopularCourseItem;
}

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

export const CourseCardBanner: React.FC<CourseCardBannerProps> = ({ course }) => {
  const renderBadgeIcon = () => {
    switch (course.badgeIcon) {
      case 'crown':
        return (
          <svg className="w-3.5 h-3.5 text-white mr-1.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
          </svg>
        );
      case 'star':
        return (
          <svg className="w-3.5 h-3.5 text-yellow-300 mr-1.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        );
      case 'flame':
        return (
          <svg className="w-3.5 h-3.5 text-amber-200 mr-1.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.61 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
          </svg>
        );
      case 'eye':
        return (
          <svg className="w-3.5 h-3.5 text-white mr-1.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
          </svg>
        );
      case 'rocket':
        return (
          <svg className="w-3.5 h-3.5 text-white mr-1.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89l4.14 4.14c.31-.14 3.6-1.54 5.89-3.57L9.19 6.35zM20.56 3.44c-.78-.78-2.05-.78-2.83 0l-1.9 1.9 2.83 2.83 1.9-1.9c.78-.78.78-2.05 0-2.83zM2.81 18.36L5.64 21.2 7.05 19.78 4.22 16.95z"/>
          </svg>
        );
      case 'briefcase':
        return (
          <svg className="w-3.5 h-3.5 text-white mr-1.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
          </svg>
        );
      case 'chart':
        return (
          <svg className="w-3.5 h-3.5 text-white mr-1.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zM16.2 13H19v6h-2.8z"/>
          </svg>
        );
      case 'bulb':
        return (
          <svg className="w-3.5 h-3.5 text-white mr-1.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getBadgeStyle = () => {
    switch (course.badgeIcon) {
      case 'crown':
        return 'bg-sky-500/85 border-sky-300/40 text-white';
      case 'star':
        return 'bg-emerald-500/85 border-emerald-300/40 text-white';
      case 'flame':
        return 'bg-rose-500/85 border-pink-300/40 text-white';
      case 'eye':
        return 'bg-teal-500/85 border-teal-300/40 text-white';
      case 'rocket':
        return 'bg-purple-600/85 border-purple-300/40 text-white';
      case 'briefcase':
        return 'bg-rose-500/85 border-rose-300/40 text-white';
      case 'chart':
        return 'bg-amber-500/85 border-amber-300/40 text-white';
      case 'bulb':
        return 'bg-emerald-600/85 border-emerald-300/40 text-white';
      default:
        return 'bg-black/40 border-white/20 text-white';
    }
  };

  // Reusable crisp SVG technology icons
  const TechIcons = {
    Java: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-orange-400" fill="currentColor">
        <path d="M4 19h16v2H4zM20 7h-2.5a5.5 5.5 0 0 0-11 0H4a2 2 0 0 0-2 2v6a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-1h.5a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 20 7zm-5 7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9h9zm3.5-2.5a.5.5 0 0 1-.5.5h-.5V9H18a.5.5 0 0 1 .5.5z"/>
      </svg>
    ),
    Spring: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-emerald-400" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15c-2.76 0-5-2.24-5-5 0-1.85 1.01-3.46 2.5-4.32l1.5 2.6c-.61.42-1 1.11-1 1.72 0 1.1.9 2 2 2 .61 0 1.3-.39 1.72-1l2.6 1.5C14.46 15.99 12.85 17 11 17z"/>
      </svg>
    ),
    React: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-3.5 h-3.5 text-cyan-300">
        <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
        <g stroke="#00D8FF" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
    Docker: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-sky-400" fill="currentColor">
        <path d="M13.98 11.08h1.8v1.8h-1.8zm-2.4 0h1.8v1.8h-1.8zm-2.4 0h1.8v1.8h-1.8zm7.2 0h1.8v1.8h-1.8zm-7.2-2.4h1.8v1.8h-1.8zm2.4 0h1.8v1.8h-1.8zm2.4 0h1.8v1.8h-1.8zm2.4 0h1.8v1.8h-1.8zm-4.8-2.4h1.8v1.8h-1.8zm11.95 5.56c-.4-.26-1.28-.35-2.03.11-.1-.82-.64-1.46-1.34-1.85l-.4-.22-.3.35c-.48.56-.81 1.25-.87 2.01H1.54C1.24 10.64 1 11.8 1 13c0 4.96 4.04 9 9 9 6.2 0 11.4-4.22 12.67-10.02.04-.18.06-.36.08-.54l.02-.33-.31-.17z"/>
      </svg>
    ),
    Postgres: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-blue-400" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.93c-3.96-.49-7-3.88-7-7.93s3.04-7.44 7-7.93v15.86z"/>
      </svg>
    ),
    Python: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none">
        <path d="M11.92 2C7.54 2 7.8 3.9 7.8 3.9l.01 2h4.22v.6H6.18S3 6.13 3 10.51c0 4.38 2.78 4.23 2.78 4.23h1.66v-2.33s-.09-2.78 2.73-2.78h4.7s2.63.04 2.63-2.55V4.64S17.88 2 11.92 2zm-1.8 1.43a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7z" fill="#387EB8"/>
        <path d="M12.08 22c4.38 0 4.12-1.9 4.12-1.9l-.01-2h-4.22v-.6h5.85s3.18.37 3.18-4.01c0-4.38-2.78-4.23-2.78-4.23h-1.66v2.33s.09 2.78-2.73 2.78h-4.7s-2.63-.04-2.63 2.55v2.44S6.12 22 12.08 22zm1.8-1.43a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7z" fill="#FFE052"/>
      </svg>
    ),
    Pandas: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-indigo-300" fill="currentColor">
        <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm3 4v10h2V7H7zm4 4v6h2v-6h-2zm4-2v8h2V9h-2z"/>
      </svg>
    ),
    NumPy: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-sky-400" fill="currentColor">
        <path d="M3 3h4v18H3V3zm7 0h4v18h-4V3zm7 0h4v18h-4V3zM3 7h18v3H3V7zm0 7h18v3H3v-3z"/>
      </svg>
    ),
    Scikit: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber-400" fill="currentColor">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="12" cy="18" r="3" />
        <path d="M8.5 7.5l5 7M15.5 7.5l-5 7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    PowerBI: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-yellow-400" fill="currentColor">
        <path d="M17 3h4v18h-4zM10 8h4v13h-4zM3 13h4v8H3z"/>
      </svg>
    ),
    PyTorch: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-red-400" fill="currentColor">
        <path d="M12 2a1 1 0 0 1 1 1v.2a6 6 0 1 1-6 6 1 1 0 0 1 2 0 4 4 0 1 0 4-4V3a1 1 0 0 1-1-1zm3.5 2.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
      </svg>
    ),
    TensorFlow: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber-500" fill="currentColor">
        <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2zm0 3.8l5 2.8v5.6L12 17l-5-2.8V8.6l5-2.8z"/>
      </svg>
    ),
    Brain: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-fuchsia-300" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9.5C4.8 8.8 4 7.5 4 6a4 4 0 0 1 8 0z" />
        <circle cx="12" cy="6" r="1.5" />
      </svg>
    ),
    AWS: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber-400" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
      </svg>
    ),
    EC2: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-sky-300" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
      </svg>
    ),
    S3: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-emerald-400" fill="currentColor">
        <path d="M4 5h16v3H4zm1 5h14v10H5zm3 3v4h2v-4zm6 0v4h2v-4z"/>
      </svg>
    ),
    Lambda: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-orange-400" fill="currentColor">
        <path d="M6 3h3.5l5.5 13.5L18 3h3l-4.5 11.2L20 21h-3.8l-3.2-6.5L8.5 21H5l4-8.8L6 3z"/>
      </svg>
    ),
    Kubernetes: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-blue-400" fill="currentColor">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="3" x2="12" y2="9" stroke="currentColor" strokeWidth="2"/>
        <line x1="12" y1="15" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
        <line x1="3" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2"/>
        <line x1="15" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    JS: (
      <div className="w-3.5 h-3.5 bg-[#F7DF1E] text-black font-black text-[9px] flex items-center justify-center rounded-[2px] leading-none">
        JS
      </div>
    ),
    TS: (
      <div className="w-3.5 h-3.5 bg-[#3178C6] text-white font-bold text-[8px] flex items-center justify-center rounded-[2px] leading-none">
        TS
      </div>
    ),
    HTML: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-orange-500" fill="currentColor">
        <path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3zm14 6h-8l.3 3h7.4l-.6 6.3L12 18.5l-4.1-1.2-.3-3.3h2.1l.2 1.6 2.1.6 2.1-.6.2-2.6H7.3L6.6 5h10.8l-.4 3z"/>
      </svg>
    ),
    Tailwind: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-cyan-400" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
      </svg>
    ),
    Selenium: (
      <div className="w-3.5 h-3.5 bg-rose-600 text-white font-extrabold text-[8px] flex items-center justify-center rounded-[3px] leading-none">
        Se
      </div>
    ),
    TestNG: (
      <div className="w-3.5 h-3.5 bg-emerald-600 text-white font-extrabold text-[7px] flex items-center justify-center rounded-[3px] leading-none">
        NG
      </div>
    ),
    Postman: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-orange-400" fill="currentColor">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6l3 6-3 6-3-6z" fill="#FFF" />
      </svg>
    ),
    SQL: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber-400" fill="currentColor">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    MySQL: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-sky-400" fill="currentColor">
        <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9zm3.5 13.5c-.8.8-2 1.5-3.5 1.5s-2.7-.7-3.5-1.5l1.4-1.4c.5.5 1.2.9 2.1.9s1.6-.4 2.1-.9l1.4 1.4z"/>
      </svg>
    ),
    Mongo: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-emerald-400" fill="currentColor">
        <path d="M12 2C12 2 7 8 7 13c0 3.31 2.24 6 5 6s5-2.69 5-6c0-5-5-11-5-11zm0 15c-1.66 0-3-1.34-3-3 0-1.88 1.6-4.5 3-6.5 1.4 2 3 4.62 3 6.5 0 1.66-1.34 3-3 3z"/>
      </svg>
    ),
    Redis: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-red-500" fill="currentColor">
        <path d="M12 3L2 8l10 5 10-5-10-5zm0 9l-8-4v6l8 4 8-4v-6l-8 4z"/>
      </svg>
    ),
    Kotlin: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-purple-400" fill="currentColor">
        <polygon points="0,24 24,0 0,0" />
        <polygon points="12,12 24,24 0,24" />
      </svg>
    ),
    Android: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-emerald-400" fill="currentColor">
        <path d="M17.523 15.341l1.986 3.44a.5.5 0 0 1-.866.5l-2.022-3.501a9.96 9.96 0 0 1-4.621 1.137c-1.678 0-3.245-.414-4.62-1.137L5.358 19.28a.5.5 0 0 1-.866-.5l1.986-3.44C4.168 13.567 3 11.002 3 8h18c0 3.002-1.168 5.567-3.477 7.341zM7.5 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
      </svg>
    ),
    Firebase: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber-500" fill="currentColor">
        <path d="M4.5 17.5L7 3.5l4 7.5-6.5 6.5zm15 0L17 7.5l-2 3.5 4.5 6.5zM12 22l-7.5-4.5 7.5-13 7.5 13L12 22z"/>
      </svg>
    ),
    Code: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  };

  // Get curated technology icons based on course ID or modules
  const getCourseTechnologies = (key: string): TechItem[] => {
    switch (key) {
      case 'java-full-stack':
      case 'java-full-stack-development':
        return [
          { name: 'Java 21', icon: TechIcons.Java },
          { name: 'Spring Boot', icon: TechIcons.Spring },
          { name: 'React', icon: TechIcons.React },
          { name: 'Docker', icon: TechIcons.Docker },
          { name: 'PostgreSQL', icon: TechIcons.Postgres }
        ];

      case 'python-data-science':
        return [
          { name: 'Python', icon: TechIcons.Python },
          { name: 'Pandas', icon: TechIcons.Pandas },
          { name: 'NumPy', icon: TechIcons.NumPy },
          { name: 'Scikit-Learn', icon: TechIcons.Scikit },
          { name: 'Power BI', icon: TechIcons.PowerBI }
        ];

      case 'ai-ml':
        return [
          { name: 'Python', icon: TechIcons.Python },
          { name: 'PyTorch', icon: TechIcons.PyTorch },
          { name: 'TensorFlow', icon: TechIcons.TensorFlow },
          { name: 'Deep Learning', icon: TechIcons.Brain },
          { name: 'OpenCV', icon: TechIcons.Code }
        ];

      case 'cloud-aws':
        return [
          { name: 'AWS Cloud', icon: TechIcons.AWS },
          { name: 'EC2 Compute', icon: TechIcons.EC2 },
          { name: 'S3 Storage', icon: TechIcons.S3 },
          { name: 'Lambda', icon: TechIcons.Lambda },
          { name: 'Kubernetes', icon: TechIcons.Kubernetes }
        ];

      case 'frontend-dev':
      case 'frontend-development':
      case 'web-dev':
        return [
          { name: 'React 19', icon: TechIcons.React },
          { name: 'JavaScript', icon: TechIcons.JS },
          { name: 'TypeScript', icon: TechIcons.TS },
          { name: 'Tailwind CSS', icon: TechIcons.Tailwind },
          { name: 'HTML5', icon: TechIcons.HTML }
        ];

      case 'software-testing':
        return [
          { name: 'Selenium', icon: TechIcons.Selenium },
          { name: 'TestNG', icon: TechIcons.TestNG },
          { name: 'Java QA', icon: TechIcons.Java },
          { name: 'Postman', icon: TechIcons.Postman },
          { name: 'Automation', icon: TechIcons.Code }
        ];

      case 'sql-db':
        return [
          { name: 'SQL Queries', icon: TechIcons.SQL },
          { name: 'MySQL', icon: TechIcons.MySQL },
          { name: 'PostgreSQL', icon: TechIcons.Postgres },
          { name: 'MongoDB', icon: TechIcons.Mongo },
          { name: 'Redis Cache', icon: TechIcons.Redis }
        ];

      case 'android-dev':
        return [
          { name: 'Kotlin', icon: TechIcons.Kotlin },
          { name: 'Android OS', icon: TechIcons.Android },
          { name: 'Jetpack', icon: TechIcons.Code },
          { name: 'Firebase', icon: TechIcons.Firebase },
          { name: 'SQLite', icon: TechIcons.SQL }
        ];

      default:
        // Dynamic fallback using modules if available
        if (course.modules && course.modules.length > 0) {
          return course.modules.slice(0, 4).map((mod) => ({
            name: mod.split(' ')[0] || mod,
            icon: TechIcons.Code
          }));
        }
        return [
          { name: 'Full Stack', icon: TechIcons.Code },
          { name: 'Database', icon: TechIcons.SQL },
          { name: 'Cloud API', icon: TechIcons.AWS },
          { name: 'DevOps', icon: TechIcons.Docker }
        ];
    }
  };

  // Hero illustration for each course
  const renderHeroIcon = (key: string) => {
    switch (key) {
      case 'java-full-stack':
      case 'java-full-stack-development':
        return (
          <div className="relative flex flex-col items-center group">
            <div className="flex gap-1.5 mb-1 animate-pulse">
              <div className="w-1.5 h-3.5 bg-orange-400 rounded-full blur-[0.5px] transform -rotate-12" />
              <div className="w-1.5 h-5 bg-red-400 rounded-full blur-[0.5px]" />
              <div className="w-1.5 h-3.5 bg-sky-300 rounded-full blur-[0.5px] transform rotate-12" />
            </div>
            <div className="w-12 h-10 border-2 border-white/90 rounded-b-xl flex items-center justify-center relative shadow-lg bg-white/15 backdrop-blur-xs">
              <span className="text-[11px] font-black text-white font-mono tracking-tight">Java</span>
              <div className="absolute -right-3 top-1 w-3 h-5 border-2 border-white/90 rounded-r-full" />
            </div>
            <div className="w-16 h-1.5 bg-white/80 rounded-full mt-1" />
          </div>
        );

      case 'python-data-science':
        return (
          <div className="relative w-14 h-14 drop-shadow-xl">
            <svg viewBox="0 0 110 110" className="w-full h-full">
              <path fill="#387EB8" d="M54.5 5c-15.5 0-24.5 6.5-24.5 19v14h25v3.5H23C9 41.5 0 51.5 0 70c0 18.5 12 25 24.5 25h7v-12c0-13 11-23.5 24-23.5h23.5v-7C79 38 71 31 54.5 31h-7V19c0-8 6.5-14 14-14h13V5H54.5zm-11 8.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>
              <path fill="#FFE052" d="M55.5 105c15.5 0 24.5-6.5 24.5-19V72h-25v-3.5H87c14 0 23-10 23-28.5 0-18.5-12-25-24.5-25h-7v12c0 13-11 23.5-24 23.5H31v7c0 14.5 8 21.5 24.5 21.5h7v12c0 8-6.5 14-14 14H25.5v9H55.5zm11-8.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
            </svg>
          </div>
        );

      case 'ai-ml':
        return (
          <div className="relative w-14 h-14 bg-gradient-to-br from-purple-950 to-indigo-950 rounded-xl border border-purple-400/70 flex items-center justify-center shadow-lg shadow-purple-500/40">
            <div className="text-center font-mono">
              <div className="text-sm font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-200">
                AI
              </div>
              <div className="text-[7px] text-purple-300 font-bold tracking-tighter">CORE</div>
            </div>
            <div className="absolute -top-1 left-2 w-1.5 h-1 bg-purple-400 rounded-full" />
            <div className="absolute -top-1 right-2 w-1.5 h-1 bg-purple-400 rounded-full" />
            <div className="absolute -bottom-1 left-2 w-1.5 h-1 bg-purple-400 rounded-full" />
            <div className="absolute -bottom-1 right-2 w-1.5 h-1 bg-purple-400 rounded-full" />
          </div>
        );

      case 'cloud-aws':
        return (
          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 180 100" className="w-28 h-18 drop-shadow-2xl">
              <defs>
                <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284C7" />
                  <stop offset="50%" stopColor="#0369A1" />
                  <stop offset="100%" stopColor="#082F49" />
                </linearGradient>
              </defs>
              <path d="M40,68 a22,22 0 0,1 -4,-42 a30,30 0 0,1 58,-10 a38,38 0 0,1 58,19 a24,24 0 0,1 -4,42 z" fill="url(#cloudGrad)" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.5" />
              <text x="88" y="50" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900" fontFamily="sans-serif">
                aws
              </text>
              <path d="M64,60 Q88,74 112,60" fill="none" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" />
              <polygon points="110,57 116,59 113,64" fill="#FF9900" />
            </svg>
          </div>
        );

      case 'frontend-dev':
      case 'frontend-development':
      case 'web-dev':
        return (
          <div className="w-14 h-14 rounded-2xl bg-slate-950/80 border border-sky-400/50 flex items-center justify-center shadow-xl shadow-sky-950/50">
            <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10 animate-[spin_10s_linear_infinite]">
              <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
              <g stroke="#00D8FF" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          </div>
        );

      case 'software-testing':
        return (
          <div className="relative w-14 h-14 bg-gradient-to-br from-rose-950 to-red-900 rounded-xl border border-rose-400/70 flex items-center justify-center shadow-xl shadow-rose-600/30">
            <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
              Se
            </span>
          </div>
        );

      case 'sql-db':
        return (
          <div className="relative flex flex-col items-center drop-shadow-xl">
            <svg viewBox="0 0 60 70" className="w-14 h-16">
              <ellipse cx="30" cy="12" rx="24" ry="8" fill="#FDBA74" stroke="#EA580C" strokeWidth="1.5" />
              <path d="M6,12 v16 c0,4.5 10.7,8 24,8 c13.3,0 24,-3.5 24,-8 v-16" fill="#FB923C" stroke="#EA580C" strokeWidth="1.5" />
              <path d="M6,28 v16 c0,4.5 10.7,8 24,8 c13.3,0 24,-3.5 24,-8 v-16" fill="#F97316" stroke="#EA580C" strokeWidth="1.5" />
              <path d="M6,44 v16 c0,4.5 10.7,8 24,8 c13.3,0 24,-3.5 24,-8 v-16" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
            </svg>
          </div>
        );

      case 'android-dev':
        return (
          <div className="relative flex flex-col items-center drop-shadow-xl">
            <svg viewBox="0 0 60 60" className="w-14 h-14 text-emerald-300">
              <line x1="20" y1="12" x2="14" y2="4" stroke="#A7F3D0" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="40" y1="12" x2="46" y2="4" stroke="#A7F3D0" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M12,24 a18,18 0 0,1 36,0 z" fill="#10B981" />
              <circle cx="23" cy="18" r="2" fill="#FFFFFF" />
              <circle cx="37" cy="18" r="2" fill="#FFFFFF" />
              <rect x="12" y="27" width="36" height="24" rx="4" fill="#10B981" />
            </svg>
          </div>
        );

      default:
        return (
          <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center shadow-lg">
            <span className="font-heading font-black text-2xl text-white tracking-wider">
              {course.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        );
    }
  };

  const courseKey = (course.id || '')
    .toLowerCase()
    .replace(/^crs-/, '')
    .replace(/\s+/g, '-');

  const techs = getCourseTechnologies(courseKey);

  return (
    <div className={`relative h-44 w-full bg-gradient-to-r ${course.bannerGradient} overflow-hidden rounded-t-2xl`}>
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_70%)]" />

      {/* Uploaded Banner Image if provided */}
      {course.courseData?.bannerImage ? (
        <div className="absolute inset-0 z-0">
          <img
            src={course.courseData.bannerImage}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>
      ) : (
        /* Main Banner Content: Hero Brand Logo + Course Technology Icons */
        <div className="absolute inset-0 flex items-center justify-between px-4 pt-8">
          {/* Left: Signature Brand Mark */}
          <div className="shrink-0 flex items-center justify-center">
            {renderHeroIcon(courseKey)}
          </div>

          {/* Right: Technology Stack Badges with Official SVG Icons */}
          <div className="flex flex-wrap items-center justify-end gap-1.5 max-w-[195px] sm:max-w-[215px]">
            {techs.map((tech) => (
              <div
                key={tech.name}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-950/75 backdrop-blur-md border border-white/20 text-white shadow-md hover:bg-slate-900 hover:border-white/40 transition-all hover:scale-105"
              >
                <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  {tech.icon}
                </span>
                <span className="text-[10px] font-bold tracking-tight whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Left Course Badge */}
      <div className="absolute top-3 left-3 z-20">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-md ${getBadgeStyle()}`}>
          {renderBadgeIcon()}
          <span>{course.badge}</span>
        </span>
      </div>
    </div>
  );
};

