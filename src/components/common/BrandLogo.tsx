import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  onClick
}) => {
  const heights = {
    xs: 'h-7',
    sm: 'h-9',
    md: 'h-11 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24'
  };

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center select-none cursor-pointer group ${className}`}
    >
      <img 
        src="/ewd-logo.png" 
        alt="Evolutionary Web Dude (EWD)" 
        className={`${heights[size]} w-auto object-contain transition-transform duration-200 group-hover:scale-103 drop-shadow-xs`}
        loading="eager"
      />
    </div>
  );
};
