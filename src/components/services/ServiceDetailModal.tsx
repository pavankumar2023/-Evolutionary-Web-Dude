import React from 'react';
import { X, CheckCircle2, Clock, DollarSign, Layers, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceCardData } from '../../data/servicesData';
import { ServiceIcon } from './ServiceIcons';

interface ServiceDetailModalProps {
  service: ServiceCardData | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: (service: ServiceCardData) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onRequestQuote
}) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="service-detail-modal"
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-[#EAF3F3] relative max-h-[92vh] overflow-hidden flex flex-col"
      >
        {/* Top Header with Matching Service Gradient */}
        <div className={`p-6 sm:p-8 bg-gradient-to-r ${service.gradient} text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-md shrink-0">
              <ServiceIcon type={service.iconType} className="w-12 h-12" />
            </div>

            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/80 bg-white/15 px-2.5 py-0.5 rounded-full inline-block mb-1">
                Service Spec #{service.number}
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white leading-tight">
                {service.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-[#1F3B4D]">
          
          {/* Overview Paragraph */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Overview & Scope
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
              {service.description}
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F7FAFA] border border-[#EAF3F3]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block font-semibold uppercase">Timeline</span>
                <span className="text-xs font-bold text-[#1F3B4D]">{service.timeline}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block font-semibold uppercase">Starting Price</span>
                <span className="text-xs font-bold text-[#1F3B4D]">{service.startingPrice}</span>
              </div>
            </div>
          </div>

          {/* Key Deliverables & Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Core Deliverables & Architecture
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 font-medium p-2.5 rounded-xl bg-white border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {service.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer CTAs */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-[#F7FAFA] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onRequestQuote(service);
            }}
            className="w-full sm:w-auto px-6 py-3 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#F2A93B]" />
            <span>Request Quote for {service.shortName}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
