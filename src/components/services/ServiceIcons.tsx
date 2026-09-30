import React from 'react';

interface ServiceIconProps {
  type: string;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ type, className = 'w-14 h-14' }) => {
  switch (type) {
    case 'consultation':
      // Matches the left card in the screenshot (Agent with headset, purple collar/tie)
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Headset Arc */}
          <path d="M18 30C18 22.268 24.268 16 32 16C39.732 16 46 22.268 46 30" stroke="#1F3B4D" strokeWidth="2.5" strokeLinecap="round" />
          {/* Ear pads */}
          <rect x="15" y="27" width="5" height="10" rx="2.5" fill="#7C3AED" stroke="#1F3B4D" strokeWidth="2" />
          <rect x="44" y="27" width="5" height="10" rx="2.5" fill="#7C3AED" stroke="#1F3B4D" strokeWidth="2" />
          {/* Microphone Boom */}
          <path d="M46 35C46 41 41 45 36 45H32" stroke="#1F3B4D" strokeWidth="2" strokeLinecap="round" />
          <circle cx="30" cy="45" r="2" fill="#F2A93B" />
          {/* Head & Face */}
          <circle cx="32" cy="29" r="8" fill="white" stroke="#1F3B4D" strokeWidth="2.5" />
          {/* Collar / Suit & Tie (Purple Accents like screenshot) */}
          <path d="M22 51C22 43 27 41 32 41C37 41 42 43 42 51" stroke="#1F3B4D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M28 41L32 49L36 41" fill="#7C3AED" stroke="#1F3B4D" strokeWidth="1.5" />
          <path d="M32 49V53" stroke="#1F3B4D" strokeWidth="2" />
        </svg>
      );

    case 'develop':
      // Matches the middle card in the screenshot (Rocket blasting off with sparks & orange/coral accents)
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Sparkles / Stars around rocket */}
          <path d="M19 21L21 17L23 21L27 23L23 25L21 29L19 25L15 23L19 21Z" fill="#F59E0B" />
          <path d="M47 19L48 16L49 19L52 20L49 21L48 24L47 21L44 20L47 19Z" fill="#F97316" />
          <circle cx="17" cy="33" r="1.5" fill="#F97316" />
          <circle cx="49" cy="31" r="1.5" fill="#F59E0B" />
          
          {/* Rocket Body */}
          <path d="M32 15C26 21 24 30 25 38H39C40 30 38 21 32 15Z" fill="white" stroke="#1F3B4D" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Porthole */}
          <circle cx="32" cy="27" r="4.5" fill="#EF4444" stroke="#1F3B4D" strokeWidth="2" />
          <circle cx="33.5" cy="25.5" r="1.2" fill="white" />
          
          {/* Fins */}
          <path d="M25 33L20 38V42H25" stroke="#1F3B4D" strokeWidth="2" strokeLinejoin="round" fill="white" />
          <path d="M39 33L44 38V42H39" stroke="#1F3B4D" strokeWidth="2" strokeLinejoin="round" fill="white" />
          
          {/* Engine Exhaust Lines */}
          <path d="M28 42V48" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 42V51" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <path d="M36 42V48" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'design':
      // Matches the right card in the screenshot (Creative Lightbulb rocket with sparks)
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Sparkles / Light rays */}
          <path d="M18 20L20 17L22 20L25 22L22 24L20 27L18 24L15 22L18 20Z" fill="#10B981" />
          <path d="M46 18L47 16L48 18L50 19L48 20L47 22L46 20L44 19L46 18Z" fill="#06B6D4" />
          <circle cx="17" cy="30" r="1.5" fill="#06B6D4" />
          <circle cx="48" cy="32" r="1.5" fill="#10B981" />

          {/* Lightbulb outline */}
          <path d="M26 36C23 33 22 29 22 25C22 19.477 26.477 15 32 15C37.523 15 42 19.477 42 25C42 29 41 33 38 36V40H26V36Z" fill="white" stroke="#1F3B4D" strokeWidth="2.5" strokeLinejoin="round" />
          
          {/* Filament / Idea bulb spark */}
          <path d="M28 26C28 23 30 21 32 21C34 21 36 23 36 26" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 21V29" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          
          {/* Base screw thread / rocket exhaust */}
          <path d="M27 40H37" stroke="#1F3B4D" strokeWidth="2" strokeLinecap="round" />
          <path d="M29 44H35" stroke="#1F3B4D" strokeWidth="2" strokeLinecap="round" />
          
          {/* Rocket fins on sides of bulb */}
          <path d="M22 36L18 41H22" stroke="#1F3B4D" strokeWidth="2" strokeLinejoin="round" />
          <path d="M42 36L46 41H42" stroke="#1F3B4D" strokeWidth="2" strokeLinejoin="round" />
          
          {/* Launch plumes */}
          <path d="M30 47V51" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M34 47V51" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'ai':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M48 20L50 16L52 20L56 22L52 24L50 28L48 24L44 22L48 20Z" fill="#8B5CF6" />
          <circle cx="16" cy="22" r="2" fill="#6366F1" />
          <rect x="20" y="20" width="24" height="24" rx="6" fill="white" stroke="#1F3B4D" strokeWidth="2.5" />
          <circle cx="27" cy="30" r="2.5" fill="#6366F1" />
          <circle cx="37" cy="30" r="2.5" fill="#6366F1" />
          <path d="M28 37C29 39 31 40 32 40C33 40 35 39 36 37" stroke="#1F3B4D" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 15V20" stroke="#1F3B4D" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="14" r="2" fill="#F2A93B" />
          <path d="M15 28H20M15 36H20M44 28H49M44 36H49" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'architecture':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="18" y="16" width="12" height="12" rx="3" fill="white" stroke="#1F3B4D" strokeWidth="2.5" />
          <rect x="34" y="16" width="12" height="12" rx="3" fill="#38BDF8" stroke="#1F3B4D" strokeWidth="2.5" />
          <rect x="26" y="36" width="12" height="12" rx="3" fill="white" stroke="#1F3B4D" strokeWidth="2.5" />
          <path d="M24 28V32H32V36" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 28V32H32" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="2.5" fill="#F2A93B" />
          <path d="M22 51H42" stroke="#1F3B4D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'cloud':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M22 38C19 38 16 35.5 16 32C16 28.5 19 26 22.5 26.2C24 21 28.5 17 34 17C40.5 17 46 22 46.5 28C50 28.5 53 31.5 53 35C53 39 49.5 42 45 42H22" stroke="#1F3B4D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="white" />
          <path d="M33 32L33 46M33 32L29 36M33 32L37 36" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="48" cy="18" r="1.5" fill="#38BDF8" />
          <path d="M18 20L19 18L20 20L22 21L20 22L19 24L18 22L16 21L18 20Z" fill="#06B6D4" />
        </svg>
      );

    case 'security':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M32 16L45 21V32C45 41 39 48 32 51C25 48 19 41 19 32V21L32 16Z" fill="white" stroke="#1F3B4D" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="27" y="30" width="10" height="9" rx="2" fill="#E11D48" stroke="#1F3B4D" strokeWidth="1.5" />
          <path d="M29 30V27C29 25.343 30.343 24 32 24C33.657 24 35 25.343 35 27V30" stroke="#1F3B4D" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="32" cy="34" r="1" fill="white" />
        </svg>
      );

    case 'workflow':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="20" y="16" width="24" height="32" rx="4" fill="white" stroke="#1F3B4D" strokeWidth="2.5" />
          <path d="M26 24H38" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <path d="M26 30H34" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <circle cx="36" cy="39" r="6" fill="#34D399" stroke="#1F3B4D" strokeWidth="2" />
          <path d="M34 39L35.5 40.5L38.5 37.5" stroke="#1F3B4D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'performance':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M19 42C17 38 16 33 17 28C19 21 25 16 32 16C39 16 45 21 47 28C48 33 47 38 45 42" stroke="#1F3B4D" strokeWidth="2.5" strokeLinecap="round" fill="white" />
          <path d="M32 37L39 25" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="37" r="3" fill="#14B8A6" stroke="#1F3B4D" strokeWidth="2" />
          <path d="M28 47L32 43L36 47" stroke="#F2A93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'mobile':
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="23" y="15" width="18" height="34" rx="4" fill="white" stroke="#1F3B4D" strokeWidth="2.5" />
          <path d="M30 19H34" stroke="#1F3B4D" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="32" cy="43" r="1.5" fill="#9333EA" />
          <rect x="26" y="23" width="12" height="15" rx="1.5" fill="#F3E8FF" />
          <circle cx="47" cy="22" r="1.5" fill="#C084FC" />
          <path d="M17 38L18 36L19 38L21 39L19 40L18 42L17 40L15 39L17 38Z" fill="#9333EA" />
        </svg>
      );

    default: // maintenance / general
      return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="32" cy="32" r="12" stroke="#1F3B4D" strokeWidth="2.5" fill="white" />
          <circle cx="32" cy="32" r="5" fill="#D97706" />
          <path d="M32 16V20M32 44V48M16 32H20M44 32H48" stroke="#1F3B4D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M21 21L24 24M40 40L43 43M21 43L24 40M40 24L43 21" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
};
