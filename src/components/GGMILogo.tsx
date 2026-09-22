import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  useImageAsset?: boolean;
  variant?: 'dark' | 'light';
}

export const GGMILogo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  useImageAsset = true,
  variant = 'dark',
  className = '' 
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28'
  };

  const textMap = {
    sm: { title: 'text-base', sub: 'text-[9px]', verse: 'text-[8px]' },
    md: { title: 'text-xl', sub: 'text-[10px]', verse: 'text-[9px]' },
    lg: { title: 'text-2xl', sub: 'text-xs', verse: 'text-[10px]' },
    xl: { title: 'text-3xl', sub: 'text-sm', verse: 'text-xs' }
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Emblem Icon */}
      <div className={`relative flex items-center justify-center shrink-0 ${sizeMap[size]}`}>
        {useImageAsset ? (
          <img 
            src="https://i.ibb.co/r2R453WW/Picture1.png" 
            alt="GGMI Official Logo - Global Gospel Missions Initiative"
            className="w-full h-full object-contain rounded-xl bg-white p-0.5 border border-stone-200/60 shadow-xs"
            referrerPolicy="no-referrer"
          />
        ) : (
          /* High Precision Vector SVG Replica of Official GGMI Emblem */
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
            <defs>
              <path id="textArc" d="M 25 100 A 75 75 0 0 1 175 100" />
            </defs>
            
            {/* Arched Top Text: Global Gospel Missions Initiative */}
            <text className="text-[11px] font-bold tracking-tight fill-[#1F4E79] font-sans">
              <textPath href="#textArc" startOffset="50%" textAnchor="middle">
                Global Gospel Missions Initiative
              </textPath>
            </text>

            {/* Light Blue Globe Background */}
            <circle cx="100" cy="95" r="48" fill="#4B9CD3" opacity="0.95" />
            {/* World Continent outlines */}
            <path d="M 65 80 Q 75 70 85 75 Q 95 85 85 95 Q 70 105 65 80 Z" fill="#7CBDED" />
            <path d="M 115 70 Q 130 65 140 75 Q 135 90 120 95 Q 110 85 115 70 Z" fill="#7CBDED" />
            <path d="M 85 105 Q 100 115 115 110 Q 110 125 95 125 Z" fill="#7CBDED" />
            {/* Globe Lat/Long grid lines */}
            <circle cx="100" cy="95" r="48" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
            <ellipse cx="100" cy="95" rx="48" ry="20" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
            <line x1="100" y1="47" x2="100" y2="143" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />

            {/* Open Bible at Bottom (Spreading Navy/Purple Pages) */}
            <g transform="translate(0, 15)">
              {/* Dark Navy Spine/Shadow */}
              <path d="M 20 130 Q 60 115 100 135 Q 140 115 180 130 L 175 145 Q 140 130 100 148 Q 60 130 25 145 Z" fill="#1C1B3B" />
              {/* Outer Left Page */}
              <path d="M 22 128 Q 60 112 100 132 L 100 138 Q 60 118 24 135 Z" fill="#2E2B5A" />
              {/* Outer Right Page */}
              <path d="M 178 128 Q 140 112 100 132 L 100 138 Q 140 118 176 135 Z" fill="#2E2B5A" />
              {/* White Page Layers */}
              <path d="M 25 125 Q 60 110 98 130 L 98 132 Q 60 113 27 127 Z" fill="#FFFFFF" />
              <path d="M 175 125 Q 140 110 102 130 L 102 132 Q 140 113 173 127 Z" fill="#FFFFFF" />
            </g>

            {/* Terracotta / Wood Brown Central Christian Cross */}
            <g>
              {/* Cross Shadow / Border */}
              <path d="M 91 42 H 109 V 72 H 135 V 90 H 109 V 158 H 91 V 90 H 65 V 72 H 91 Z" fill="#FFFFFF" stroke="#D35400" strokeWidth="2" />
              {/* Cross Main Fill */}
              <path d="M 93 44 H 107 V 74 H 133 V 88 H 107 V 156 H 93 V 88 H 67 V 74 H 93 Z" fill="#C55A11" />
            </g>

            {/* GGMI Orange Badge */}
            <g transform="translate(0, 10)">
              <rect x="72" y="145" width="56" height="18" rx="4" fill="#E65100" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="100" y="158" textAnchor="middle" fill="#FFFFFF" className="text-[12px] font-black font-sans tracking-widest">
                GGMI
              </text>
            </g>

            {/* Scripture Verse Capsule: Matt. 28:18-20 */}
            <g transform="translate(0, 10)">
              <rect x="58" y="167" width="84" height="16" rx="8" fill="#2D3748" />
              <text x="100" y="179" textAnchor="middle" fill="#FFFFFF" className="text-[9px] font-bold font-sans tracking-tight">
                Matt. 28:18-20
              </text>
            </g>
          </svg>
        )}
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <div className={`font-serif font-extrabold tracking-tight ${isLight ? 'text-white' : 'text-[#2D2D2D]'} ${textMap[size].title}`}>
            GGMI
          </div>
          <div className={`font-sans font-bold tracking-wider uppercase ${isLight ? 'text-[#DED4C7]' : 'text-[#5A5A40]'} ${textMap[size].sub}`}>
            Global Gospel Missions Initiative
          </div>
          <div className={`font-mono font-semibold ${isLight ? 'text-[#CBB598]' : 'text-[#A68B67]'} ${textMap[size].verse}`}>
            Matt. 28:18-20
          </div>
        </div>
      )}
    </div>
  );
};


