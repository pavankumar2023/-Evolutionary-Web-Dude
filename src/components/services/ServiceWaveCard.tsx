import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ServiceCardData } from '../../data/servicesData';
import { ServiceIcon } from './ServiceIcons';

interface ServiceWaveCardProps {
  service: ServiceCardData;
  onSelect: (service: ServiceCardData) => void;
  isFeatured?: boolean;
}

export const ServiceWaveCard: React.FC<ServiceWaveCardProps> = ({ 
  service, 
  onSelect,
  isFeatured = false 
}) => {
  return (
    <div 
      className={`group relative rounded-[32px] bg-white border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
        isFeatured ? 'ring-2 ring-[#EA580C]/20 shadow-xl' : ''
      }`}
      onClick={() => onSelect(service)}
    >
      {/* 1. TOP WHITE CONTAINER WITH ILLUSTRATION ICON */}
      <div className="pt-8 pb-3 px-6 flex flex-col items-center justify-center bg-white relative z-10 transition-transform duration-300 group-hover:scale-105">
        <div className="w-16 h-16 flex items-center justify-center">
          <ServiceIcon type={service.iconType} className="w-16 h-16 drop-shadow-2xs" />
        </div>
      </div>

      {/* 2. ORGANIC FLUID WAVE TRANSITION + GRADIENT BOTTOM */}
      <div className={`relative flex-1 flex flex-col justify-between overflow-hidden bg-gradient-to-b ${service.gradient}`}>
        
        {/* Dual-layered Wave SVG cutting from white top into gradient */}
        <div className="relative w-full overflow-hidden leading-none select-none pointer-events-none -mt-px">
          <svg 
            viewBox="0 0 500 110" 
            preserveAspectRatio="none" 
            className="w-full h-14 sm:h-16 block transition-transform duration-500 group-hover:scale-y-110"
          >
            {/* Background subtle translucent wave (creates layered depth like the screenshot) */}
            <path 
              d="M0,35 C150,85 320,5 500,45 L500,0 L0,0 Z" 
              fill="#FFFFFF" 
              fillOpacity="0.32" 
            />
            {/* Foreground crisp wave cutting into gradient */}
            <path 
              d="M0,60 C170,15 330,85 500,35 L500,0 L0,0 Z" 
              fill="#FFFFFF" 
            />
          </svg>
        </div>

        {/* 3. CARD CONTENT INSIDE VIBRANT GRADIENT CONTAINER */}
        <div className="px-6 pb-7 pt-1 flex flex-col items-center text-center flex-1 justify-between">
          
          {/* Service Name */}
          <div className="w-full">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-2.5 drop-shadow-xs">
              {service.shortName || service.name}
            </h3>

            {/* Sum description (concise 2-3 line summary) */}
            <p className="text-white/95 text-xs sm:text-sm font-normal leading-relaxed text-center mb-4 max-w-[270px] mx-auto line-clamp-3">
              {service.description}
            </p>
          </div>

          {/* Subtags with underline (e.g. TESTING  ANALYZE or UI  UX matching the uploaded image) */}
          {service.subTags && service.subTags.length > 0 && (
            <div className="flex items-center justify-center gap-6 mb-5 text-[11px] font-bold uppercase tracking-wider text-white/90">
              {service.subTags.map((tag, idx) => (
                <span key={idx} className="pb-0.5 border-b-2 border-white/70">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* More --> button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(service);
              }}
              className="inline-flex items-center gap-2 text-white font-bold text-xs sm:text-sm bg-white/20 hover:bg-white text-white hover:text-gray-900 px-5 py-2 rounded-full backdrop-blur-xs transition-all duration-200 group-hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
              aria-label={`More details for ${service.shortName || service.name}`}
            >
              <span>More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
