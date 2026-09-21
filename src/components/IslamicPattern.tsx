import React from 'react';

interface IslamicPatternProps {
  className?: string;
  opacity?: number;
}

export const IslamicPattern: React.FC<IslamicPatternProps> = ({ className = '', opacity = 0.05 }) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ opacity }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <pattern
            id="islamic-star-pattern"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Traditional 8-point geometric star (Khatim) */}
            <g stroke="#10b981" strokeWidth="1" fill="none">
              <rect x="15" y="15" width="30" height="30" transform="rotate(0 30 30)" />
              <rect x="15" y="15" width="30" height="30" transform="rotate(45 30 30)" />
              <circle cx="30" cy="30" r="8" stroke="#f59e0b" strokeWidth="0.8" />
              <line x1="0" y1="30" x2="60" y2="30" stroke="#059669" strokeWidth="0.5" />
              <line x1="30" y1="0" x2="30" y2="60" stroke="#059669" strokeWidth="0.5" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-star-pattern)" />
      </svg>
    </div>
  );
};
